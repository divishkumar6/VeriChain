const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    certificateId: {
      type: String
    },

    studentName: {
      type: String,
      required: true
    },

    degree: {
      type: String
    },

    year: {
      type: String
    },

    institutionName: {
      type: String
    },

    certificateHash: {
      type: String
    },

    blockchainTx: {
      type: String
    },

    qrCode: {
      type: String
    },

    fileUrl: {
      type: String
    },
    ocrData: {
  type: Object
}
  },

  { timestamps: true }
);

module.exports = mongoose.model(
  "Certificate",
  certificateSchema
);