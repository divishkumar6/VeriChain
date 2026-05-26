import { motion }
from "framer-motion";

import CyberGrid
from "./CyberGrid";

import FloatingOrbs
from "./FloatingOrbs";

function Hero() {

  return (

    <section className="
      relative
      min-h-screen
      flex
      items-center
      justify-center
      px-8
      overflow-hidden
    ">

      <CyberGrid />

      <FloatingOrbs />

      <div className="
        relative
        z-10
        max-w-6xl
        mx-auto
        text-center
      ">

        <motion.div

          initial={{
            opacity: 0,
            y: 40
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 1
          }}
        >

          <div className="
            inline-flex
            items-center
            gap-3
            px-6
            py-3
            rounded-full
            border
            border-cyan-400/20
            bg-cyan-400/10
            text-cyan-300
            mb-10
          ">

            Blockchain Secured Verification

          </div>

          <h1 className="
            text-7xl
            md:text-8xl
            font-black
            leading-tight
          ">

            Secure Digital

            <span className="
              block
              bg-gradient-to-r
              from-cyan-400
              to-purple-500
              bg-clip-text
              text-transparent
            ">

              Certificate
              Verification

            </span>

          </h1>

          <p className="
            mt-10
            text-xl
            text-white/60
            max-w-3xl
            mx-auto
            leading-relaxed
          ">

            VeriChain protects
            academic credentials using
            blockchain-powered integrity,
            QR authentication,
            and tamper-proof verification.

          </p>

          <div className="
            mt-14
            flex
            justify-center
            gap-6
            flex-wrap
          ">

            <button className="
              px-10
              py-5
              rounded-full
              bg-cyan-400
              text-black
              font-bold
              text-lg
              hover:scale-105
              transition
              shadow-[0_0_40px_#22d3ee]
            ">

              Launch Verification

            </button>

            <button className="
              px-10
              py-5
              rounded-full
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              hover:bg-white/10
              transition
            ">

              Explore Blockchain

            </button>

          </div>

        </motion.div>

        <motion.div

          initial={{
            opacity: 0,
            y: 50
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 1.2
          }}

          className="
            mt-24
            grid
            grid-cols-1
            md:grid-cols-3
            gap-8
          "
        >

          {[
            "Blockchain Security",
            "QR Verification",
            "Tamper Detection"
          ].map((item, index) => (

            <div
              key={index}
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-8
                hover:-translate-y-2
                transition
              "
            >

              <div className="
                w-14
                h-14
                rounded-2xl
                bg-cyan-400/20
                mb-6
              " />

              <h3 className="
                text-2xl
                font-bold
              ">

                {item}

              </h3>

              <p className="
                mt-4
                text-white/60
              ">

                Enterprise-grade
                blockchain infrastructure
                for certificate validation.

              </p>

            </div>
          ))}

        </motion.div>

      </div>

    </section>
  );
}

export default Hero;