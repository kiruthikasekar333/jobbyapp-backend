const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN } = require("../config/config");
const connection = require("../helper/db");

module.exports.signJWTToken = (payload) => {
    return new Promise((resolve, reject) => {
        const options = {
            expiresIn: "12h"
        }
        jwt.sign(payload, ACCESS_TOKEN, options, function (err, token) {
            // console.log(token);
            if (err) reject(err);
            resolve(token);
        });
    });
};  

//verifyJWTToken to allow access to api's where only logged in user can access

module.exports.verifyJWTToken = async(req,res, next) =>{
    
     const reqHeader =req.header("authorization")
     if(!reqHeader){
         return res
         .status(401)
         .send({message:"Access denied! No token found!"})
     }
     const bearerToken =reqHeader.split(" ");
     const token =bearerToken[1];
     try {
         const decoded = await jwt.verify(token,ACCESS_TOKEN);
         // console.log(decoded);
         res.decoded=decoded;
         return next();
     } catch (error) {
         console.log(error);
         return res
         .status(401)
         .send({message:error?.message, error: error})
     }   
 };

 // verifyEmployer to allow access for api's where only Employers are allowed

 module.exports.verifyEmployer = (req, res, next) => {
     
     const reqHeader =req.header("authorization")
          if(!reqHeader){
         return res
         .status(401)
         .send({message:"Access denied! No token found!"})
     }
     const bearerToken =reqHeader.split(" ");
     const token =bearerToken[1];

     try {
        const decoded = jwt.verify(token, ACCESS_TOKEN);
        const isEmployer = decoded.isEmployer;

        if (!isEmployer) {
            return res
            .status(403)
            .send({ message: "Access denied! Only employers are allowed." });
        }

        next();
    } catch (error) {
        console.log(error);
        return res
        .status(401)
        .send({ message: error?.message, error: error });
    }
  };

// Middleware to verify if the user is the owner of the job
module.exports.verifyJobOwner = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  
    if (!token) {
      return res.status(401).send({ message: 'Access denied! No token found!' });
    }
    
      try {
      const decoded = jwt.verify(token, ACCESS_TOKEN);
      const { jobId } = req.params;
  
      // Check if the user (employer) owns the job
      const selectQuery = `
        SELECT user_id
        FROM jobs
        WHERE job_id = ?
      `;
  
      connection.query(selectQuery, [jobId], (err, results) => {
        if (err) {
          console.error('Error checking job ownership:', err);
          return res
            .status(500)
            .json({ message: 'An error occurred while checking job ownership.' });
        } else if (results.length > 0) {
          const ownerId = results[0].user_id;
  
          if (decoded.isEmployer && decoded.userId === ownerId) {
            // User is an employer and owns the job
            req.user = decoded;
            next();
          } else {
            return res.status(403).json({ message: 'Access denied! You are not the owner of this job.' });
          }
        } else {
          return res.status(404).json({ message: 'Job not found.' });
        }
      });
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .json({ message: error?.message, error: error });
    }
  };
  