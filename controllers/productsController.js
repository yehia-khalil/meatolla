const {
    handleErrors
} = require("../helpers/handleErrors");
const Product = require("../models/Product");
const {
    validationResult
} = require('express-validator');
const {
    handleValidationErrors
} = require("../helpers/handleValidationErrors");

async function index(req, res) {
    res.json(await Product.find({}).populate("category"));
}

async function store(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(handleValidationErrors(errors.mapped()));
    }

    let product;
    try {
        product = await Product.create({
            "name": req.body.name,
            "category": req.body.category,
            "productImage": `${process.env.HOST}/${req.file.path}`,
            "price": req.body.price,
            "quantity": req.body.quantity
        });
    } catch (err) {
        res.status(422).json(Object.entries(handleErrors(err)).length ? handleErrors(err) : err);
    }
    res.json(await product.populate("category"));
}

async function show(req, res) {
    res.status(200).json(await Product.find({
        _id: req.params.productId
    }));
}

async function update(req, res) {
    let {
        name,
        price,
        quantity,
        category
    } = req.body;
    let product;
    try {
        product = await Product.findByIdAndUpdate(req.params.productId, {
            $set: {
                name,
                price,
                quantity,
                category
            }
        }, {
            new: true,
            runValidators: true
        });
    } catch (err) {
        res.status(422).json(Object.entries(handleErrors(err)).length ? handleErrors(err) : err);
    }
    res.json(await product.populate("category"))
}

module.exports = {
    index,
    store,
    update,
    show
}