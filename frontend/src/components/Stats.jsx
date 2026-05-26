import { motion }
from "framer-motion";

function Stats() {

  const stats = [

    {
      number: "10K+",
      label:
        "Certificates Verified"
    },

    {
      number: "99.9%",
      label:
        "Tamper Detection Accuracy"
    },

    {
      number: "24/7",
      label:
        "Blockchain Availability"
    },

    {
      number: "256-bit",
      label:
        "Encryption Security"
    },
  ];

  return (

    <section className="
      py-32
      px-8
    ">

      <div className="
        max-w-7xl
        mx-auto
        grid
        grid-cols-2
        md:grid-cols-4
        gap-8
      ">

        {stats.map((stat, index) => (

          <motion.div

            key={index}

            initial={{
              opacity: 0,
              y: 40
            }}

            whileInView={{
              opacity: 1,
              y: 0
            }}

            transition={{
              duration: 0.8,
              delay: index * 0.2
            }}

            viewport={{
              once: true
            }}

            className="
              rounded-3xl
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              p-10
              text-center
            "
          >

            <h2 className="
              text-5xl
              font-black
              text-cyan-400
            ">

              {stat.number}

            </h2>

            <p className="
              mt-4
              text-white/60
            ">

              {stat.label}

            </p>

          </motion.div>

        ))}

      </div>

    </section>
  );
}

export default Stats;