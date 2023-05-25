const express = require("express");
const router = express.Router();
const mqtt = require("mqtt");

const client = mqtt.connect(process.env.MQTT_BROKER, {
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASS,
});

client.on("connect", () => {
  console.log(`Conectado ao broker ${process.env.MQTT_BROKER}`);
});

router.post("/", async (req, res) => {
  try {
    const payload = req.query.valor;
    switch (payload) {
      case "0":
        client.publish("/led_pc/rainbow", "0");
        client.publish("/led_lamp/rainbow", "0");
        break;
      case "1":
        client.publish("/led_pc/rainbow", "1");
        client.publish("/led_lamp/rainbow", "1");
        break;
      case "vermelho":
        client.publish("/led_pc/corFixa", "#FF0000");
        client.publish("/led_lamp/corFixa", "#FF0000");
        break;
      case "verde":
        client.publish("/led_pc/corFixa", "#00FF00");
        client.publish("/led_lamp/corFixa", "#00FF00");
        break;
      case "rosa":
        client.publish("/led_pc/corFixa", "#ff0046");
        client.publish("/led_lamp/corFixa", "#FF000A");
        break;
      case "azul":
        client.publish("/led_pc/corFixa", "#0032ff");
        client.publish("/led_lamp/corFixa", "#0032ff");
        break;
      case "roxo":
        client.publish("/led_pc/corFixa", "#ff00c9");
        client.publish("/led_lamp/corFixa", "#ff00c9");
        break;
      case "branco":
        client.publish("/led_pc/corFixa", "#ff3432");
        client.publish("/led_lamp/corFixa", "#ff0b14");
        break;
      case "amarelo":
        client.publish("/led_pc/corFixa", "#ff2000");
        client.publish("/led_lamp/corFixa", "#ff0b00");
        break;
      case "laranja":
        client.publish("/led_pc/corFixa", "#ff1400");
        client.publish("/led_lamp/corFixa", "#ff0500");
        break;
    }
    return res.status(200).send(payload);
  } catch (err) {
    return res.status(400).send({ error: err, message: "Update error!" });
  }
});

module.exports = (app) => app.use("/leds", router);
