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

const bcrypt = require("bcrypt");

async function login(req, res) {
    let {
        email,
        password
    } = req.body;
    try {

        let user = await User.findOne({
            email
        });
        console.log(user)
        let result = await bcrypt.compare(password, user.password);

        if (!user || !result) throw Error("Wrong email or password");
    } catch (err) {
        res.status(422).json(Object.entries(handleErrors(err)).length ? handleErrors(err) : {
            message: err.message
        });
        return;
    }

    res.json("Login success")
}


async function register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(handleValidationErrors(errors.mapped()));
    }
    let {
        firstName,
        lastName,
        email,
        phoneNumber,
        age,
        homeNumber,
        password,
        birthDay
    } = req.body
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
            birthDay
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