const bcrypt = require("bcrypt");

module.exports = async function hash(password) {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    return hash;
}