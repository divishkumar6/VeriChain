const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({

    studentName: String,

    degree: String,

    year: String,

    certificateId: String,

    institutionName: String,

    certificateHash: String,

    qrCode: String,

    blockchainTx: String,

    fileUrl: String

}, { timestamps: true });

module.exports = mongoose.model(
    "Certificate",
    certificateSchema
);