const Tesseract = require("tesseract.js");
const sharp = require("sharp");
const path = require("path");

async function extractTextFromImage(
    imagePath
) {

    try {

        const croppedImage =
            path.join(
                __dirname,
                "cropped.png"
            );

        // Crop ONLY metadata section
        await sharp(imagePath)
            .extract({
                left: 1200,
                top: 1000,
                width: 800,
                height: 150
            })
            .grayscale()
            .toFile(croppedImage);

        const result =
            await Tesseract.recognize(
                croppedImage,
                "eng"
            );

        return result.data.text;

    } catch (error) {

        console.log(error);

        return null;
    }
}

module.exports =
    extractTextFromImage;