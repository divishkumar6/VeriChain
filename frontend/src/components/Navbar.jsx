import Logo from "./Logo";

import { Link }
from "react-scroll";

function Navbar() {

  return (

    <nav className="
      fixed
      top-0
      left-0
      w-full
      z-50
      backdrop-blur-xl
      bg-black/20
      border-b
      border-white/10
    ">

      <div className="
        max-w-7xl
        mx-auto
        px-8
        py-5
        flex
        justify-between
        items-center
      ">

        <Logo />

        <div className="
          flex
          items-center
          gap-10
          text-white/70
        ">

          <Link
            to="upload"
            smooth={true}
            className="
              cursor-pointer
              hover:text-cyan-400
              transition
            "
          >
            Upload
          </Link>

          <Link
            to="verify"
            smooth={true}
            className="
              cursor-pointer
              hover:text-cyan-400
              transition
            "
          >
            Verify
          </Link>

          <button className="
            px-6
            py-3
            rounded-full
            bg-cyan-400
            text-black
            font-bold
            hover:scale-105
            transition
            shadow-[0_0_30px_#22d3ee]
          ">

            Launch App

          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;