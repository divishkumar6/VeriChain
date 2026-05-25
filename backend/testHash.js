const generateHash =
    require("./utils/hashGenerator");

const certificateData = {

    studentName: "John Doee",

    degree: "B.Tech",

    year: "2026",

    certificateId: "CERT001",

    institutionName: "JIT"
};

const hash =
    generateHash(certificateData);

console.log("Generated Hash:");

console.log(hash);