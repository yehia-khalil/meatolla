const { handleErrors } = require("../helpers/handleErrors");
const Product = require("../models/Product");

function index(req, res) {
    res.json({
        data: [{
            id: "1",
            name: "first item wohoo"
        }]
    });
}

async function store(req, res) {
    let product;
    try {
        product = await Product.create({
            "name": req.body.name,
            "category": req.body.category
        });
    }catch(err){
        // console.log(err)
        res.status(422).json(handleErrors(err));
    }
    res.json(product);

}

module.exports = {
    index,
    store
}