const mongoose = require("mongoose");
const ADMIN = 1;
const USER = 2;

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    role: {
        type: Number,
        default: USER
    },
    age: Number,
    homoeNumber: Number
});
const User = mongoose.model('User', userSchema);
module.exports = {
    User,
    USER,
    ADMIN
};