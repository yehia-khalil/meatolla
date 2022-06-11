const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Category name is required."],
        unique: true
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    id: false,
});

categorySchema.virtual("products", {
    ref: 'Product',
    localField: '_id',
    foreignField: 'category',
});

module.exports = mongoose.model("Category", categorySchema)