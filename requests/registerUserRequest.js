const {
    checkSchema
} = require("express-validator");

module.exports.schema = checkSchema({
    //write your schema here
    firstName: {
        isString: true,
        errorMessage: "Please enter first name."
    },
    lastName: {
        isString: true,
        errorMessage: "Please enter last name."
    },
    email: {
        isEmail: true,
        errorMessage: "Please enter a valid email.",
    },
    phoneNumber: {
        trim: true,
        isNumeric: true,
        isLength: {
            options: {
                min: 11,
                max: 11
            }
        },
        errorMessage: "Please enter a valid phone number."
    },
    age: {
        isInt: {
            options: {
                min: 10,
                max: 100
            }
        },
        errorMessage: "Please enter your age between 10 and 100 years."
    },
    birthDay: {
        isDate: {
            options: {
                format: 'DD/MM/YYYY'
            }
        },
        errorMessage: "Please choose your birthday."
    },
    password: {
        isStrongPassword: true,
        errorMessage: "Please choose a strong password with minimum length of 8 charecters."
    },
    area: {
        isString: true,
        errorMessage: "Please choose your area."
    },
    streetName: {
        isString: true,
        errorMessage: "Please choose your street name."
    },
    buildingNumber: {
        isInt: true,
        errorMessage: "Please choose your building number."
    },
    floor: {
        isInt: true,
        errorMessage: "Please choose your floor."
    },
    apartment: {
        isInt: true,
        errorMessage: "Please choose your apartment."
    }
});