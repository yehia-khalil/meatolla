const { checkSchema } = require("express-validator");

module.exports.schema = checkSchema({
    //write your schema here
    productsId: {
        isArray: true,
    }
});