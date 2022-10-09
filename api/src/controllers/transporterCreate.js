const nodemailer = require("nodemailer");
const { 
    MAIL_FROM, 
    MAIL_HOST, 
    MAIL_PORT, 
    MAIL_PASS 
} = process.env;

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: true,
  auth: {
    user: MAIL_FROM,
    pass: MAIL_PASS,
  },
});

transporter.verify().then(() => {
  console.log("reaady to connect");
});

module.exports = {
  transporter,
};
