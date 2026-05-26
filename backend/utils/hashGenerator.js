const crypto = require("crypto");

function generateHash(data) {

    const jsonData =
        JSON.stringify(data);

    const hash =
        crypto
        .createHash("sha256")
        .update(jsonData)
        .digest("hex");

    return hash;
}

module.exports = generateHash;
