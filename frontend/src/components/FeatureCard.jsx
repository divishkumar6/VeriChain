import { motion }
from "framer-motion";

function FeatureCard({
  title,
  description,
  icon
}) {

  return (

    <motion.div

      whileHover={{
        y: -10,
        scale: 1.03
      }}

      transition={{
        duration: 0.3
      }}

      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        p-8
        hover:border-cyan-400/40
        transition
      "
    >

      <div className="
        absolute
        inset-0
        bg-gradient-to-br
        from-cyan-400/5
        to-purple-500/5
      " />

      <div className="relative z-10">

        <div className="
          text-5xl
          mb-6
        ">
          {icon}
        </div>

        <h3 className="
          text-2xl
          font-bold
          mb-4
        ">

          {title}

        </h3>

        <p className="
          text-white/70
          leading-relaxed
        ">

          {description}

        </p>

      </div>

    </motion.div>
  );
}

export default FeatureCard;