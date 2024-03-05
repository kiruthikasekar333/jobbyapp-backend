const connection = require("../helper/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { registerAcknowledgementMail }= require("../helper/nodeMailer")
const authJwt = require("../middlewares/authJWT")


module.exports = {
  registerUser: async(req, res) => {
    const data = req.body;

    // to upload userImage
    if (!req.file) {
      return res
        .status(400)
        .send({ message: "Please upload a profile picture" });
    }
// this variable holds userImage file, so values is directly written using this variable
    const userImage = req.file.filename;



    // Check if email already exists
    const emailCheckQuery = `SELECT * FROM users
                             WHERE email = ?`;

    connection.query(emailCheckQuery, [data.email], (error, results) => {
      if (error) {
        console.error("Error checking email:", error);
        return res
          .status(500)
          .json({ message: "An error occurred while checking the email." });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: "Email already exists." });
      }
      // Hash the password
      bcrypt.hash(data.password, saltRounds, (hashError, hashedPassword) => {
        if (hashError) {
          console.error("Error hashing password:", hashError);
          return res
            .status(500)
            .json({ message: "An error occurred while hashing the password." });
        }



        // If email doesn't exist, insert the user data
        const insertQuery = `
             INSERT INTO users (userName, email, password, dob, isEmployer, about, userImage)
             VALUES (?, ?, ?, ?, ?, ?, ?)
         `;

        connection.query(
          insertQuery,
          [data.userName,data.email, hashedPassword, data.dob, data.isEmployer, data.about, userImage],
          (insertError) => {
            if (insertError) {
              console.error("Error registering user:", insertError);
              return res
                .status(500)
                .json({
                  message: "An error occurred while registering the user.",
                });
            }

            // Send email to registered user
            registerAcknowledgementMail(data)
            .then(() => {
                res.json({ message: 'User registered successfully. Acknowledgment email sent.' });
            })
            .catch((error) => {
                console.error('Error sending acknowledgment email:', error);
                res.status(500).json({ message: 'An error occurred while sending the acknowledgment email.' });
            });
          }
        );
      });
    });
  },

  loginUser: async (req, res) => {
    try {
        const data = req.body;

        // Check if the user with the given email exists
        connection.query(`select * from users where email = '${data.email}'`, (queryErr, queryResults) => {
            if (queryErr) {
                return res.status(400).send({ message: "error while Sign In", error: queryErr });
            }
            if (queryResults.length === 0) {
                return res.status(400).send({ message: "Email does not exist!!!" });
            }

            // Compare the provided password with the hashed password in the database
            bcrypt.compare(data.password, queryResults[0].password, async function (err, result) {
                if (err) {
                    console.log(err);
                    return res.status(400).send({ message: "Password match error", error: err });
                }
                console.log("queryResults:",queryResults)
                if (result) {
                    const payload = {
                      userName: queryResults[0].userName,
                      userImage: queryResults[0].userImage,
                        userId: queryResults[0].userId,
                        isEmployer: queryResults[0].isEmployer
                    };
                    console.log("payload: ", payload)
                    try {
                        const token = await authJwt.signJWTToken(payload);
                        console.log(token);
                        return res.send({ message: "Login Successful!!", token: token });
                    } catch (tokenError) {
                        console.error("Error generating JWT token:", tokenError);
                        return res.status(500).send({ message: "Error generating JWT token" });
                    }
                }
                return res.status(400).send({ message: "Password does not match!" });
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: "Error while SignIn", error: error });
    }
},
  
};
