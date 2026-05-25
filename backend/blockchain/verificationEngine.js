const extractTextFromImage =
    require("../utils/ocr");

const parseCertificateData =
    require("../utils/parseCertificateData");

const generateHash =
    require("../utils/hashGenerator");

const {
    verifyCertificateOnChain
} = require("./verificationService");

async function verifyCertificate(
    imagePath
) {

    try {

        // STEP 1: OCR EXTRACTION
        const rawText =
            await extractTextFromImage(
                imagePath
            );

        console.log(
            "\nRAW OCR OUTPUT:\n"
        );

        console.log(rawText);

        // STEP 2: PARSE DATA
        const certificateData =
            parseCertificateData(
                rawText
            );

        console.log(
            "\nPARSED DATA:\n"
        );

        console.log(certificateData);

        // STEP 3: GENERATE HASH
        const generatedHash =
            generateHash(
                certificateData
            );

        console.log(
            "\nGENERATED HASH:\n"
        );

        console.log(generatedHash);

        // STEP 4: BLOCKCHAIN VERIFICATION
        const isVerified =
            await verifyCertificateOnChain(
                certificateData.certificateId,
                generatedHash
            );

        // STEP 5: FINAL RESULT
        if(isVerified) {

            return {
                success: true,
                status: "VERIFIED",
                certificateData
            };

        } else {

            return {
                success: false,
                status: "TAMPERED",
                certificateData
            };
        }

    } catch(error) {

        console.log(error);

        return {
            success: false,
            status: "ERROR"
        };
    }
}

module.exports =
    verifyCertificate;