function parseCertificateData(text) {

    if (!text) {

        return null;
    }

    const certificateId =
        text.match(
            /CERTIFICATE ID:\s*(.*)/i
        )?.[1]?.trim();

    const studentName =
        text.match(
            /STUDENT NAME:\s*(.*)/i
        )?.[1]?.trim();

    const institutionName =
        text.match(
            /INSTITUTION:\s*(.*)/i
        )?.[1]?.trim();

    const year =
        text.match(
            /YEAR:\s*(.*)/i
        )?.[1]?.trim();

    return {

        certificateId,

        studentName,

        institutionName,

        year
    };
}

module.exports =
parseCertificateData;