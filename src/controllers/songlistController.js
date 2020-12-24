const express = require("express");
const Songlist = require("../models/songlist");
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
    const musicSearched = await Songlist.find({ songId: req.params.songId });
    console.log(musicSearched);
    musicSearched.jaFoiTocada = true;
    const musicUpdated = await Songlist.findByIdAndUpdate(musicSearched);
    console.log(musicUpdated);
    return res.status(200).send(musicUpdated);
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
    return res.status(200).send({ songlist });
  } catch (err) {
    return res.status(400).send({ error: err, message: "Register error!" });
  }
});

module.exports = (app) => app.use("/songlist", router);
