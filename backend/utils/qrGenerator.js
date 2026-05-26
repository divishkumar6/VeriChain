const QRCode = require("qrcode");

async function generateQRCode(
    certificateId
) {

    try {

        const frontendUrl =
            process.env.FRONTEND_URL ||
            "http://localhost:3000";

        const qrData =
            `${frontendUrl.replace(/\/$/, "")}/?certificateId=${encodeURIComponent(certificateId)}`;

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
