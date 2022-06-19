const { checkSchema } = require("express-validator");

module.exports.schema = checkSchema({
    //write your schema here
    userId: {
        isString: true,
        errorMessage: "Please choose order owner."
    },
    productsId: {
        isArray: true,
    }
});