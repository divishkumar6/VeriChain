function parseCertificateData(text) {

    const certificateId =
        text.match(
            /CERTIFICATE ID:\s*(.*)/
        )?.[1]?.trim();

    const studentName =
        text.match(
            /STUDENT NAME:\s*(.*)/
        )?.[1]?.trim();

    const institutionName =
        text.match(
            /INSTITUTION:\s*(.*)/
        )?.[1]?.trim();

    const year =
        text.match(
            /YEAR:\s*(.*)/
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