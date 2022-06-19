const {
    User
} = require("../models/User");
const {
    validationResult
} = require('express-validator');
const {
    handleValidationErrors
} = require("../helpers/handleValidationErrors");
const {
    handleErrors
} = require("../helpers/handleErrors");
const hashPassword = require("../helpers/hashPassword")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

async function login(req, res) {
    let { email, password } = req.body;
    let user;
    try {
        user = await User.findOne({
            email
        });
        let result = await bcrypt.compare(password, user.password);
        if (!user || !result) throw Error("Wrong email or password");

    } catch (err) {
        res.status(422).json(Object.entries(handleErrors(err)).length ? handleErrors(err) : {
            message: err.message
        });
        return;
    }
    let token = User.generateToken(user);
    res.json({
        token,
        expiresIn: Number(process.env.TOKEN_LIFE_TIME)
    });
}


async function register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(handleValidationErrors(errors.mapped()));
    }

    let { firstName, lastName, email, phoneNumber, age, homeNumber, password,
        birthDay, area, streetName, buildingNumber, floor, apartment } = req.body
    let user;
    password = await hashPassword(password);
    
    try {
        user = await User.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            age,
            homeNumber,
            birthDay, 
            area, 
            streetName, 
            buildingNumber, 
            floor, 
            apartment
        });
    } catch (err) {
        res.status(422).json(Object.entries(handleErrors(err)).length ? handleErrors(err) : {
            message: err.message
        });
        return;
    }
    res.status(201).json(user);
}

module.exports = {
    login,
    register,
};