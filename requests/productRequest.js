const {body, checkSchema} = require("express-validator");

module.exports.name = body('name').isString();
module.exports.image = checkSchema({
    'productImage': {
        custom: {
            options: (value, { req, path }) => {
                return !!req.files[path]
            },
            errorMessage: 'You should upload an image',
        },
    }
});