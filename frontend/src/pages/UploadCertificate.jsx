import { useState } from "react";

import axios from "axios";

function UploadCertificate() {

  const [formData, setFormData] =
    useState({

      studentName: "",
      degree: "",
      year: "",
      institutionName: ""
    });

  const [file, setFile] =
    useState(null);

  const [response, setResponse] =
    useState(null);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const data =
          new FormData();

        data.append(
          "certificate",
          file
        );

        data.append(
          "studentName",
          formData.studentName
        );

        data.append(
          "degree",
          formData.degree
        );

        data.append(
          "year",
          formData.year
        );

        data.append(
          "institutionName",
          formData.institutionName
        );

        const res =
          await axios.post(

            "http://localhost:5001/api/certificate/upload-certificate",

            data
          );

        setResponse(res.data);

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-8">

        Upload Certificate

      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-lg"
      >

        <input
          type="text"
          name="studentName"
          placeholder="Student Name"
          className="border p-3 w-full mb-4"
          onChange={handleChange}
        />

        <input
          type="text"
          name="degree"
          placeholder="Degree"
          className="border p-3 w-full mb-4"
          onChange={handleChange}
        />

        <input
          type="text"
          name="year"
          placeholder="Year"
          className="border p-3 w-full mb-4"
          onChange={handleChange}
        />

        <input
          type="text"
          name="institutionName"
          placeholder="Institution"
          className="border p-3 w-full mb-4"
          onChange={handleChange}
        />

        <input
          type="file"
          className="mb-4"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />

        <button
          className="bg-black text-white px-6 py-3 rounded"
        >
          Upload
        </button>

      </form>

      {response && (

        <div className="mt-10 bg-white p-6 rounded shadow">

          <h2 className="text-2xl font-bold mb-4">

            Certificate Uploaded

          </h2>

          <p>
            <strong>ID:</strong>
            {" "}
            {response.certificate.certificateId}
          </p>

          <p className="mt-2 break-all">
            <strong>Hash:</strong>
            {" "}
            {response.certificate.certificateHash}
          </p>

          <p className="mt-2 break-all">
            <strong>Blockchain Tx:</strong>
            {" "}
            {response.certificate.blockchainTx}
          </p>

          <img
            src={response.certificate.qrCode}
            alt="QR Code"
            className="w-64 mt-6"
          />

        </div>
      )}

    </div>
  );
}

export default UploadCertificate;