const {
    handleErrors
} = require("../helpers/handleErrors");
const {
    validationResult
} = require('express-validator');
const {
    handleValidationErrors
} = require("../helpers/handleValidationErrors");
const Order = require("../models/Order");
const Product = require("../models/Product");

async function index(req, res) {
    res.json(await (await Order.find({}).populate("user products")))
}
async function show(req, res) {

}
async function store(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(handleValidationErrors(errors.mapped()));
    }
    let quantities;
    let products;
    try {
        quantities = {};
        req.body.productsId.forEach(element => {
            quantities[element] = quantities[element] ? quantities[element] + 1 : 1;
        });
        products = await (Product.find({ _id: { $in: req.body.productsId } }, "_id name quantity"));
        for (let item of products) {
            if (item.quantity < quantities[item._id]) {
                throw Error(`${item.name} quantity exceeds maximum available amount`)
            }
        }
    } catch (err) {
        if (err.kind === "ObjectId") {
            res.status(404).json({
                order: "Not found"
            });
            return;
        }
        if (err.message.includes("quantity exceeds maximum amount")) {
            res.status(404).json({
                order: err.message
            });
            return;
        }
        res.status(422).json(Object.entries(handleErrors(err)).length ? handleErrors(err) : {
            message: err.message
        });
        return;
    }
    res.json(products)
}
async function update(req, res) {

}
async function destroy(req, res) {

}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}