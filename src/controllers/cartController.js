const express = require('express');
const Cart = require('../models/cart');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const cart =  await Cart.find();
        return res.status(200).send(cart);
    } catch (err) {
        return res.status(400).send({ error: err, message: 'Search error!'});
    }
});

router.post('/', async (req, res) => {
    try {
        req.body.nameCart = 'my-cart';
        const cart = await Cart.findOneAndUpdate(req.body);
        if (cart) {
            return res.status(200).send(req.body);
        } else {
            await Cart.create(req.body);
            return res.status(200).send(req.body);
        }
    } catch (err) {
        return res.status(400).send({ error: err, message: 'Update error!'});
    }
});

module.exports = app => app.use('/cart', router);
