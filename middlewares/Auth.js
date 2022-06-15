const jwt = require('jsonwebtoken');
const jwt_decode = require("jwt-decode");

async function authenticated(req, res, next) {
    let token = req.get('x-access-token');
    if (!token) {
        res.status(401).json("Not Authorized")
        return;
    };
    let verified;
    try {
        verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
        res.status(401).json("Not Authorized");
        return;
    }
    if (!verified) {
        res.status(401).json("Not Authorized");
        return;
    };
    next();
}

function checkRole(userRole) {
    return function (req, res, next) {
        let token = req.get('x-access-token');
        let { role } = jwt_decode(token);
        if (role != userRole) {
            res.status(403).json("Not Authorized");
            return;
        }
        next();
    }
}

module.exports = {
    authenticated,
    checkRole
}