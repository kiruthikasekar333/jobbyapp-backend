const nodemailer = require("nodemailer");
const { GMAIL_PASSWORD, GMAIL_USERNAME } = require("../config/config");

module.exports = {
    registerAcknowledgementMail: async (data) => {
        try {
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: GMAIL_USERNAME,
                    pass: GMAIL_PASSWORD,
                },
            });

            let html = `<html>
                <body>
                <h2> Hi ${data?.userName} </h2>
                <p> Thank you for registering with us. </p> 
                <p> Regards, </p>
                <p>Jobby App</p>
                </body>
                </html>`;

            let message = {
                from: "skirukris@gmail.com",
                to: data?.email,
                subject: "Registration Acknowledgement",
                html: html,
            };

            const info = await transporter.sendMail(message);
            console.log(info);

            return "Successfully sent Mail";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to send mail");
        }
    },
};
