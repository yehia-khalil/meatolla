module.exports.index = (req, res) => {
    res.json({
        data: [{
            id: "1",
            name: "first item wohoo"
        }]
    });
}