const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const refIsValid = require("../helpers/refIsValid");
const Schema = mongoose.Schema;

const schema = new Schema({
    
});

const Model = mongoose.model("Model", schema);
module.exports= Model;
