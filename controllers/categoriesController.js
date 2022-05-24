const { handleErrors } = require("../helpers/handleErrors");
const Category = require("../models/Category");

async function index(req, res) {
    res.json(await Category.find({}));
}

async function store(req, res) {
    let category;
    try {
        category = await Category.create({
            "name": req.body.name
        });
    } catch (err) {
        // res.json(err)
        res.json(Object.entries(handleErrors(err)).length ? handleErrors(err): err);
    }
    res.json(category);
}



module.exports = {
    index,
    store
}