const mongoose = require('../database');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    price: {
        value: {
            type: Number,
            default: 000,
        },
        valueShow: {
            type: String,
            default: '0,00',
        },
        currency: {
            type: String,
            default: 'BRL'
        },
        currSymbol: {
            type: String,
            default: 'R$'
        }
    },
    profilePath: {
        type: String,
        default: '',
    },
    imagesPath: {
        type: Array,
        default: [],
    },
    enabled: {
        type: Boolean,
        default: true,
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;