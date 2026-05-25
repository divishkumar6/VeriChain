const verifyCertificate =
    require(
        "./blockchain/verificationEngine"
    );

async function test() {

    const result =
        await verifyCertificate(
            "./uploads/certificate.png"
        );

    console.log(
        "\nFINAL RESULT:\n"
    );

    console.log(result);
}

test();