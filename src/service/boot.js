require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('../controllers/authController')(app);
require('../controllers/productsController')(app);

module.exports = (err) => {
    if (err) {
        return console.log('Erro ao conectar ao banco de dados!');
    }
    app.listen(process.env.PORT, (err) => {
        if (err) {
            return console.log('erro');
        }
        console.log(`Servidor iniciou em http://localhost:${process.env.PORT}`);
    });
};
