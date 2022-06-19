const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const refIsValid = require("../helpers/refIsValid");
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter area name."],
        unique: true,
    },
    deliveryPrice: {
        type: Number,
        required: [true, "Please enter area delivery rate."]
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true,
        getters: true
    },
});

schema.plugin(uniqueValidator, { message: 'Area {PATH} should be unique' });

schema.virtual("users", {
    ref: 'User',
    localField: '_id',
    foreignField: 'area',
});

const Area = mongoose.model("Area", schema);
module.exports = Area;
