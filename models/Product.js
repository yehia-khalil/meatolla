const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const refIsValid = require("../helpers/refIsValid");
const Category = require("./Category");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Product name is required."],
        minLength: [2, "Product name should be at least 2 characters long."],
        unique: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Product category is required."]
    },
    productImage: {
        type: String,
        required: [true, "Please select an image."]
    },
    price: {
        type: Number,
        required: [true, "Please enter product price."]
    },
    quantity: {
        type: Number,
        required: [true, "Please enter available product quantity."]
    }
});

productSchema.plugin(uniqueValidator, {message: 'Product {PATH} should be unique'});

productSchema.path("category").validate(function (value) {
    return refIsValid(value, Category);
}, "Invalid Category.");

const Product = mongoose.model("Product", productSchema)

module.exports = Product;