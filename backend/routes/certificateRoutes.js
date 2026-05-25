const express = require("express");

const router = express.Router();

const upload = require(
    "../middleware/uploadMiddleware"
);

const Certificate = require(
    "../models/Certificate"
);



// UPLOAD CERTIFICATE

router.post(
    "/upload-certificate",

    upload.single("certificate"),

    async (req, res) => {

        try {

            const certificate =
            await Certificate.create({

                studentName: req.body.studentName,

                degree: req.body.degree,

                year: req.body.year,

                institutionName:
                req.body.institutionName,

                certificateHash:
                "temporaryHash",

                fileUrl: req.file.path
            });

            res.status(201).json({
                message:
                "Certificate uploaded successfully",

                certificate
            });

        } catch (error) {

            res.status(500).json({
                error: error.message
            });
        }
    }
);



// GET ALL CERTIFICATES

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



// GET SINGLE CERTIFICATE

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



// VERIFY CERTIFICATE

router.post(
    "/verify-certificate",

    async (req, res) => {

        try {

            res.json({
                status: "VERIFIED"
            });

        } catch (error) {

            res.status(500).json({
                error: error.message
            });
        }
    }
);



// STUDENT WALLET

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