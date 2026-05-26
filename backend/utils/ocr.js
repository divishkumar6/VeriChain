const Tesseract =
require("tesseract.js");

async function extractTextFromImage(
  imagePath
) {

  try {

    const result =
    await Tesseract.recognize(

      imagePath,

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