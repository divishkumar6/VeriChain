const generateQRCode =
    require("./utils/qrGenerator");

async function testQR() {

    const qr =
        await generateQRCode(
            "CERT001"
        );

    console.log(qr);
}

testQR();
