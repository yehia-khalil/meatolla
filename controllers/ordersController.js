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
const { User } = require("../models/User");
const jwt_decode = require("jwt-decode");




async function index(req, res) {
    res.json(await (await Order.find({}).populate("user products", "email name productImage")))
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
    let order;
    let total;
    let { productsId } = req.body;
    let { user } = jwt_decode(req.get('x-access-token'));
    let { _id: userId } = user;
    try {
        quantities = {};
        req.body.productsId.forEach(element => {
            quantities[element] = quantities[element] ? quantities[element] + 1 : 1;
        });
        products = await (Product.find({ _id: { $in: req.body.productsId } }, "_id name quantity price"));
        for (let item of products) {
            if (item.quantity < quantities[item._id]) {
                throw Error(`${item.name} quantity exceeds maximum available amount`)
            }
        }
        if (Object.keys(quantities).length != products.length) throw Error("Some products were not found");
        total = products.reduce(function (prev, current) {
            return prev + current.price
        }, 0);
        user = await User.findById(userId).populate("area");
        order = await Order.create({
            user: userId,
            products: productsId,
            subTotal: total + user.area.deliveryPrice
        });
        for (let [key, value] of Object.entries(quantities)) {
            let pro = await Product.findById(key);
            await Product.updateOne({ "_id": key }, { $set: { quantity: pro.quantity - value } })
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
    res.json(order)
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