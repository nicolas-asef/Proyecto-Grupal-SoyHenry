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

    res.status(200).send(popUps);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(400);
  }
});

router.get("/user", async (req, res, next) => {
  try {
    let id = req.query.id
    let popUps = await PopUp.findAll({
      where:{
        ReceiverID : id
      },
      include: [
          {model: User,as:'Emiter'},
          {model:User,as:'Receiver'}
      ],
    });

    res.status(200).send(popUps);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(400);
  }
});


router.get("/:id", async (req, res, next) => {
  try {
    let {id} = req.params
    let popUps = await PopUp.findOne({
      where:{
        id:id
      },
      include: [
          {model: User,as:'Emiter'},
          {model:User,as:'Receiver'}
      ],
    });
    res.status(200).send(popUps);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(400);
  }
});



module.exports = router;
