import { useState } from "react";

import axios from "axios";

function UploadCertificate() {

  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [response, setResponse] =
    useState(null);

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const data =
          new FormData();

        data.append(
          "certificate",
          file
        );

        const res =
          await axios.post(

            "http://localhost:5001/api/certificate/upload-certificate",

            data
          );

        console.log(res.data);

        setResponse(
          res.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="
      min-h-screen
      bg-[#050816]
      text-white
      p-10
    ">

      <div className="
        max-w-3xl
        mx-auto
      ">

        <h1 className="
          text-6xl
          font-bold
          mb-4
          text-cyan-400
        ">

          Upload Certificate

        </h1>

        <p className="
          text-white/60
          mb-10
          text-lg
        ">

          Secure blockchain-powered
          academic certificate upload.

        </p>

        <form

          onSubmit={handleSubmit}

          className="
            bg-white/5
            border
            border-cyan-400/20
            rounded-3xl
            p-10
            backdrop-blur-xl
          "
        >

          <div className="
            border-2
            border-dashed
            border-cyan-400/30
            rounded-3xl
            p-16
            text-center
          ">

            <p className="
              text-cyan-400
              text-2xl
              font-bold
              mb-4
            ">

              Upload Certificate Image

            </p>

            <input

              type="file"

              onChange={(e) =>

                setFile(
                  e.target.files[0]
                )
              }

              className="
                text-white
              "
            />

          </div>

          <button

            type="submit"

            className="
              w-full
              mt-8
              py-5
              rounded-2xl
              bg-cyan-400
              text-black
              text-xl
              font-bold
              hover:scale-[1.02]
              transition-all
              duration-300
            "
          >

            {
              loading
              ? "Running OCR + Blockchain..."
              : "Upload Certificate"
            }

          </button>

        </form>

        {/* RESPONSE CARD */}

        {
        response && (

          <div className="
            mt-12
            p-10
            rounded-3xl
            border
            border-green-400/20
            bg-green-400/5
            backdrop-blur-xl
          ">

            <h1 className="
              text-5xl
              font-bold
              text-green-400
            ">

              Certificate Uploaded

            </h1>

            <p className="
              mt-8
              text-3xl
              text-white
            ">

              Certificate ID:
              {" "}
              {
                response.certificateId
              }

            </p>

            <p className="
              mt-8
              text-white/70
              text-lg
            ">

              Blockchain Hash

            </p>

            <p className="
              break-all
              text-cyan-400
              text-sm
              mt-2
            ">

              {
                response.certificateHash
              }

            </p>

            <p className="
              mt-8
              text-white/70
              text-lg
            ">

              Blockchain Transaction

            </p>

            <p className="
              break-all
              text-green-400
              text-sm
              mt-2
            ">

              {
                response.blockchainTx
              }

            </p>

            <div className="
              mt-10
            ">

              <p className="
                text-white/70
                mb-4
                text-lg
              ">

                QR Verification

              </p>

              <img

                src={
                  response.qrCode
                }

                alt="QR"

                className="
                  w-64
                  rounded-2xl
                  bg-white
                  p-4
                "
              />

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default UploadCertificate;