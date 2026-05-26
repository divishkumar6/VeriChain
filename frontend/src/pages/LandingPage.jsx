import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaExchangeAlt,
  FaExclamationTriangle,
  FaIdCard,
  FaQrcode,
  FaShieldAlt,
  FaWallet,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import CyberGrid from "../components/CyberGrid";
import FloatingOrbs from "../components/FloatingOrbs";

const features = [
  ["OCR Verification", "Extract certificate metadata from uploaded documents.", <FaIdCard />],
  ["Blockchain Security", "Store immutable hashes for trusted credential proof.", <FaShieldAlt />],
  ["QR Validation", "Scan certificates directly into verification results.", <FaQrcode />],
  ["Student Wallet", "A Web3-ready portal for student credential checks.", <FaWallet />],
  ["Tamper Detection", "Flag altered files with OCR and hash comparison.", <FaExclamationTriangle />],
];

const routes = [
  ["/institution", "Institution Portal"],
  ["/student", "Student Portal"],
  ["/admin", "Admin Dashboard"],
  ["/login", "Login"],
  ["/signup", "Signup"],
];

const contentSections = [
  [
    "Problem Statement",
    [
      "Fake certificates are easy to circulate as image or PDF files.",
      "Manual verification creates delays for institutions and employers.",
      "Document tampering is hard to detect without a trusted hash trail.",
    ],
  ],
  [
    "Our Solution",
    [
      "OCR extracts visible certificate metadata from uploaded documents.",
      "SHA256 hashing creates a tamper-sensitive digital fingerprint.",
      "Blockchain storage makes the issued certificate proof immutable.",
      "QR verification sends anyone directly to the trusted result page.",
    ],
  ],
  [
    "Security Benefits",
    [
      "Every issued credential has a backend-generated certificate ID.",
      "Tampered text changes the hash and fails blockchain comparison.",
      "Students and verifiers never need direct database access.",
    ],
  ],
  [
    "Why Blockchain",
    [
      "Certificate hashes become independent proofs instead of editable records.",
      "Transactions provide public integrity evidence for audit trails.",
      "Institutions can prove issuance without exposing private student files.",
    ],
  ],
  [
    "AI + OCR",
    [
      "Tesseract.js reads certificate text during student verification.",
      "Parsed metadata becomes the verification payload.",
      "OCR keeps the demo realistic because verification starts from an image.",
    ],
  ],
  [
    "Real-time Verification",
    [
      "Institution and student actions stream into the admin monitor.",
      "The dashboard visualizes OCR, hash, blockchain, QR and tamper events.",
      "Hackathon judges can see the trust pipeline as it happens.",
    ],
  ],
];

function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-24 sm:px-8">
          <CyberGrid />
          <FloatingOrbs />

          <div className="relative z-10 mx-auto max-w-6xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-8 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-5 py-3 text-sm font-bold uppercase tracking-[0.26em] text-cyan-200">
                Blockchain + OCR Credential Defense
              </div>

              <h1 className="text-5xl font-black leading-tight sm:text-7xl lg:text-8xl">
                VeriChain
                <span className="block bg-gradient-to-r from-cyan-300 via-green-300 to-purple-400 bg-clip-text text-transparent">
                  Trust Engine
                </span>
              </h1>

              <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-white/60 sm:text-xl">
                Issue academic certificates, anchor hashes on blockchain,
                embed QR validation, and verify received credentials with OCR
                powered tamper detection.
              </p>

              <div className="mt-12 flex flex-wrap justify-center gap-4">
                {routes.map(([to, label], index) => (
                  <Link
                    key={to}
                    to={to}
                    className={`rounded-full px-6 py-4 font-bold transition hover:scale-105 ${
                      index === 0
                        ? "bg-cyan-300 text-slate-950 shadow-[0_0_36px_rgba(34,211,238,0.42)]"
                        : "border border-white/10 bg-white/5 text-white backdrop-blur-xl hover:border-cyan-300/50"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-black sm:text-5xl">
                Platform Modules
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-white/55">
                Built for hackathon demos where every step of trust needs to be
                visible, fast, and convincing.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
              {features.map(([title, description, icon], index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/40"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-300/10 text-2xl text-cyan-200">
                    {icon}
                  </div>
                  <h3 className="text-xl font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">
                    {description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-28 sm:px-8">
          <div className="mx-auto max-w-5xl rounded-3xl border border-purple-300/20 bg-slate-950/60 p-6 shadow-[0_0_80px_rgba(168,85,247,0.14)] backdrop-blur-2xl sm:p-10">
            <div className="mb-8 flex items-center gap-3">
              <FaExchangeAlt className="text-3xl text-purple-300" />
              <h2 className="text-3xl font-black">Workflow</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                "Institution uploads template and student details",
                "Backend hashes metadata, stores blockchain proof, and generates QR",
                "Student uploads certificate for OCR verification and tamper result",
              ].map((step, index) => (
                <div
                  key={step}
                  className="rounded-2xl border border-white/10 bg-black/25 p-5"
                >
                  <span className="text-sm font-bold text-cyan-300">
                    STEP {index + 1}
                  </span>
                  <p className="mt-3 text-white/75">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-28 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-black sm:text-5xl">
                Trust Architecture
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-white/55">
                VeriChain combines OCR, backend certificate rendering, QR
                validation, and blockchain anchoring into one end-to-end
                verification system.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {contentSections.map(([title, points], index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6, rotateX: 3, rotateY: -3 }}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 shadow-[0_0_50px_rgba(34,211,238,0.08)] backdrop-blur-2xl"
                >
                  <h3 className="text-2xl font-black text-cyan-100">
                    {title}
                  </h3>
                  <div className="mt-5 space-y-3">
                    {points.map((point) => (
                      <div
                        key={point}
                        className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm leading-relaxed text-white/65"
                      >
                        {point}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-28 sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-4">
            {[
              ["Demo Certificates", "Auto-generated IDs"],
              ["Verification Speed", "OCR + chain check"],
              ["Tamper Defense", "Hash mismatch alerts"],
              ["Admin Visibility", "Live workflow monitor"],
            ].map(([label, value]) => (
              <motion.div
                key={label}
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-cyan-300/20 bg-cyan-300/5 p-6 text-center backdrop-blur-xl"
              >
                <p className="text-sm uppercase tracking-[0.2em] text-white/45">
                  {label}
                </p>
                <p className="mt-3 text-2xl font-black text-cyan-200">
                  {value}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default LandingPage;
