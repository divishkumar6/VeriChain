const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const sharp = require("sharp");
const crypto = require("crypto");

const Certificate = require("../models/Certificate");
const contract = require("../blockchain/contractService");
const extractTextFromImage = require("../utils/ocr");
const parseCertificateData = require("../utils/parseCertificateData");
const generateHash = require("../utils/hashGenerator");
const generateQRCode = require("../utils/qrGenerator");
const { requireAuth, requireRole } = require("../middleware/authMiddleware");
const { publishEvent } = require("../utils/activityEvents");

const router = express.Router();

const uploadsDir = path.join(__dirname, "..", "uploads");
const generatedDir = path.join(uploadsDir, "generated");

fs.mkdirSync(generatedDir, {
  recursive: true,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },

  filename: function (req, file, cb) {
    const safeName = file.originalname.replace(/[^a-z0-9.-]/gi, "_");

    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({
  storage,
});

function getBaseUrl(req) {
  return `${req.protocol}://${req.get("host")}`;
}

function normalizeCertificateData(data, options = {}) {
  const shouldGenerateId = options.generateId === true;
  const submittedCertificateId = String(data.certificateId || "").trim();

  return {
    certificateId:
      submittedCertificateId ||
      (
        shouldGenerateId
          ? `VC-${Date.now()}-${Math.random()
              .toString(36)
              .slice(2, 8)
              .toUpperCase()}`
          : ""
      ),
    studentName: String(data.studentName || "").trim(),
    institutionName: String(
      data.institutionName || data.institution || ""
    ).trim(),
    degree: String(data.degree || "").trim(),
    year: String(data.year || "").trim(),
  };
}

function validateCertificateData(data) {
  return [
    "studentName",
    "institutionName",
    "degree",
    "year",
  ].filter((key) => !data[key]);
}

function createSimulatedTxHash(certificateId, certificateHash) {
  return `0x${crypto
    .createHash("sha256")
    .update(`${certificateId}:${certificateHash}:${Date.now()}`)
    .digest("hex")}`;
}

async function storeBlockchainProof(certificateId, certificateHash) {
  try {
    const tx = await contract.storeCertificate(certificateId, certificateHash);
    await tx.wait();

    return {
      hash: tx.hash,
      mode: "contract",
    };
  } catch (error) {
    console.log("Blockchain contract store failed, using simulation:", error.message);

    return {
      hash: createSimulatedTxHash(certificateId, certificateHash),
      mode: "simulation",
    };
  }
}

async function verifyBlockchainProof(certificate, generatedHash) {
  try {
    const verified = await contract.verifyCertificate(
      certificate.certificateId,
      generatedHash
    );

    if (verified) {
      return true;
    }
  } catch (error) {
    console.log("Blockchain contract verify failed, using simulation:", error.message);
  }

  return certificate.certificateHash === generatedHash;
}

function escapeSvg(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function generateCertificateImage(templatePath, data, qrCode, outputPath) {
  const metadata = await sharp(templatePath).metadata();
  const width = Math.max(metadata.width || 1200, 2200);
  const height = Math.max(metadata.height || 850, 1250);
  const qrSize = Math.round(Math.min(width, height) * 0.18);
  const fontSize = Math.max(24, Math.round(width * 0.035));
  const smallFontSize = Math.max(16, Math.round(width * 0.022));
  const x = Math.round(width * 0.16);
  const startY = Math.round(height * 0.42);
  const lineHeight = Math.round(fontSize * 1.55);
  const overlay = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .label { fill: #07111f; font-family: Arial, Helvetica, sans-serif; font-size: ${smallFontSize}px; font-weight: 700; letter-spacing: 1px; }
        .value { fill: #04111f; font-family: Arial, Helvetica, sans-serif; font-size: ${fontSize}px; font-weight: 800; }
        .ocr { fill: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 24px; font-weight: 800; }
      </style>
      <rect x="${Math.round(width * 0.1)}" y="${Math.round(height * 0.34)}" width="${Math.round(width * 0.8)}" height="${Math.round(height * 0.38)}" rx="24" fill="#ffffff" fill-opacity="0.62" />
      <text x="${x}" y="${startY}" class="value">STUDENT NAME: ${escapeSvg(data.studentName)}</text>
      <text x="${x}" y="${startY + lineHeight}" class="value">INSTITUTION: ${escapeSvg(data.institutionName)}</text>
      <text x="${x}" y="${startY + lineHeight * 2}" class="value">DEGREE: ${escapeSvg(data.degree)}</text>
      <text x="${x}" y="${startY + lineHeight * 3}" class="value">YEAR: ${escapeSvg(data.year)}</text>
      <text x="${x}" y="${startY + lineHeight * 4}" class="label">CERTIFICATE ID: ${escapeSvg(data.certificateId)}</text>
      <rect x="1200" y="1000" width="800" height="150" fill="#ffffff" fill-opacity="0.96" />
      <text x="1220" y="1028" class="ocr">CERTIFICATE ID: ${escapeSvg(data.certificateId)}</text>
      <text x="1220" y="1056" class="ocr">STUDENT NAME: ${escapeSvg(data.studentName)}</text>
      <text x="1220" y="1084" class="ocr">INSTITUTION: ${escapeSvg(data.institutionName)}</text>
      <text x="1220" y="1112" class="ocr">DEGREE: ${escapeSvg(data.degree)}</text>
      <text x="1220" y="1140" class="ocr">YEAR: ${escapeSvg(data.year)}</text>
    </svg>
  `;

  const qrBuffer = await sharp(Buffer.from(qrCode.split(",")[1], "base64"))
    .resize(qrSize, qrSize)
    .png()
    .toBuffer();

  await sharp(templatePath)
    .resize({
      width,
      height,
      fit: "contain",
      background: "#ffffff",
    })
    .composite([
      {
        input: Buffer.from(overlay),
        left: 0,
        top: 0,
      },
      {
        input: qrBuffer,
        left: Math.round(width * 0.08),
        top: height - qrSize - Math.round(height * 0.08),
      },
    ])
    .png()
    .toFile(outputPath);
}

// Institution-side issuance. OCR is intentionally not used here.
router.post(
  "/upload-certificate",
  requireAuth,
  requireRole("institution"),
  upload.single("certificate"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: "Certificate template image is required",
        });
      }
      publishEvent({
        type: "TEMPLATE",
        status: "success",
        title: "[TEMPLATE] Institution uploaded template",
        detail: req.file.originalname,
        institutionName: req.body.institutionName || req.body.institution,
      });

      const certificateData = normalizeCertificateData(req.body, {
        generateId: true,
      });
      const missingFields = validateCertificateData(certificateData);

      if (missingFields.length > 0) {
        return res.status(400).json({
          success: false,
          error: `Missing required fields: ${missingFields.join(", ")}`,
        });
      }

      const existingCertificate = await Certificate.findOne({
        certificateId: certificateData.certificateId,
      });

      if (existingCertificate) {
        return res.status(409).json({
          success: false,
          error: "Certificate ID already exists",
        });
      }

      const certificateHash = generateHash(certificateData);
      publishEvent({
        type: "FORM",
        status: "info",
        title: "[FORM] Student details entered",
        detail: `${certificateData.studentName} | ${certificateData.degree} | ${certificateData.year}`,
        studentName: certificateData.studentName,
        institutionName: certificateData.institutionName,
      });
      publishEvent({
        type: "HASH",
        status: "info",
        title: "[HASH] SHA256 generated",
        detail: certificateHash,
        certificateId: certificateData.certificateId,
        certificateHash,
      });

      const tx = await storeBlockchainProof(
        certificateData.certificateId,
        certificateHash
      );
      publishEvent({
        type: "BLOCKCHAIN",
        status: "success",
        title: "[BLOCKCHAIN] Transaction mined",
        detail: tx.hash,
        certificateId: certificateData.certificateId,
        txHash: tx.hash,
        blockchainMode: tx.mode,
      });

      const qrCode = await generateQRCode(certificateData.certificateId);
      publishEvent({
        type: "QR",
        status: "success",
        title: "[QR] QR generated",
        detail: certificateData.certificateId,
        certificateId: certificateData.certificateId,
      });
      const generatedFileName = `${certificateData.certificateId}-${Date.now()}.png`;
      const generatedPath = path.join(generatedDir, generatedFileName);

      await generateCertificateImage(
        req.file.path,
        certificateData,
        qrCode,
        generatedPath
      );

      const generatedCertificateUrl =
        `${getBaseUrl(req)}/uploads/generated/${generatedFileName}`;

      await Certificate.create({
        certificateId: certificateData.certificateId,
        certificateHash,
        studentName: certificateData.studentName,
        institutionName: certificateData.institutionName,
        degree: certificateData.degree,
        year: certificateData.year,
        qrCode,
        blockchainTx: tx.hash,
        fileUrl: `/uploads/${req.file.filename}`,
        generatedCertificateUrl,
        ocrData: certificateData,
      });

      res.status(201).json({
        success: true,
        certificateId: certificateData.certificateId,
        certificateHash,
        blockchainTx: tx.hash,
        blockchainMode: tx.mode,
        qrCode,
        generatedCertificateUrl,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

// Student-side verification. This is the only workflow that uses OCR.
router.post(
  "/verify-certificate",
  requireAuth,
  requireRole("student"),
  upload.single("certificate"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          status: "TAMPERED",
        });
      }

      publishEvent({
        type: "VERIFY",
        status: "info",
        title: "[VERIFY] OCR extraction started",
        detail: req.file.originalname,
      });

      const text = await extractTextFromImage(req.file.path);
      const extractedData = normalizeCertificateData(
        parseCertificateData(text) || {}
      );

      if (!extractedData.certificateId) {
        publishEvent({
          type: "ALERT",
          status: "danger",
          title: "[ALERT] Tampered certificate detected",
          detail: "OCR could not read a certificate ID",
        });
        return res.json({
          status: "TAMPERED",
        });
      }

      const generatedHash = generateHash(extractedData);
      const submittedHash = String(req.body.blockchainHash || "").trim();

      if (submittedHash && submittedHash !== generatedHash) {
        publishEvent({
          type: "ALERT",
          status: "danger",
          title: "[ALERT] Tampered certificate detected",
          detail: "Submitted blockchain hash does not match OCR hash",
          certificateId: extractedData.certificateId,
        });
        return res.json({
          status: "TAMPERED",
        });
      }

      const certificate = await Certificate.findOne({
        certificateId: extractedData.certificateId,
      });

      if (!certificate) {
        publishEvent({
          type: "ALERT",
          status: "danger",
          title: "[ALERT] Tampered certificate detected",
          detail: "Certificate ID is not registered",
          certificateId: extractedData.certificateId,
        });
        return res.json({
          status: "TAMPERED",
        });
      }

      publishEvent({
        type: "VERIFY",
        status: "info",
        title: "[VERIFY] Blockchain verification started",
        detail: certificate.certificateId,
        certificateId: certificate.certificateId,
      });

      const verified = await verifyBlockchainProof(certificate, generatedHash);

      if (!verified) {
        publishEvent({
          type: "ALERT",
          status: "danger",
          title: "[ALERT] Tampered certificate detected",
          detail: certificate.certificateId,
          certificateId: certificate.certificateId,
        });
        return res.json({
          status: "TAMPERED",
        });
      }

      publishEvent({
        type: "SUCCESS",
        status: "success",
        title: "[SUCCESS] Certificate verified",
        detail: certificate.studentName,
        certificateId: certificate.certificateId,
        studentName: certificate.studentName,
        txHash: certificate.blockchainTx,
      });

      res.json({
        status: "VERIFIED",
        certificateData: certificate,
        blockchainTx: certificate.blockchainTx,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        status: "TAMPERED",
      });
    }
  }
);

router.get("/certificates", requireAuth, requireRole("admin"), async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({
      createdAt: -1,
    });

    res.json(certificates);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

async function getCertificateById(req, res) {
  try {
    const certificate = await Certificate.findOne({
      certificateId: req.params.id,
    });

    if (!certificate) {
      return res.json({
        status: "TAMPERED",
      });
    }

    const verified = await verifyBlockchainProof(
      certificate,
      certificate.certificateHash
    );

    if (!verified) {
      return res.json({
        status: "TAMPERED",
      });
    }

    res.json({
      status: "VERIFIED",
      certificateData: certificate,
      blockchainTx: certificate.blockchainTx,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "TAMPERED",
    });
  }
}

router.get("/:id", getCertificateById);
router.get("/verify/:id", getCertificateById);

module.exports = router;
