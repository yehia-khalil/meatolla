const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
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
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    role: {
        type: Number,
        default: USER
    },
    password: {
        type: String,
        required: true,
    },
    age: Number,
    homeNumber: Number
});

userSchema.plugin(uniqueValidator, {
    message: 'User {PATH} should be unique'
});

userSchema.pre('save', function (next) {
    console.log(this);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    USER,
    ADMIN
};