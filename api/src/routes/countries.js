const { Router } = require("express");
const { Country } = require("../db");

const route = Router();

route.get("/", async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.send(countries);
  } catch (error) {
    res.send(error);
  }
});

route.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const countrie = await Country.create({
      name: name,
    });
    res.send(countrie);
  } catch (error) {
    res.send(error);
  }
});

route.delete('/:id', async (req,res) => {
  const {id} = req.params
  try {
    await Country.destroy({
      where : {
        id : id
      }
    })
    res.send("eliminado correctamente")
  } catch (error) {
    res.send(error)
  }
})

module.exports = route;
