const express = require("express");

const crypto = require("crypto");

const QRCode = require("qrcode");

const router = express.Router();

const upload =
  require("../middleware/uploadMiddleware");

const Certificate =
  require("../models/Certificate");

const contract =
  require("../blockchain/contractService");



// ==============================
// UPLOAD CERTIFICATE
// ==============================

router.post(
  "/upload-certificate",

  upload.single("certificate"),

  async (req, res) => {

    try {

      // Generate SHA256 hash
      const hash =
        crypto
          .createHash("sha256")
          .update(req.file.filename)
          .digest("hex");

      // Unique certificate ID
      const certId =
        Date.now().toString();

      // Store on blockchain
      const tx =
        await contract.storeCertificate(
          certId,
          hash
        );

      await tx.wait();

      // QR verification URL
      const verificationUrl =
        `http://localhost:5001/api/certificate/verify/${certId}`;

      // Generate QR Code
      const qrCodeImage =
        await QRCode.toDataURL(
          verificationUrl
        );

      // Save in MongoDB
      const certificate =
        await Certificate.create({

          certificateId: certId,

          studentName:
            req.body.studentName,

          degree:
            req.body.degree,

          year:
            req.body.year,

          institutionName:
            req.body.institutionName,

          certificateHash: hash,

          blockchainTx: tx.hash,

          qrCode: qrCodeImage,

          fileUrl: req.file.path
        });

      res.status(201).json({

        success: true,

        message:
          "Certificate uploaded successfully",

        certificateId: certId,

        certificateHash: hash,

        blockchainTx: tx.hash,

        qrCode: qrCodeImage,

        certificate
      });

    } catch (error) {

      res.status(500).json({
        error: error.message
      });
    }
  }
);



// ==============================
// GET ALL CERTIFICATES
// ==============================

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



// ==============================
// GET SINGLE CERTIFICATE
// ==============================

router.get(
  "/certificate/:id",

  async (req, res) => {

    try {

      const certificate =
        await Certificate.findById(
          req.params.id
        );

      if (!certificate) {

        return res.status(404).json({
          message:
            "Certificate not found"
        });
      }

      res.json(certificate);

    } catch (error) {

      res.status(500).json({
        error: error.message
      });
    }
  }
);



// ==============================
// VERIFY CERTIFICATE
// ==============================

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



// ==============================
// QR VERIFY ROUTE
// ==============================

router.get(
  "/verify/:certId",
  async (req, res) => {

    try {

      const { certId } = req.params;

      const certificate =
        await Certificate.findOne({
          certificateId: certId
        });

      if (!certificate) {

        return res.send(`
          <h1 style="color:red;">
            Certificate Not Found
          </h1>
        `);

      }

      const isValid =
        await contract.verifyCertificate(
          certificate.certificateId,
          certificate.certificateHash
        );

      if (isValid) {

        return res.send(`
          <div style="font-family:Arial;padding:40px;">
            <h1 style="color:green;">
              VERIFIED CERTIFICATE
            </h1>

            <h2>
              ${certificate.studentName}
            </h2>

            <p>
              Institution:
              ${certificate.institutionName}
            </p>

            <p>
              Certificate ID:
              ${certificate.certificateId}
            </p>
          </div>
        `);

      } else {

        return res.send(`
          <div style="font-family:Arial;padding:40px;">
            <h1 style="color:red;">
              TAMPERED CERTIFICATE
            </h1>

            <p>
              This certificate failed
              blockchain verification.
            </p>
          </div>
        `);

      }

    } catch (error) {

      console.log(error);

      res.send(`
        <h1 style="color:red;">
          Verification Failed
        </h1>
      `);

    }

  }
);

module.exports = router;
