const express = require('express');

const Product = require('../models/product');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products =  await Product.find();
        return res.status(200).send(products);
    } catch (err) {
        return res.status(400).send({ error: err, message: 'Search error!'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const productSearched = await Product.findById(req.params.id);
        return res.status(200).send(productSearched);
    } catch (err) {
        return res.status(400).send({ error: err, message: 'Search error!'});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const productDeleted = await Product.findByIdAndDelete(req.params.id);
        if (productDeleted) {
            return res.status(200).send({ success: 'Delete success!'});
        } else {
            return res.status(400).send({ message: 'Product not found!'});
        }
    } catch (err) {
        return res.status(400).send({ error: err, message: 'Delete error!'});
    }
});

router.post('/new', async (req, res) => {
    try {
        let priceShow = '';
        const priceStr = req.body.price.value.toString();
        if (priceStr.length > 3) {
            const cents = priceStr.substr(-2, 2);
            const money = priceStr.substr(0, priceStr.length -2);
            priceShow = `${money},${cents}`;
        } else if (priceStr.length === 2) {
            priceShow = `0,${priceStr}`;
        } else {
            priceShow = `0,0${priceStr}`;
        }
        req.body.price.valueShow = priceShow;
        const product = await Product.create(req.body);
        return res.status(200).send({ product });
    } catch (err) {
        return res.status(400).send({ error: err, message: 'Register error!'});
    }
});

module.exports = app => app.use('/products', router);
