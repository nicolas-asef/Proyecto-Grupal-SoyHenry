const { Router } = require("express");
const { Op, Contract, User, Worker } = require("../db");

const route = Router();

route.get("/", async (req, res) => {
  try {
    const contractsAll = await Contract.findAll({});
    res.send(contractsAll);
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

route.get("/user", async (req, res) => {
  try {
    let id = req.query.arr;

    if (!id.isArray) {
      id = [id];
    }
    const contracts = await Contract.findAll({
      where: {
        id: {
          [Op.or]: id,
        },
      },
      include: User,
    });

    res.send(contracts);
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

route.get("/worker", async (req, res) => {
  try {
    let id = req.query.arr;

    if (!id.isArray) {
      id = [id];
    }
    const contracts = await Contract.findAll({
      where: {
        id: {
          [Op.or]: id,
        },
      },
      include: [{ model: Worker, include: User }],
    });


    res.send(contracts);
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

//Importante, cuando se cree un contrato se debe usar el id del user del worker, no el id del worker
route.post("/", async (req, res) => {
  const { id_user, id_worker, location, date, description } = req.body;
  try {
    const contrato = await Contract.create({
      location: location,
      date: date,
      description: description,
    });
    contrato.setWorker(id_worker);
    contrato.setUser(id_user);
    res.send(contrato);
  } catch (error) {
    res.send("---------------->Error en la operacion: " + error.message);
  }
});

route.put("/:id", async (req, res, next) => {
  try {
    
    const { id } = req.params;
    const { finished, rating_U, rating_W, confirmed, comment_U, comment_W } =
      req.body;

    const contract = await Contract.findByPk(id);

    finished ? (contract.finished = finished) : finished;
    rating_U ? (contract.rating_U = rating_U) : rating_U;
    rating_W ? (contract.rating_W = rating_W) : rating_W;
    confirmed ? (contract.confirmed = confirmed) : confirmed;
    comment_U ? (contract.comment_U = comment_U) : comment_U;
    comment_W ? (contract.comment_W = comment_W) : comment_W;

    const valor = await contract.save();
    res.status(200).send(valor);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(400);
  }
});

module.exports = route;
