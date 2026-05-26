function GlowBackground() {

  return (

    <div className="
      absolute
      inset-0
      overflow-hidden
      -z-10
    ">

      <div className="
        absolute
        top-[-200px]
        left-[-200px]
        w-[500px]
        h-[500px]
        bg-cyan-400
        opacity-20
        blur-[150px]
        rounded-full
      " />

      <div className="
        absolute
        bottom-[-200px]
        right-[-200px]
        w-[500px]
        h-[500px]
        bg-purple-500
        opacity-20
        blur-[150px]
        rounded-full
      " />

    </div>
  );
}

export default GlowBackground;