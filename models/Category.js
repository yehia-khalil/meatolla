const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name:{
        type: String,
        required: [true,"Category name is required."],
        unique: true
    }
});

module.exports = mongoose.model("Category", categorySchema)