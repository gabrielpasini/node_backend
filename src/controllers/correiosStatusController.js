const express = require("express");
const CorreiosStatus = require("../models/correiosStatus");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const correios = await CorreiosStatus.find();
    return res.status(200).send(correios);
  } catch (err) {
    return res.status(400).send({ error: err, message: "Search error!" });
  }
});

router.post("/", async (req, res) => {
  try {
    req.body.id = "greve";
    const correios = await CorreiosStatus.findOneAndUpdate(req.body);
    if (correios) {
      return res.status(200).send(req.body);
    } else {
      await CorreiosStatus.create(req.body);
      return res.status(200).send(req.body);
    }
  } catch (err) {
    return res.status(400).send({ error: err, message: "Update error!" });
  }
});

module.exports = (app) => app.use("/correios-status", router);
