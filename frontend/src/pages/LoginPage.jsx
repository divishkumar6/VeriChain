import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import { login } from "../services/certificateApi";
import { useActivity } from "../context/GlobalActivityContext";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { pushEvent } = useActivity();
  const { saveAuth } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await login(form);
      const role = res.data.role || "";
      saveAuth({
        token: res.data.token,
        role,
        user: res.data.user || {
          email: form.email,
          role,
        },
      });
      pushEvent({
        type: "auth",
        status: "success",
        title: `${role || "User"} authenticated`,
        detail: "Session active",
        actor: form.email,
      });
      navigate(
        role === "admin"
          ? "/admin"
          : role === "student"
            ? "/student"
            : "/institution"
      );
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center px-4 py-28">
        <motion.form
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-3xl border border-cyan-300/20 bg-slate-950/70 p-6 shadow-[0_0_80px_rgba(34,211,238,0.16)] backdrop-blur-2xl sm:p-8"
        >
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-300">
            Secure Access
          </p>
          <h1 className="mt-3 text-4xl font-black">Login</h1>

          <div className="mt-8 space-y-4">
            <input
              type="email"
              required
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition focus:border-cyan-300"
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition focus:border-cyan-300"
            />
          </div>

          {error && (
            <div className="mt-5 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-red-100">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-cyan-300 px-6 py-4 font-black text-slate-950 shadow-[0_0_32px_rgba(34,211,238,0.38)] transition hover:scale-[1.01] disabled:opacity-70"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>

          <p className="mt-5 text-center text-sm text-white/55">
            New here?{" "}
            <Link to="/signup" className="font-bold text-cyan-300">
              Create account
            </Link>
          </p>

          <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/5 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">
              Demo Admin
            </p>
            <p className="mt-2 break-all font-mono text-sm text-white/70">
              admin@verichain.local
            </p>
            <p className="mt-1 font-mono text-sm text-white/70">
              admin123
            </p>
            <button
              type="button"
              onClick={() =>
                setForm({
                  email: "admin@verichain.local",
                  password: "admin123",
                })
              }
              className="mt-3 w-full rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-3 text-sm font-bold text-cyan-100 transition hover:border-cyan-300"
            >
              Fill admin credentials
            </button>
          </div>
        </motion.form>
      </main>
    </>
  );
}

export default LoginPage;
