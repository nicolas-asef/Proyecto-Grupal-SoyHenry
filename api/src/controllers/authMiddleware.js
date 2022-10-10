const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      res.status(200).json({ msg: "Exito no logeado" });
    } else {
      next();
    }
  });
};
