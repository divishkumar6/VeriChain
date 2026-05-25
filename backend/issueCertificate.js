const generateHash =
    require("./utils/hashGenerator");

const {
    storeCertificateOnChain
} = require(
    "./blockchain/verificationService"
);

async function issueCertificate() {

    const certificateData = {

        certificateId: "CERT001",

        studentName: "JOHN DOE",

        institutionName: "JIT",

        year: "2026"
    };

    // GENERATE HASH
    const hash =
        generateHash(
            certificateData
        );

    console.log(
        "\nGENERATED HASH:\n"
    );

    console.log(hash);

    // STORE ON BLOCKCHAIN
    const result =
        await storeCertificateOnChain(
            certificateData.certificateId,
            hash
        );

    console.log(
        "\nBLOCKCHAIN RESULT:\n"
    );

    console.log(result);
}

issueCertificate();