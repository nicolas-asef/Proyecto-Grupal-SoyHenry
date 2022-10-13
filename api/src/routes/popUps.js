const { Router } = require("express");
const { Op, Worker, Job, Contract, User, Chat, Country,PopUp } = require("../db.js");

const router = Router();

// Funcion consultadora de datos a la DB

router.get("/", async (req, res, next) => {
  try {
    let popUps = await PopUp.findAll({
      include: [
          {model: User,as:'Emiter'},
          {model:User,as:'Receiver'}
      ],
    });
    console.log(popUps)
    res.status(200).send(popUps);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(400);
  }
});

module.exports = router;
