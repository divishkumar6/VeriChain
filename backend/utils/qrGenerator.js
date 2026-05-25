const QRCode = require("qrcode");

async function generateQRCode(
    certificateId
) {

    try {

        const qrData =
            `http://localhost:3000/verify/${certificateId}`;

        const qrImage =
            await QRCode.toDataURL(qrData);

        return qrImage;

    } catch(error) {

        console.log(error);

        return null;
    }
}

module.exports =
    generateQRCode;