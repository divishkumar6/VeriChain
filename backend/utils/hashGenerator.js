const CryptoJS = require("crypto-js");

function generateHash(data) {

    const jsonData =
        JSON.stringify(data);

    const hash =
        CryptoJS.SHA256(jsonData)
        .toString();

    return hash;
}

module.exports = generateHash;