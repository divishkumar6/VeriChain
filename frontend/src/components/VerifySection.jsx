import { useState }
from "react";

import axios
from "axios";

import { motion }
from "framer-motion";

import {
  FaShieldAlt
}
from "react-icons/fa";

function VerifySection() {

  const [certId, setCertId] =
    useState("");

  const [certHash, setCertHash] =
    useState("");

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleVerify =
    async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res =
        await axios.post(

        "http://localhost:5001/api/certificate/verify-certificate",

        {
          certId,
          certHash,
        }
      );

      setResult(res.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);
    }
  };

  return (

    <section
      id="verify"
      className="
        py-32
        px-8
      "
    >

      <div className="
        max-w-4xl
        mx-auto
      ">

        <motion.div

          initial={{
            opacity: 0,
            y: 40
          }}

          whileInView={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 1
          }}

          viewport={{
            once: true
          }}

          className="
            relative
            overflow-hidden
            rounded-[40px]
            border
            border-white/10
            bg-white/5
            backdrop-blur-2xl
            p-12
          "
        >

          <div className="
            absolute
            inset-0
            bg-gradient-to-br
            from-cyan-400/5
            to-purple-500/5
          " />

          <div className="
            relative
            z-10
          ">

            <div className="
              text-center
              mb-12
            ">

              <FaShieldAlt
                className="
                  text-6xl
                  text-cyan-400
                  mx-auto
                  mb-6
                "
              />

              <h2 className="
                text-5xl
                font-black
              ">

                Verify Certificate

              </h2>

              <p className="
                mt-4
                text-white/60
              ">

                Instantly verify
                blockchain-secured
                academic credentials.

              </p>

            </div>

            <form
              onSubmit={handleVerify}
              className="
                space-y-6
              "
            >

              <input
                type="text"
                placeholder="Certificate ID"
                value={certId}
                onChange={(e) =>
                  setCertId(
                    e.target.value
                  )
                }
                className="
                  w-full
                  bg-white/5
                  border
                  border-white/10
                  rounded-2xl
                  p-5
                  outline-none
                  focus:border-cyan-400
                "
              />

              <input
                type="text"
                placeholder="Certificate Hash"
                value={certHash}
                onChange={(e) =>
                  setCertHash(
                    e.target.value
                  )
                }
                className="
                  w-full
                  bg-white/5
                  border
                  border-white/10
                  rounded-2xl
                  p-5
                  outline-none
                  focus:border-cyan-400
                "
              />

              <button
                type="submit"
                className="
                  w-full
                  py-5
                  rounded-2xl
                  bg-cyan-400
                  text-black
                  font-bold
                  text-lg
                  hover:scale-[1.02]
                  transition
                  shadow-glow
                "
              >

                {loading
                  ? "Verifying..."
                  : "Verify on Blockchain"}

              </button>

            </form>

            {result && (

              <motion.div

                initial={{
                  opacity: 0,
                  scale: 0.9
                }}

                animate={{
                  opacity: 1,
                  scale: 1
                }}

                transition={{
                  duration: 0.5
                }}

                className={`
                  mt-10
                  rounded-3xl
                  p-10
                  border
                  text-center

                  ${
                    result.status ===
                    "VERIFIED"

                    ?

                    "bg-green-500/10 border-green-400/30"

                    :

                    "bg-red-500/10 border-red-400/30"
                  }
                `}
              >

                <h3 className={`
                  text-5xl
                  font-black

                  ${
                    result.status ===
                    "VERIFIED"

                    ?

                    "text-green-400"

                    :

                    "text-red-400"
                  }
                `}>

                  {result.status}

                </h3>

                <p className="
                  mt-6
                  text-white/70
                  text-lg
                ">

                  {
                    result.status ===
                    "VERIFIED"

                    ?

                    "Certificate is authentic and secured on blockchain."

                    :

                    "Certificate integrity check failed."
                  }

                </p>

              </motion.div>
            )}

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default VerifySection;