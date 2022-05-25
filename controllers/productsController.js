const { handleErrors } = require("../helpers/handleErrors");
const Product = require("../models/Product");

async function index(req, res) {
    res.json(await Product.find({}).populate("category"));
}

async function store(req, res) {
    let product;
    try {
        product = await Product.create({
            "name": req.body.name,
            "category": req.body.category
        });
    }catch(err){
        res.status(422).json(Object.entries(handleErrors(err)).length ? handleErrors(err): err);
    }
    res.json(product);

}

module.exports = {
    index,
    store
}