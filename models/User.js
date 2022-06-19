const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const ADMIN = 1;
const USER = 2;
const jwt = require('jsonwebtoken');
const Area = require("./Area");
const refIsValid = require("../helpers/refIsValid");

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
    birthDay: {
        type: Date,
        required: true
    },
    homeNumber: Number,
    area: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Area",
        required: [true, "Please choose your area."]
    },
    streetName: {
        type: String,
        required: [true, "Please choose street name."]
    },
    buildingNumber: {
        type: Number,
        required: [true, "Please choose building number."]
    },
    floor: {
        type: Number,
        required: [true, "Please choose your floor."]
    },
    apartment: {
        type: Number,
        erquired: [true, "Please choose appartment number."]
    }
});

userSchema.plugin(uniqueValidator, {
    message: 'User {PATH} should be unique'
});

userSchema.statics.generateToken = function (user) {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        user,
    }
    const token = jwt.sign(data, jwtSecretKey, {
        expiresIn: Number(process.env.TOKEN_LIFE_TIME),
    });
    return token;
}

userSchema.path("area").validate(function (value) {
    return refIsValid(value, Area);
}, "Invalid Area");

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    USER,
    ADMIN
};