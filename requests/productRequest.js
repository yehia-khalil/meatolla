const {body, checkSchema} = require("express-validator");

module.exports.name = body('name').isString().withMessage("Please enter a valid name.");
module.exports.category = body('category').isString().withMessage("Please choose a valid category.");
module.exports.price = body('price').isInt().withMessage("Price must be a number.");
module.exports.quantity = body('quantity').isInt().withMessage("Quantity must be a number");
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