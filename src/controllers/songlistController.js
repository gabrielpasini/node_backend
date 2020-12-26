const express = require("express");
const Songlist = require("../models/songlist");
const Leaderboard = require("../models/leaderboard");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await Songlist.find();
    return res.status(200).send(response);
  } catch (err) {
    return res.status(400).send({ error: err, message: "Search error!" });
  }
});

router.get("/:songId", async (req, res) => {
  try {
    const musicSearched = await Songlist.find({ songId: req.params.songId });
    return res.status(200).send(musicSearched);
  } catch (err) {
    return res.status(400).send({ error: err, message: "Search error!" });
  }
});

router.put("/:songId", async (req, res) => {
  try {
    await Songlist.findOneAndUpdate(
      { songId: req.params.songId },
      { $set: { jaFoiTocada: true } }
    );
    return res.status(200).send({ success: "Music updated!" });
  } catch (err) {
    return res.status(400).send({ error: err, message: "Update error!" });
  }
});

router.post("/clean/:ids", async (req, res) => {
  try {
    const ids = JSON.parse(req.params.ids);
    const promises = ids.map((songId) =>
      Songlist.findOneAndDelete({
        songId,
      })
    );
    const results = await Promise.all(promises);
    const musicsDeleted = [];
    results.map((res) => {
      if (res) {
        musicsDeleted.push(res);
      }
    });
    if (musicsDeleted.length === ids.length) {
      return res.status(200).send({ success: "Songlist cleaned!" });
    } else {
      return res.status(400).send({ message: "Clean error, music not found!" });
    }
  } catch (err) {
    return res.status(400).send({ error: err, message: "Delete error!" });
  }
});

router.post("/new", async (req, res) => {
  try {
    const songlist = await Songlist.create(req.body);
    let userInRank = await Leaderboard.findOne({
      usuario: req.body.pedinte,
    });
    if (!userInRank) {
      userInRank = await Leaderboard.create({
        usuario: req.body.pedinte,
        corUsuario: req.body.corPedinte,
      });
    }
    const userUpdated = await Leaderboard.findByIdAndUpdate(
      { _id: userInRank._id },
      { $inc: { pedidos: 1 } }
    );
    return res
      .status(200)
      .send({ songlist: songlist, userInRank: userUpdated });
  } catch (err) {
    return res.status(400).send({ error: err, message: "Register error!" });
  }
});

module.exports = (app) => app.use("/songlist", router);
