require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

require("../app/controllers/index")(app);

module.exports = (err) => {
  if (err) {
    return console.log("Erro ao conectar ao banco de dados!");
  }
  app.listen(process.env.PORT, (err) => {
    if (err) {
      return console.log("erro");
    }
    console.log(`Servidor iniciado em http://localhost:${process.env.PORT}`);
  });
};
