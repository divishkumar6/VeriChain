import { motion }
from "framer-motion";

function FloatingOrbs() {

  return (

    <>

      <motion.div

        animate={{
          y: [0, -40, 0],
        }}

        transition={{
          duration: 6,
          repeat: Infinity
        }}

        className="
          absolute
          top-20
          left-20
          w-72
          h-72
          rounded-full
          bg-cyan-400/20
          blur-3xl
        "
      />

      <motion.div

        animate={{
          y: [0, 50, 0],
        }}

        transition={{
          duration: 8,
          repeat: Infinity
        }}

        className="
          absolute
          bottom-20
          right-20
          w-96
          h-96
          rounded-full
          bg-purple-500/20
          blur-3xl
        "
      />

    </>
  );
}

export default FloatingOrbs;