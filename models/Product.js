const mongoose = require("mongoose");
const refIsValid = require("../helpers/refIsValid");
const Category = require("./Category");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Product name is required."]
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Product category is required."]
    }
});

productSchema.path("category").validate(function (value) {
    return refIsValid(value,Category);
}, "Invalid Category.");

module.exports = mongoose.model("Product", productSchema)