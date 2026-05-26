import { motion } from "framer-motion";

function Logo() {

  return (

    <motion.div

      initial={{
        opacity: 0,
        x: -20
      }}

      animate={{
        opacity: 1,
        x: 0
      }}

      className="
        flex
        items-center
        gap-3
      "
    >

      <div className="
        w-4
        h-4
        rounded-full
        bg-cyan-400
        shadow-[0_0_20px_#22d3ee]
      " />

      <h1 className="
        text-2xl
        font-black
        tracking-wider
      ">

        VeriChain

      </h1>

    </motion.div>
  );
}

export default Logo;