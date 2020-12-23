const mongoose = require("../database");

const SonglistSchema = new mongoose.Schema({
  songId: {
    type: String,
    require: true,
  },
});

const Songlist = mongoose.model("Songlist", SonglistSchema);

module.exports = Songlist;
