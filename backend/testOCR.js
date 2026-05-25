const extractTextFromImage =
    require("./utils/ocr");

const parseCertificateData =
    require("./utils/parseCertificateData");

async function testOCR() {

    // STEP 1: OCR EXTRACTION
    const text =
        await extractTextFromImage(
            "./uploads/certificate.png"
        );

    console.log(
        "\nRAW OCR OUTPUT:\n"
    );

    console.log(text);

    // STEP 2: PARSING
    const parsedData =
        parseCertificateData(text);

    console.log(
        "\nPARSED CERTIFICATE DATA:\n"
    );

    console.log(parsedData);
}

testOCR();