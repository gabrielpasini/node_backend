const mongoose = require("../database");

const LeaderboardSchema = new mongoose.Schema({
  pedidos: {
    type: Number,
    default: 0,
    require: false,
  },
  usuario: {
    type: String,
    require: true,
  },
  corUsuario: {
    type: String,
    require: true,
  },
});

const Leaderboard = mongoose.model("Leaderboard", LeaderboardSchema);

module.exports = Leaderboard;
