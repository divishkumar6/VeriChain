const Tesseract =
require("tesseract.js");
const sharp = require("sharp");

async function extractTextFromImage(
  imagePath
) {

  try {
    const croppedImage = await sharp(imagePath)
      .extract({
        left: 1200,
        top: 1000,
        width: 800,
        height: 150
      })
      .png()
      .toBuffer();

    const result =
    await Tesseract.recognize(

      croppedImage,

      "eng"
    );

    console.log(
      result.data.text
    );

    return result.data.text;

  } catch (error) {

    console.log(error);

    return null;
  }
}

module.exports =
extractTextFromImage;
