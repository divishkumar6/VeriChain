const {
    storeCertificateOnChain,
    verifyCertificateOnChain
} = require("./blockchain/verificationService");

async function test() {

    const certId = "CERT001";

    const certHash =
        "sample_hash_123";

    console.log(
        "Storing certificate..."
    );

    const storeResult =
        await storeCertificateOnChain(
            certId,
            certHash
        );

    console.log(storeResult);

    console.log(
        "Verifying certificate..."
    );

    const verifyResult =
        await verifyCertificateOnChain(
            certId,
            certHash
        );

    console.log(
        "Verification Result:",
        verifyResult
    );
}

test();