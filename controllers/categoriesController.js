const {
    handleErrors
} = require("../helpers/handleErrors");
const Category = require("../models/Category");
const {
    validationResult
} = require('express-validator');
const {
    handleValidationErrors
} = require("../helpers/handleValidationErrors");

async function index(req, res) {
    res.json(await Category.find({}, {
        __v: 0
    }).populate("products"));
}

async function show(req, res) {
    try {
        let category = await Category.findOne({
            _id: req.params.id
        });
        if (!category) throw Error("Not Found");
        res.json(category);
    } catch (err) {
        if (err.kind === "ObjectId" || err.message == "Not Found") {
            res.status(404).json({
                category: "Not Found"
            });
            return;
        }
        res.status(422).json(Object.entries(handleErrors(err)).length ? handleErrors(err) : {
            message: err.message
        });
        return;
    }
}

async function store(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(handleValidationErrors(errors.mapped()));
    }
    let category;
    try {
        category = await Category.create({
            "name": req.body.name
        });
    } catch (err) {
        res.status(422).json(Object.entries(handleErrors(err)).length ? handleErrors(err) : err);
    }
    res.json(category);
}

async function update(req, res) {

    let category = await Category.findById(req.params.id);
    try {
        category = await Category.findByIdAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                name: req.body.name ? req.body.name : category.name
            }
        }, {
            new: true,
            runValidators: true
        });
        if (!category) throw Error("Not Found")
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
    res.json(category);
}

async function destroy(req, res) {
    try {
        let category = await Category.findOne({
            _id: req.params.id
        }).populate("products");
        if (category.products.length > 0) {
            throw Error("Cannot delete category.")
        }
        category.remove();
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
    show,
    store,
    update,
    destroy,
}