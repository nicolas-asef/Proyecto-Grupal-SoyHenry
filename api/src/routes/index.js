const { Router } = require("express");

// Seguir agregando lo que falte....

const modelJob = require("./job");
const modelUser = require("./users");
const modelWorker = require("./worker.js");
const authRoute = require("./auth.js");
const modelContract = require("./contract.js");
const modelCountries = require("./countries");
const stripeModel = require("./payments.js");
const modelMail = require("./notifications.js");

const router = Router();

router.use("/mailNotifications", modelMail)
router.use("/jobs", modelJob);
router.use("/worker", modelWorker);
router.use("/users", modelUser);
router.use("/auth", authRoute);
router.use("/contract", modelContract);
router.use("/countries", modelCountries);
router.use("/payments", stripeModel);

module.exports = router;
