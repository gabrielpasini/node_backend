const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email } = req.body;
  try {
    if (await User.findOne({ email })) {
      return res
        .status(400)
        .send({ error: "Já existe um usuário com este email!" });
    }
    if (await User.findOne({ name })) {
      return res
        .status(400)
        .send({ error: "Já existe um usuário com este nome!" });
    }
    const user = await User.create(req.body);
    user.password = undefined;
    return res.status(200).send({ user });
  } catch (err) {
    return res.status(400).send({ error: "Erro no registro!" });
  }
});

module.exports = (app) => app.use("/auth", router);
