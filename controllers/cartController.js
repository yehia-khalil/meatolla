const {
    handleErrors
} = require("../helpers/handleErrors");
const {
    validationResult
} = require('express-validator');
const {
    handleValidationErrors
} = require("../helpers/handleValidationErrors");
const Cart = require(".././models/Cart");

async function index(req, res) {
    res.json(await Cart.find({}).populate("user products", "email name productImage"));
}
async function show(req, res) {

}
async function store(req, res) {

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