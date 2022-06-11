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
    try {
        let product = await Product.findOne({
            _id: req.params.id
        });
        if (!product) throw Error("Not Found");
        res.json(product);
    } catch (err) {
        if (err.kind === "ObjectId" || err.message == "Not Found") {
            res.status(404).json({
                product: "Not Found"
            });
            return;
        }
        res.status(422).json(Object.entries(handleErrors(err)).length ? handleErrors(err) : {
            message: err.message
        });
        return;
    }
}

async function update(req, res) {
    let {
        name,
        price,
        quantity,
        category
    } = req.body;
    let image = `${process.env.HOST}/${req.file?.path}`;
    let product = Product.findOne({
        _id: req.params.id
    });
    try {
        product = await Product.findByIdAndUpdate(req.params.id, {
            $set: {
                name,
                price,
                quantity,
                category,
                productImage: req.file?.path ? image : product.productImage
            }
        }, {
            new: true,
            runValidators: true
        });

        if (!product) throw Error("Not Found")
    } catch (err) {
        if (err.kind === "ObjectId" || err.message == "Not Found") {
            res.status(404).json({
                product: "Not Found"
            });
        }
        res.status(422).json(Object.entries(handleErrors(err)).length ? handleErrors(err) : {
            message: err.message
        });
        return;
    }
    res.json(await product.populate("category"));
}

async function destroy(req, res) {
    try {
        let product = await Product.deleteOne({
            _id: req.params.id
        });
        if (!product) throw Error("Not Found")
    } catch (err) {
        if (err.kind === "ObjectId" || err.message == "Not Found") {
            res.status(404).json({
                product: "Not Found"
            });
        }
        res.status(422).json(Object.entries(handleErrors(err)).length ? handleErrors(err) : {
            message: err.message
        });
        return;
    }
    res.status(200).send("Deleted successfulyl!");
}

module.exports = {
    index,
    store,
    update,
    show,
    destroy
}