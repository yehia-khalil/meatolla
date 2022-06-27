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
});


schema.path("user").validate(function (value) {
    return refIsValid(value, User);
}, "Invalid User.");

const Cart = mongoose.model("Cart", schema);
module.exports= Cart;
