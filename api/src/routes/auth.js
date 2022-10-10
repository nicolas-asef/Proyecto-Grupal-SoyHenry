const { Router } = require("express");
const router = Router();
const { User } = require("../db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      const password_valid = await bcrypt.compare(password, user.password);

      if (password_valid) {
        const token = jwt.sign(
          {
            id: user.ID,
            name: user.name,
            lastname: user.lastName,
            status: user.status,
          },
          process.env.JWT_SECRET,
          { expiresIn: "5h" }
        );
        res
          .status(200)
          .json({ id: user.ID, name: user.name, img: user.img, token });
      } else {
        res.status(400).json({ error: "Password Incorrect" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(404).json({ error: "User does not exist" });
  }
});

module.exports = router;
