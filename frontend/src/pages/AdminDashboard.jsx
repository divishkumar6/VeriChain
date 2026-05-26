import { motion } from "framer-motion";
import {
  FaBolt,
  FaCertificate,
  FaCheckCircle,
  FaCube,
  FaExclamationTriangle,
  FaEye,
  FaFingerprint,
  FaQrcode,
  FaUsers,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import { useActivity } from "../context/GlobalActivityContext";

const pipeline = [
  ["[TEMPLATE] Institution uploaded template", <FaCertificate />],
  ["[FORM] Student details entered", <FaUsers />],
  ["[HASH] SHA256 generated", <FaFingerprint />],
  ["[BLOCKCHAIN] Transaction mined", <FaCube />],
  ["[QR] QR generated", <FaQrcode />],
  ["[VERIFY] OCR extraction started", <FaEye />],
  ["[VERIFY] Blockchain verification started", <FaBolt />],
  ["[SUCCESS] Certificate verified", <FaCheckCircle />],
  ["[ALERT] Tampered certificate detected", <FaExclamationTriangle />],
];

function AdminDashboard() {
  const { events, clearEvents } = useActivity();
  const latestTitle = events[0]?.title;
  const issued = events.filter((event) => event.type === "QR").length;
  const verified = events.filter(
    (event) => event.type === "SUCCESS" && event.status === "success"
  ).length;
  const tampered = events.filter((event) => event.type === "ALERT").length;
  const activeUsers = new Set(
    events.filter((event) => event.type === "auth").map((event) => event.actor)
  ).size;
  const txEvents = events.filter((event) => event.txHash).slice(0, 4);
  const ocrEvents = events
    .filter((event) => event.type === "VERIFY" || event.type === "SUCCESS" || event.type === "ALERT")
    .slice(0, 8);

  const stats = [
    ["Total Certificates Issued", issued, "text-cyan-300"],
    ["Total Verified", verified, "text-green-300"],
    ["Tampered Attempts", tampered, "text-red-300"],
    ["Active Users", activeUsers, "text-purple-300"],
  ];

  return (
    <>
      <Navbar />
      <main className="px-4 pb-24 pt-32 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-purple-300">
                Live SOC Dashboard
              </p>
              <h1 className="text-4xl font-black sm:text-6xl">
                VeriChain Operations Center
              </h1>
            </div>
            <button
              onClick={clearEvents}
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-bold text-white/70 transition hover:border-purple-300/40 hover:text-white"
            >
              Reset Monitor
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {stats.map(([label, value, color]) => (
              <motion.div
                key={label}
                whileHover={{
                  y: -5,
                  rotateX: 4,
                  rotateY: -4,
                }}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_50px_rgba(34,211,238,0.08)] backdrop-blur-xl"
              >
                <p className="text-sm text-white/50">{label}</p>
                <p className={`mt-3 text-4xl font-black ${color}`}>{value}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_0.85fr]">
            <section className="rounded-3xl border border-cyan-300/20 bg-slate-950/65 p-5 backdrop-blur-2xl sm:p-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <h2 className="text-2xl font-black">Animated Workflow Pipeline</h2>
                <span className="rounded-full border border-green-300/20 bg-green-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-green-200">
                  Live
                </span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {pipeline.map(([label, icon], index) => {
                  const active = latestTitle === label;

                  return (
                    <motion.div
                      key={label}
                      animate={{
                        borderColor: active
                          ? "rgba(34,211,238,0.85)"
                          : "rgba(255,255,255,0.1)",
                        boxShadow: active
                          ? "0 0 36px rgba(34,211,238,0.28)"
                          : "0 0 0 rgba(0,0,0,0)",
                        scale: active ? 1.02 : 1,
                      }}
                      className="flex items-center gap-4 rounded-2xl border bg-black/25 p-4"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-300/10 text-2xl text-cyan-200">
                        {icon}
                      </div>
                      <div>
                        <p className="font-black">{label}</p>
                        <p className="text-sm text-white/45">
                          workflow-node-{String(index + 1).padStart(2, "0")}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-3xl border border-green-300/20 bg-black/45 p-5 font-mono backdrop-blur-2xl sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-sans text-2xl font-black">
                  OCR Processing Logs
                </h2>
                <span className="h-3 w-3 animate-pulse rounded-full bg-green-300 shadow-[0_0_20px_rgba(134,239,172,0.8)]" />
              </div>
              <div className="space-y-3 text-sm text-green-200">
                {ocrEvents.length === 0 && (
                  <div className="rounded-lg border border-green-300/10 bg-green-300/5 px-3 py-2 text-white/45">
                    Waiting for student certificate verification events...
                  </div>
                )}
                {ocrEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="rounded-lg border border-green-300/10 bg-green-300/5 px-3 py-2"
                  >
                    [{new Date(event.timestamp).toLocaleTimeString()}]{" "}
                    {event.title}: {event.detail}
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[0.85fr_1fr]">
            <section className="rounded-3xl border border-purple-300/20 bg-purple-400/5 p-5 backdrop-blur-2xl sm:p-6">
              <h2 className="mb-5 text-2xl font-black">
                Blockchain Transaction Cards
              </h2>
              <div className="space-y-4">
                {txEvents.length === 0 && (
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-5 text-white/50">
                    Confirmed transaction cards appear here after issuance or
                    verification.
                  </div>
                )}
                {txEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    whileHover={{ rotateX: 3, rotateY: -3 }}
                    className="rounded-2xl border border-purple-300/20 bg-black/30 p-4 shadow-[0_0_40px_rgba(168,85,247,0.12)]"
                  >
                    <p className="text-sm font-bold text-purple-200">
                      {event.title}
                    </p>
                    <p className="mt-2 break-all font-mono text-xs text-white/65">
                      {event.txHash}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-2xl sm:p-6">
              <h2 className="mb-5 text-2xl font-black">
                Recent Activity Timeline
              </h2>
              <div className="space-y-4">
                {events.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-2xl border p-4 ${
                      event.status === "danger"
                        ? "border-red-400/30 bg-red-500/10"
                        : event.status === "success"
                          ? "border-green-300/30 bg-green-300/10"
                          : "border-cyan-300/20 bg-cyan-300/5"
                    }`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        {event.status === "danger" ? (
                          <motion.div
                            animate={{ scale: [1, 1.16, 1] }}
                            transition={{ repeat: Infinity, duration: 1.2 }}
                          >
                            <FaExclamationTriangle className="text-red-300" />
                          </motion.div>
                        ) : (
                          <FaCheckCircle className="text-green-300" />
                        )}
                        <div>
                          <p className="font-black">{event.title}</p>
                          <p className="text-sm text-white/55">{event.detail}</p>
                        </div>
                      </div>
                      <span className="text-xs text-white/35">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default AdminDashboard;
