import { motion }
from "framer-motion";

function CounterCard({
  number,
  label,
  glow
}) {

  return (

    <motion.div

      whileHover={{
        y: -10
      }}

      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-white/5
        backdrop-blur-2xl
        p-10
      "
    >

      <div className={`
        absolute
        inset-0
        opacity-10
        blur-3xl
        ${glow}
      `} />

      <div className="
        relative
        z-10
      ">

        <h2 className="
          text-6xl
          font-black
        ">

          {number}

        </h2>

        <p className="
          mt-4
          text-white/60
          text-lg
        ">

          {label}

        </p>

      </div>

    </motion.div>
  );
}

export default CounterCard;