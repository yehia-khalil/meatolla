const {
    handleErrors
} = require("../helpers/handleErrors");
const Product = require("../models/Product");
const {
    validationResult
} = require('express-validator');

async function index(req, res) {
    res.json(await Product.find({}).populate("category"));
}

async function store(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    let product;
    try {
        product = await Product.create({
            "name": req.body.name,
            "category": req.body.category,
            "productImage": `${process.env.HOST}/${req.files['productImage'][0].path}`
        });
    } catch (err) {
        res.status(422).json(Object.entries(handleErrors(err)).length ? handleErrors(err) : err);
    }
    res.json(product);
}

module.exports = {
    index,
    store
}