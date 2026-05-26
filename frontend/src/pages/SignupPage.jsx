import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import { signup } from "../services/certificateApi";
import { useAuth } from "../context/AuthContext";

function SignupPage() {
  const navigate = useNavigate();
  const { saveAuth } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "institution",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await signup(form);
      saveAuth({
        token: res.data.token,
        role: res.data.role,
        user: res.data.user,
      });
      navigate(
        res.data.role === "admin"
          ? "/admin"
          : res.data.role === "student"
            ? "/student"
            : "/institution"
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Signup failed."
      );
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
          className="w-full max-w-lg rounded-3xl border border-purple-300/20 bg-slate-950/70 p-6 shadow-[0_0_80px_rgba(168,85,247,0.16)] backdrop-blur-2xl sm:p-8"
        >
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-purple-300">
            Identity Registry
          </p>
          <h1 className="mt-3 text-4xl font-black">Signup</h1>

          <div className="mt-8 grid gap-4">
            {[
              ["name", "Name", "text"],
              ["email", "Email", "email"],
              ["password", "Password", "password"],
            ].map(([name, placeholder, type]) => (
              <input
                key={name}
                type={type}
                required
                placeholder={placeholder}
                value={form[name]}
                onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition focus:border-purple-300"
              />
            ))}

            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-4 outline-none transition focus:border-purple-300"
            >
              <option value="institution">institution</option>
              <option value="student">student</option>
              <option value="admin">admin</option>
            </select>
          </div>

          {error && (
            <div className="mt-5 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-red-100">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-purple-300 px-6 py-4 font-black text-slate-950 shadow-[0_0_32px_rgba(168,85,247,0.38)] transition hover:scale-[1.01] disabled:opacity-70"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="mt-5 text-center text-sm text-white/55">
            Already registered?{" "}
            <Link to="/login" className="font-bold text-cyan-300">
              Login
            </Link>
          </p>
        </motion.form>
      </main>
    </>
  );
}

export default SignupPage;
