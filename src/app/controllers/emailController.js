const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    type: "login",
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

console.log(`Transporter iniciado no e-mail ${transporter.options.auth.user}`);

router.post("/gabriel", async (req, res) => {
  try {
    const { email, mensagem } = req.body;
    const emailToSend = {
      from: `<${email}>`,
      subject: `CONTATO VIA PORTFÓLIO`,
      to: [email, process.env.EMAIL_INBOX],
      text: mensagem,
    };
    await transporter.sendMail(emailToSend);
    return res.status(200).send({
      email: emailToSend,
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
