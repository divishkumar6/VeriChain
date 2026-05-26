import { motion }
from "framer-motion";

function Particles() {

  const particles =
    [...Array(20)];

  return (

    <div className="
      absolute
      inset-0
      overflow-hidden
      pointer-events-none
      -z-10
    ">

      {particles.map((_, i) => (

        <motion.div

          key={i}

          initial={{
            y: 0,
            opacity: 0.2
          }}

          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.6, 0.2]
          }}

          transition={{
            duration:
              4 + i,

            repeat:
              Infinity,

            ease:
              "easeInOut"
          }}

          className="
            absolute
            rounded-full
            bg-cyan-400
            blur-sm
          "

          style={{

            width:
              `${4 + i}px`,

            height:
              `${4 + i}px`,

            top:
              `${Math.random() * 100}%`,

            left:
              `${Math.random() * 100}%`,
          }}

        />

      ))}

    </div>
  );
}

export default Particles;