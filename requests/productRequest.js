const {checkSchema} = require("express-validator");

module.exports.schema = checkSchema({
    'productImage': {
        custom: {
            options: (value, { req, path }) => {
                return req.file.fieldname === path
            },
            errorMessage: 'You should upload an image',
        },
    },
    'name':{
        isString: true,
        errorMessage: "Please enter a valid name.",
    },
    'category':{
        isString: true,
        errorMessage: "Please choose a valid category."
    },
    'price':{
        isInt: true,
        errorMessage: "Price must be a number."
    },
    'quantity':{
        isInt: true,
        errorMessage: "Product quantity must be a number."
    },
});