const {
    handleErrors
} = require("../helpers/handleErrors");
const {
    validationResult
} = require('express-validator');
const {
    handleValidationErrors
} = require("../helpers/handleValidationErrors");
const Area = require("../models/Area");

async function index(req, res) {
    res.json(await Area.find({}));
}

async function show(req, res) {

}

async function store(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(handleValidationErrors(errors.mapped()));
    }
    let area;
    try {
        area = await Area.create({
            name: req.body.name,
            deliveryPrice: req.body.deliveryPrice
        });
    } catch (err) {
        res.status(422).json(Object.entries(handleErrors(err)).length ? handleErrors(err) : {
            message: err.message
        });
    }
    res.json(area);
}

async function update(req, res) {
    let area = await Area.findById(req.params.id);
    try {
        area.name = req.body.name ? req.body.name : area.name;
        area.deliveryPrice = req.body.deliveryPrice ? req.body.deliveryPrice : area.deliveryPrice
        area.save();
        if (!area) throw Error("Not Found")
    } catch (err) {
        if (err.kind === "ObjectId" || err.message == "Not Found") {
            res.status(404).json({
                area: "Not Found"
            });
        }
        res.status(422).json(Object.entries(handleErrors(err)).length ? handleErrors(err) : {
            message: err.message
        });
        return;
    }
    res.json(area);
}

async function destroy(req, res) {
    try {
        let area = await Area.findOne({
            _id: req.params.id
        }).populate("users");
        if (category.users.length > 0) {
            throw Error("Cannot delete area.")
        }
        area.remove();
    } catch (err) {
        if (err.kind === "ObjectId") {
            res.status(404).json({
                area: "Not Found"
            });
            return;
        }
        if (err.message == "Cannot delete area.") {
            res.status(422).json({
                area: err.message
            });
            return;
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
    destroy
}