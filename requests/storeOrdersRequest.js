const { checkSchema } = require("express-validator");

module.exports.schema = checkSchema({
    //write your schema here
    productsId: {
        isArray: {
            options: {
                min: 1,
                max: 100
            }
        },
    }
});