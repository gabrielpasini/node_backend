const mongoose = require("../../database");

const CartSchema = new mongoose.Schema({
  nameCart: {
    type: String,
    default: "my-cart",
  },
  items: {
    type: Array,
    default: [],
  },
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
