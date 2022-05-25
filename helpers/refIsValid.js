module.exports = async (value, model) => {
    let count = await model.count({
        _id: value
    })
    return count > 0;
}