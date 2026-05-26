import { useState } from "react";

import axios from "axios";

function VerifyCertificate() {

  const [certId, setCertId] =
    useState("");

  const [result, setResult] =
    useState(null);

  const verifyCertificate =
    async () => {

      try {

        const res =
          await axios.get(

            `http://localhost:5001/api/certificate/verify/${certId}`
          );

        setResult(res.data);

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-8">

        Verify Certificate

      </h1>

      <div className="bg-white p-6 rounded shadow max-w-lg">

        <input
          type="text"
          placeholder="Enter Certificate ID"
          className="border p-3 w-full mb-4"
          onChange={(e) =>
            setCertId(e.target.value)
          }
        />

        <button
          onClick={verifyCertificate}
          className="bg-black text-white px-6 py-3 rounded"
        >
          Verify
        </button>

      </div>

      {result && (

        <div className="mt-10 bg-white p-6 rounded shadow">

          <h2 className="text-2xl font-bold">

            Status:
            {" "}
            {result.status}
          </h2>

          <p className="mt-4">
            Student:
            {" "}
            {result.certificate.studentName}
          </p>

          <p>
            Institution:
            {" "}
            {result.certificate.institutionName}
          </p>

        </div>
      )}

    </div>
  );
}

export default VerifyCertificate;