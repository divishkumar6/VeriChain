const contract = require("./contractService");

async function storeCertificateOnChain(
    certId,
    certHash
) {

    try {

        const tx = await contract.storeCertificate(
            certId,
            certHash
        );

        await tx.wait();

        return {
            success: true,
            txHash: tx.hash
        };

    } catch (error) {

        console.log(error);

        return {
            success: false,
            error: error.message
        };
    }
}

async function verifyCertificateOnChain(
    certId,
    certHash
) {

    try {

        const result =
            await contract.verifyCertificate(
                certId,
                certHash
            );

        return result;

    } catch (error) {

        console.log(error);

        return false;
    }
}

module.exports = {
    storeCertificateOnChain,
    verifyCertificateOnChain
};