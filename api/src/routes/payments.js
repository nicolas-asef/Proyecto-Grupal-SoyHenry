const axios = require("axios");
require("dotenv").config();
const { Router } = require("express");
const Stripe = require("stripe");
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(STRIPE_SECRET_KEY);
const router = Router();

router.post("/", async (req, res, next) => {
  const { paymentMethod } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      currency: "USD",
      amount: 100,
      confirm: true,
    });
    return res.send(payment);
  } catch (err) {
    return res.status(404).send("hola");
  }
});

module.exports = router;
