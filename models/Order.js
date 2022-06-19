const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const refIsValid = require("../helpers/refIsValid");
const Schema = mongoose.Schema;
const User = require("./User");
const CASH = 1;
const CREDIT = 2;

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
    },
    modeOfPayment: {
        type: Number,
        default: CASH
    }
}, {
    timestamps: true
});

schema.path("user").validate(function (value) {
    return refIsValid(value, User);
}, "Invalid User.");

const Order = mongoose.model("Order", schema);
module.exports = Order;
