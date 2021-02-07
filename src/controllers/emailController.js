const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    type: "login",
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

console.log(`Transporter iniciado no e-mail ${transporter.options.auth.user}`);

router.post("/gabriel", async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload);
    const email = {
      from: `${payload.nome} <${process.env.EMAIL_USER}>`,
      subject: `CONTATO PELO PORTFÓLIO - ${payload.assunto}`,
      to: [payload.email, process.env.EMAIL_USER, process.env.EMAIL_INBOX],
      text: payload.mensagem,
    };
    await transporter.sendMail(email);
    return res.status(200).send({
      email,
      status: "success",
      message: "E-mail enviado com sucesso!",
    });
  } catch (err) {
    return res
      .status(400)
      .send({ error: err, status: "error", message: "E-mail error!" });
  }
});

module.exports = (app) => app.use("/email", router);
