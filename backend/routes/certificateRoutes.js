const express = require("express");

const router = express.Router();

const multer = require("multer");

const crypto = require("crypto");

const QRCode = require("qrcode");

const path = require("path");

const Certificate = require("../models/Certificate");

const contract = require(
  "../blockchain/contractService"
);

const extractTextFromImage =
  require("../utils/ocr");

const parseCertificateData =
  require("../utils/parseCertificateData");


// ==============================
// MULTER CONFIG
// ==============================

const storage = multer.diskStorage({

  destination: function (
    req,
    file,
    cb
  ) {

    cb(null, "uploads/");
  },

  filename: function (
    req,
    file,
    cb
  ) {

    cb(

      null,

      Date.now() +
      path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
});


// ==============================
// UPLOAD CERTIFICATE
// ==============================

router.post(

  "/upload-certificate",

  upload.single("certificate"),

  async (req, res) => {

    try {

      // ==========================
      // OCR EXTRACTION
      // ==========================

      const text =
        await extractTextFromImage(
          req.file.path
        );

      console.log(
        "OCR TEXT:"
      );

      console.log(text);

      // ==========================
      // PARSE OCR DATA
      // ==========================

      const extractedData =
        parseCertificateData(text);

      console.log(
        "EXTRACTED DATA:"
      );

      console.log(
        extractedData
      );

      // ==========================
      // HASH GENERATION
      // ==========================

      const hash =
        crypto
          .createHash("sha256")
          .update(
            JSON.stringify(
              extractedData
            )
          )
          .digest("hex");

      console.log(
        "HASH:"
      );

      console.log(hash);

      // ==========================
      // CERTIFICATE ID
      // ==========================

      const certId =
        extractedData.certificateId;

      // ==========================
      // STORE ON BLOCKCHAIN
      // ==========================

      const tx =
        await contract.storeCertificate(

          certId,

          hash
        );

      await tx.wait();

      console.log(
        "BLOCKCHAIN TX:"
      );

      console.log(tx.hash);

      // ==========================
      // QR CODE GENERATION
      // ==========================

      const verificationUrl =
        `http://localhost:5001/api/certificate/verify/${certId}`;

      const qrCodeImage =
        await QRCode.toDataURL(
          verificationUrl
        );

      // ==========================
      // SAVE TO MONGODB
      // ==========================

      const certificate =
        await Certificate.create({

          certificateId:
            certId,

          certificateHash:
            hash,

          studentName:
            extractedData.studentName,

          institutionName:
            extractedData.institutionName,

          year:
            extractedData.year,

          qrCode:
            qrCodeImage,

          blockchainTx:
            tx.hash,

          ocrData:
            extractedData,
        });

      // ==========================
      // RESPONSE
      // ==========================

      res.status(201).json({

        success: true,

        message:
          "Certificate uploaded successfully",

        certificateId:
          certId,

        certificateHash:
          hash,

        blockchainTx:
          tx.hash,

        qrCode:
          qrCodeImage,

        certificate,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        error:
          error.message
      });
    }
  }
);


// ==============================
// VERIFY CERTIFICATE
// ==============================

router.post(

  "/verify-certificate",

  upload.single("certificate"),

  async (req, res) => {

    try {

      // ==========================
      // OCR EXTRACTION
      // ==========================

      const text =
        await extractTextFromImage(
          req.file.path
        );

      console.log(
        "VERIFY OCR TEXT:"
      );

      console.log(text);

      // ==========================
      // PARSE OCR DATA
      // ==========================

      const extractedData =
        parseCertificateData(text);

      if (!extractedData) {

        return res.status(400).json({

          error:
            "OCR failed to extract text"
        });
      }

      console.log(
        "VERIFY EXTRACTED DATA:"
      );

      console.log(
        extractedData
      );

      // ==========================
      // GENERATE HASH
      // ==========================

      const generatedHash =
        crypto
          .createHash("sha256")
          .update(
            JSON.stringify(
              extractedData
            )
          )
          .digest("hex");

      console.log(
        "GENERATED HASH:"
      );

      console.log(
        generatedHash
      );

      // ==========================
      // FIND CERTIFICATE
      // ==========================

      const certificate =
        await Certificate.findOne({

          certificateId:
            extractedData.certificateId
        });

      if (!certificate) {

        return res.json({

          status:
            "TAMPERED"
        });
      }

      // ==========================
      // BLOCKCHAIN VERIFY
      // ==========================

      const verified =
        await contract.verifyCertificate(

          certificate.certificateId,

          generatedHash
        );

      // ==========================
      // RESPONSE
      // ==========================

      res.json({

        status:
          verified
            ? "VERIFIED"
            : "TAMPERED",

        certificate,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        error:
          error.message
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

      console.log(error);

      res.status(500).json({

        error:
          error.message
      });
    }
  }
);


// ==============================
// QR VERIFY ROUTE
// ==============================

router.get(

  "/verify/:id",

  async (req, res) => {

    try {

      const certificate =
        await Certificate.findOne({

          certificateId:
            req.params.id
        });

      if (!certificate) {

        return res.json({

          status:
            "TAMPERED"
        });
      }

      res.json({

        status:
          "VERIFIED",

        certificate,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        error:
          error.message
      });
    }
  }
);

module.exports = router;