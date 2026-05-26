import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCloudUploadAlt,
  FaExclamationTriangle,
  FaShieldAlt,
} from "react-icons/fa";

import {
  verifyCertificate,
} from "../services/certificateApi";

function VerifySection() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const setSelectedFile = (selectedFile) => {
    if (selectedFile) {
      setFile(selectedFile);
      setError("");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!file) {
      setError("Upload the received certificate image first.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("certificate", file);

      const res = await verifyCertificate(data);
      setResult(res.data);
    } catch (err) {
      setResult({
        status: "TAMPERED",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="verify"
      className="px-4 py-24 sm:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          viewport={{
            once: true,
          }}
          className="relative overflow-hidden rounded-3xl border border-cyan-300/20 bg-slate-950/60 p-5 shadow-[0_0_80px_rgba(34,211,238,0.14)] backdrop-blur-2xl sm:p-8 lg:p-10"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-300 to-transparent" />

          <div className="relative">
            <div className="mb-8 text-center">
              <FaShieldAlt className="mx-auto mb-5 text-5xl text-cyan-300" />
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.32em] text-cyan-300">
                Student Verification
              </p>
              <h2 className="text-3xl font-black text-white sm:text-5xl">
                Verify Received Certificate
              </h2>
            </div>

            <form
              onSubmit={handleVerify}
              className="space-y-6"
            >
              <label
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  setSelectedFile(e.dataTransfer.files?.[0]);
                }}
                className={`flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition ${
                  dragging
                    ? "border-green-300 bg-green-300/10"
                    : "border-cyan-300/30 bg-cyan-300/5 hover:border-cyan-300"
                }`}
              >
                <FaCloudUploadAlt className="mb-5 text-5xl text-cyan-300" />
                <span className="text-lg font-bold text-white">
                  {file ? file.name : "Drop certificate image here"}
                </span>
                <span className="mt-2 text-sm text-white/50">
                  OCR will extract fields from this image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    setSelectedFile(e.target.files?.[0])
                  }
                />
              </label>

              {error && (
                <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-cyan-300 px-6 py-5 text-lg font-black text-slate-950 shadow-[0_0_36px_rgba(34,211,238,0.36)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <FaShieldAlt />
                {loading
                  ? "Running OCR verification..."
                  : "Verify Certificate Image"}
              </button>
            </form>

            {loading && (
              <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  animate={{
                    x: ["-100%", "120%"],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.1,
                    ease: "linear",
                  }}
                  className="h-full w-1/2 rounded-full bg-gradient-to-r from-cyan-300 to-green-300"
                />
              </div>
            )}

            {result && (
              <VerificationCard result={result} />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function VerificationCard({ result }) {
  const verified = result.status === "VERIFIED";
  const certificate =
    result.certificateData ||
    result.certificate ||
    {};

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.4,
      }}
      className={`mt-8 rounded-2xl border p-6 sm:p-8 ${
        verified
          ? "border-green-300/30 bg-green-300/10"
          : "border-red-400/40 bg-red-500/10"
      }`}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-white/50">
            Verification Result
          </p>
          <h3
            className={`mt-2 text-4xl font-black ${
              verified ? "text-green-300" : "text-red-300"
            }`}
          >
            {result.status}
          </h3>
        </div>

        {!verified && (
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
            }}
            className="flex h-16 w-16 items-center justify-center rounded-full border border-red-300/40 bg-red-400/10 text-red-200"
          >
            <FaExclamationTriangle className="text-2xl" />
          </motion.div>
        )}
      </div>

      {verified && (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Detail label="Student" value={certificate.studentName} />
          <Detail label="Institution" value={certificate.institutionName} />
          <Detail label="Degree" value={certificate.degree} />
          <Detail label="Year" value={certificate.year} />
          <Detail label="Certificate ID" value={certificate.certificateId} />
          <Detail
            label="Issue Date"
            value={
              certificate.createdAt
                ? new Date(certificate.createdAt).toLocaleString()
                : ""
            }
          />
          <Detail
            label="Blockchain TX"
            value={result.blockchainTx || certificate.blockchainTx}
            wide
          />

          {certificate.qrCode && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/45">
                QR
              </p>
              <img
                src={certificate.qrCode}
                alt="Certificate QR"
                className="h-36 w-36 rounded-xl bg-white p-3"
              />
            </div>
          )}
        </div>
      )}

      {!verified && (
        <p className="mt-6 text-lg text-red-100">
          Certificate integrity check failed.
        </p>
      )}
    </motion.div>
  );
}

function Detail({ label, value, wide }) {
  return (
    <div
      className={`rounded-xl border border-white/10 bg-black/25 p-4 ${
        wide ? "md:col-span-2" : ""
      }`}
    >
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white/45">
        {label}
      </p>
      <p className="break-all text-white">
        {value || "-"}
      </p>
    </div>
  );
}

export default VerifySection;
