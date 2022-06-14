const {User} = require("../models/User");
const {
    validationResult
} = require('express-validator');
const {
    handleValidationErrors
} = require("../helpers/handleValidationErrors");
const {
    handleErrors
} = require("../helpers/handleErrors");


function login(req, res) {
    // console.log(req.headers)
    res.send(req.headers);
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
    } = req.body
    let user;
    try {
        user = await User.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            age,
            homeNumber
        });
    } catch (err) {
        res.status(422).json(Object.entries(handleErrors(err)).length ? handleErrors(err) : {
            message: err.message
        });
    }
    res.json(user);
}

module.exports = {
    login,
    register,
};