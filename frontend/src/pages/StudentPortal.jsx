import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaCloudUploadAlt,
  FaExclamationTriangle,
  FaFingerprint,
  FaShieldAlt,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import { verifyCertificate } from "../services/certificateApi";
import { useActivity } from "../context/GlobalActivityContext";

const steps = [
  "OCR extraction",
  "Metadata parsing",
  "Hash generation",
  "Blockchain comparison",
  "Verification result",
];

function StudentPortal() {
  const { pushEvent } = useActivity();
  const [file, setFile] = useState(null);
  const [blockchainHash, setBlockchainHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);

  const selectFile = (selectedFile) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    pushEvent({
      type: "verification",
      status: "info",
      title: "Certificate Uploaded",
      detail: selectedFile.name,
    });
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!file) {
      setError("Upload a certificate image.");
      return;
    }

    try {
      setLoading(true);
      setActiveStep(0);
      steps.forEach((step, index) => {
        setTimeout(() => {
          setActiveStep(index);
          pushEvent({
            type: "verification",
            status: "info",
            title:
              step === "OCR extraction"
                ? "OCR Extraction Started"
                : step === "Metadata parsing"
                  ? "Metadata Parsed"
                  : step === "Hash generation"
                    ? "Hash Generated"
                    : step === "Blockchain comparison"
                      ? "Blockchain Comparison"
                      : "Verification Complete",
            detail: file.name,
          });
        }, index * 280);
      });
      const data = new FormData();
      data.append("certificate", file);
      data.append("blockchainHash", blockchainHash);
      const res = await verifyCertificate(data);
      setResult(res.data);
      pushEvent({
        type: "verification",
        status: res.data.status === "VERIFIED" ? "success" : "danger",
        title:
          res.data.status === "VERIFIED"
            ? "Verification Complete"
            : "Tampered Detection Event",
        detail:
          res.data.status === "VERIFIED"
            ? `${res.data.certificateData?.studentName || "Certificate"} verified`
            : "Hash comparison failed",
        studentName: res.data.certificateData?.studentName,
        txHash: res.data.blockchainTx,
      });
    } catch (err) {
      setResult({ status: "TAMPERED" });
      pushEvent({
        type: "verification",
        status: "danger",
        title: "Tampered Detection Event",
        detail: "Verification API returned an error",
      });
    } finally {
      setLoading(false);
      setActiveStep(steps.length - 1);
    }
  };

  const verified = result?.status === "VERIFIED";
  const certificate = result?.certificateData || {};

  return (
    <>
      <Navbar />
      <main className="px-4 pb-24 pt-32 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
              Student Portal
            </p>
            <h1 className="text-4xl font-black sm:text-6xl">
              Verify Credential
            </h1>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1fr]">
            <form
              onSubmit={handleVerify}
              className="rounded-3xl border border-cyan-300/20 bg-slate-950/65 p-5 shadow-[0_0_80px_rgba(34,211,238,0.13)] backdrop-blur-2xl sm:p-8"
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
                  selectFile(e.dataTransfer.files?.[0]);
                }}
                className={`flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition hover:border-cyan-300 ${
                  dragging
                    ? "border-purple-300 bg-purple-300/10"
                    : "border-cyan-300/30 bg-cyan-300/5"
                }`}
              >
                <FaCloudUploadAlt className="mb-5 text-5xl text-cyan-300" />
                <span className="font-bold">
                  {file ? file.name : "Upload received certificate"}
                </span>
                <span className="mt-2 text-sm text-white/45">
                  No manual certificate ID needed
                </span>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => selectFile(e.target.files?.[0])}
                />
              </label>

              <input
                placeholder="Blockchain hash"
                value={blockchainHash}
                onChange={(e) => setBlockchainHash(e.target.value)}
                className="mt-5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 font-mono text-sm outline-none focus:border-cyan-300"
              />

              {error && (
                <div className="mt-5 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-red-100">
                  {error}
                </div>
              )}

              <button
                disabled={loading}
                className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-cyan-300 px-6 py-4 font-black text-slate-950 shadow-[0_0_32px_rgba(34,211,238,0.38)] transition hover:scale-[1.01] disabled:opacity-70"
              >
                <FaShieldAlt />
                {loading ? "Verifying..." : "Run Verification"}
              </button>
            </form>

            <section className="rounded-3xl border border-white/10 bg-black/30 p-5 backdrop-blur-2xl sm:p-6">
              <h2 className="mb-5 text-2xl font-black">Verification Steps</h2>
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <motion.div
                    key={step}
                    animate={
                      loading
                        ? { opacity: [0.45, 1, 0.45] }
                        : { opacity: 1 }
                    }
                    transition={{
                      repeat: loading ? Infinity : 0,
                      delay: index * 0.12,
                      duration: 1.1,
                    }}
                    className={`flex items-center gap-3 rounded-xl border p-4 transition ${
                      activeStep >= index
                        ? "border-cyan-300/40 bg-cyan-300/10"
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-300/10 text-cyan-200">
                      <FaFingerprint />
                    </span>
                    <span className="font-bold">{step}</span>
                  </motion.div>
                ))}
              </div>

              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`mt-6 rounded-2xl border p-6 ${
                    verified
                      ? "border-green-300/30 bg-green-300/10"
                      : "border-red-400/40 bg-red-500/10"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.24em] text-white/45">
                        Result
                      </p>
                      <h3
                        className={`mt-2 text-4xl font-black ${
                          verified ? "text-green-300" : "text-red-300"
                        }`}
                      >
                        {result.status}
                      </h3>
                    </div>
                    {verified ? (
                      <FaCheckCircle className="text-5xl text-green-300" />
                    ) : (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 1.1 }}
                      >
                        <FaExclamationTriangle className="text-5xl text-red-300" />
                      </motion.div>
                    )}
                  </div>

                  {verified ? (
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <Detail label="Student" value={certificate.studentName} />
                      <Detail label="Institution" value={certificate.institutionName} />
                      <Detail label="Degree" value={certificate.degree} />
                      <Detail label="Year" value={certificate.year} />
                      <Detail label="Blockchain TX" value={result.blockchainTx} wide />
                    </div>
                  ) : (
                    <p className="mt-5 text-red-100">
                      Warning: certificate failed integrity verification.
                    </p>
                  )}
                </motion.div>
              )}
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

function Detail({ label, value, wide }) {
  return (
    <div className={`rounded-xl border border-white/10 bg-black/25 p-4 ${wide ? "sm:col-span-2" : ""}`}>
      <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-white/45">
        {label}
      </p>
      <p className="break-all text-white">{value || "-"}</p>
    </div>
  );
}

export default StudentPortal;
