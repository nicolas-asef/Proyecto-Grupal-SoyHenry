const nodemailer = require("nodemailer");
const { User } = require("../db.js");
const { MAIL_FROM, MAIL_HOST, MAIL_PORT, MAIL_PASS } = process.env;

const emailValidation = async (email) => {
  User.findOne({ where: { email } })
    .then((result) => result && result.ID)
    .catch((error) => {
      return {
        Error: error,
        Response: "No se encontro ningun usuario con ese email.",
      };
    });
};

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
  emailValidation,
  transporter,
};
