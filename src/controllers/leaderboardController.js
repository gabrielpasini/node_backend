const express = require("express");
const Leaderboard = require("../models/leaderboard");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await Leaderboard.find();
    return res.status(200).send(response);
  } catch (err) {
    return res.status(400).send({ error: err, message: "Search error!" });
  }
});

module.exports = (app) => app.use("/leaderboard", router);
