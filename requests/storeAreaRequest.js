const { checkSchema } = require("express-validator");

module.exports.schema = checkSchema({
    //write your schema here
    name: {
        isString: true,
        errorMessage: "Please provide area name."
    },
    deliveryPrice: {
        isInt: true,
        errorMessage: "Please proved area delivery price."
    }
});