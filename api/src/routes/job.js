const { Router } = require("express");
const { Job } = require("../db");

const route = Router();

route.get("/", async (req, res) => {
  try {
    const jobs = await Job.findAll();
    console.log(jobs);
    res.send(jobs);
  } catch (error) {
    res.send(error);
  }
});

route.post("/", async (req, res) => {
  const { name } = req.body;
  console.log(name);
  try {
    console.log(Job);
    const job = await Job.create({
      name: name,
    });
    res.send(job);
  } catch (error) {
    res.send(error);
  }
});

module.exports = route;
