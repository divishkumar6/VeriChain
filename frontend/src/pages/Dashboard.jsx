import { useEffect, useState }
from "react";

import axios from "axios";

function Dashboard() {

  const [certificates,
    setCertificates] =
      useState([]);

  useEffect(() => {

    fetchCertificates();

  }, []);

  const fetchCertificates =
    async () => {

      const res =
        await axios.get(

          "http://localhost:5001/api/certificate/certificates"
        );

      setCertificates(res.data);
    };

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-8">

        Certificates Dashboard

      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {certificates.map((cert) => (

          <div
            key={cert._id}
            className="bg-white p-6 rounded shadow"
          >

            <h2 className="text-xl font-bold">

              {cert.studentName}

            </h2>

            <p className="mt-2">
              {cert.institutionName}
            </p>

            <p className="mt-2">
              ID:
              {" "}
              {cert.certificateId}
            </p>

            <img
              src={cert.qrCode}
              alt="QR"
              className="w-40 mt-4"
            />

          </div>
        ))}

      </div>

    </div>
  );
}

export default Dashboard;