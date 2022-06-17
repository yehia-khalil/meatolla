const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const refIsValid = require("../helpers/refIsValid");
const Schema = mongoose.Schema;

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Order must belong to a user."],
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Order must containt products."]
    }],
    subtotal: {
        type: Number
    }
}, {
    timestamps: true
});

const Order = mongoose.model("Model", schema);
module.exports = Order;
