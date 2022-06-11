const {checkSchema} = require("express-validator");

module.exports.schema = checkSchema({
    //write your schema here
    'name':{
        isString: true,
        errorMessage: "Category name is required."
    }
});