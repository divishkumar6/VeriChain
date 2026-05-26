import { Link, NavLink, useNavigate } from "react-router-dom";

import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";

function dashboardPath(role) {
  if (role === "admin") return "/admin";
  if (role === "student") return "/student";
  return "/institution";
}

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, role, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const visibleLinks = isAuthenticated
    ? [[dashboardPath(role), "Dashboard"]]
    : [["/login", "Login"]];

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#050713]/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
        <Link to="/" className="transition hover:scale-[1.02]">
          <Logo />
        </Link>

        <div className="hidden items-center gap-5 text-sm text-white/70 md:flex">
          {visibleLinks.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 font-bold transition ${
                  isActive
                    ? "bg-cyan-300/10 text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.16)]"
                    : "hover:text-cyan-300"
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="rounded-full border border-red-300/30 bg-red-400/10 px-5 py-3 font-bold text-red-100 transition hover:border-red-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signup"
              className="rounded-full bg-cyan-300 px-5 py-3 font-black text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.45)] transition hover:scale-105"
            >
              Signup
            </Link>
          )}
        </div>

        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="rounded-full border border-red-300/30 bg-red-400/10 px-4 py-2 text-sm font-bold text-red-100 md:hidden"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950 md:hidden"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
