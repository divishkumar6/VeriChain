const express = require("express");
const router = express.Router();

const crypto = require("crypto");

const upload = require("../middleware/uploadMiddleware");

const Certificate = require("../models/Certificate");

const contract = require("../blockchain/contractService");



// ==========================================
// UPLOAD CERTIFICATE
// ==========================================

router.post(
  "/upload-certificate",

  upload.single("certificate"),

  async (req, res) => {
    try {

      // GENERATE HASH

      const hash = crypto
        .createHash("sha256")
        .update(JSON.stringify(req.body))
        .digest("hex");



      // GENERATE UNIQUE CERTIFICATE ID

      const certId = Date.now().toString();



      // STORE HASH ON BLOCKCHAIN

      const tx = await contract.storeCertificate(
        certId,
        hash
      );

      await tx.wait();



      // SAVE TO MONGODB

      const certificate = await Certificate.create({

        certificateId: certId,

        studentName: req.body.studentName,

        degree: req.body.degree,

        year: req.body.year,

        institutionName: req.body.institutionName,

        certificateHash: hash,

        blockchainTx: tx.hash,

        fileUrl: req.file.path
      });



      res.status(201).json({
        message: "Certificate uploaded successfully",
        certificate
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: error.message
      });
    }
  }
);



// ==========================================
// GET ALL CERTIFICATES
// ==========================================

router.get(
  "/certificates",

  async (req, res) => {
    try {

      const certificates =
        await Certificate.find();

      res.json(certificates);

    } catch (error) {

      res.status(500).json({
        error: error.message
      });
    }
  }
);



// ==========================================
// GET SINGLE CERTIFICATE
// ==========================================

router.get(
  "/certificate/:id",

  async (req, res) => {
    try {

      const certificate =
        await Certificate.findById(
          req.params.id
        );

      res.json(certificate);

    } catch (error) {

      res.status(500).json({
        error: error.message
      });
    }
  }
);



// ==========================================
// VERIFY CERTIFICATE
// ==========================================

router.post(
  "/verify-certificate",

  async (req, res) => {

    try {

      const {
        certId,
        certHash
      } = req.body;



      const verified =
        await contract.verifyCertificate(
          certId,
          certHash
        );



      res.json({
        status:
          verified
            ? "VERIFIED"
            : "TAMPERED"
      });

    } catch (error) {

      res.status(500).json({
        error: error.message
      });
    }
  }
);



// ==========================================
// STUDENT WALLET
// ==========================================

router.get(
  "/student-wallet",

  async (req, res) => {

    try {

      const certificates =
        await Certificate.find();

      res.json(certificates);

    } catch (error) {

      res.status(500).json({
        error: error.message
      });
    }
  }
);

module.exports = router;