const User = require("../models/User");

function login(req, res) {
    // console.log(req.headers)
    res.send(req.headers);
}

async function test(req, res) {
    let user = await User.create({
        firstName: "yehia",
        lastName: "khalil",
        email: "yehia@gmail.com",
        phoneNumber:"0112345"
    });
    
    res.json(user);
}
module.exports = {
    login,
    test
};