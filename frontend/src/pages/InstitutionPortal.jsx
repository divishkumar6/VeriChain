import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCertificate,
  FaCircleNotch,
  FaDownload,
  FaQrcode,
  FaRocket,
  FaSave,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import { uploadCertificate } from "../services/certificateApi";
import { useActivity } from "../context/GlobalActivityContext";

function InstitutionPortal() {
  const { pushEvent } = useActivity();
  const [mode, setMode] = useState("template");
  const [template, setTemplate] = useState(null);
  const [templatePreview, setTemplatePreview] = useState("");
  const [templateData, setTemplateData] = useState({
    institutionName: "",
    degree: "",
  });
  const [studentName, setStudentName] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);

  const saveTemplate = (e) => {
    e.preventDefault();
    setError("");

    if (!template) {
      setError("Upload a standard certificate template.");
      return;
    }

    pushEvent({
      type: "template",
      status: "success",
      title: "Certificate template registered",
      detail: `${templateData.institutionName} registered ${templateData.degree} template`,
      institution: templateData.institutionName,
    });
    setMode("issue");
  };

  const selectTemplate = (file) => {
    if (!file) return;
    pushEvent({
      type: "template",
      status: "info",
      title: "Template upload initiated",
      detail: file.name,
    });
    setTemplate(file);
    setTemplatePreview(URL.createObjectURL(file));
  };

  const issueCertificate = async (e) => {
    e.preventDefault();
    setError("");
    setResponse(null);

    if (!template) {
      setError("Save a template before issuing certificates.");
      setMode("template");
      return;
    }

    try {
      setLoading(true);
      pushEvent({
        type: "issuance",
        status: "info",
        title: "Student Data Received",
        detail: `${studentName} | ${year}`,
        studentName,
        year,
      });
      pushEvent({
        type: "issuance",
        status: "info",
        title: "Issuance Started",
        detail: "Rendering certificate from saved template",
        studentName,
        year,
      });
      const data = new FormData();
      data.append("certificate", template);
      data.append("studentName", studentName);
      data.append("year", year);
      data.append("institutionName", templateData.institutionName);
      data.append("degree", templateData.degree);

      const res = await uploadCertificate(data);
      setResponse(res.data);
      [
        "Certificate Rendered",
        "SHA256 Hash Generated",
        "Blockchain Transaction Initiated",
        "Transaction Confirmed",
        "QR Code Generated",
        "Certificate Issued",
      ].forEach((title, index) => {
        setTimeout(() => {
          pushEvent({
            type: "issuance",
            status: index === 5 ? "success" : "info",
            title,
            detail:
              index === 1
                ? res.data.certificateHash
                : index === 3
                  ? res.data.blockchainTx
                  : `${studentName} certificate workflow`,
            certificateId: res.data.certificateId,
            studentName,
            year,
            txHash: res.data.blockchainTx,
            certificateHash: res.data.certificateHash,
          });
        }, index * 180);
      });
    } catch (err) {
      setError(err.response?.data?.error || "Certificate issuance failed.");
      pushEvent({
        type: "issuance",
        status: "danger",
        title: "Certificate Issuance Failed",
        detail: err.response?.data?.error || "Backend rejected issuance request",
        studentName,
        year,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="relative px-4 pb-24 pt-32 sm:px-8">
        <div className="pointer-events-none absolute left-10 top-32 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="pointer-events-none absolute right-10 top-52 h-80 w-80 rounded-full bg-purple-400/10 blur-3xl" />
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
                Institution Portal
              </p>
              <h1 className="text-5xl font-black tracking-tight sm:text-7xl">
                Certificate Issuance
              </h1>
            </div>

            <div className="flex rounded-[28px] border border-white/10 bg-white/5 p-1 shadow-[inset_0_0_28px_rgba(255,255,255,0.04)] backdrop-blur-2xl">
              {[
                ["template", "Template Setup"],
                ["issue", "Certificate Issuance"],
              ].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setMode(key)}
                  className={`rounded-[22px] px-5 py-4 text-sm font-black transition ${
                    mode === key
                      ? "bg-cyan-300 text-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.35)]"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <motion.section
              layout
              className="relative overflow-hidden rounded-[34px] border border-cyan-300/20 bg-slate-950/70 p-5 shadow-[0_0_90px_rgba(34,211,238,0.12)] backdrop-blur-2xl sm:p-8"
            >
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-300/10 blur-3xl" />
              {mode === "template" && (
                <form onSubmit={saveTemplate} className="space-y-5">
                  <h2 className="text-3xl font-black">Template Setup</h2>
                  <input
                    required
                    placeholder="Institution Name"
                    value={templateData.institutionName}
                    onChange={(e) =>
                      setTemplateData({
                        ...templateData,
                        institutionName: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none focus:border-cyan-300"
                  />
                  <input
                    required
                    placeholder="Degree Name"
                    value={templateData.degree}
                    onChange={(e) =>
                      setTemplateData({
                        ...templateData,
                        degree: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none focus:border-cyan-300"
                  />
                  <label className="flex min-h-60 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-cyan-300/30 bg-cyan-300/5 p-8 text-center transition hover:border-cyan-300">
                    <FaCertificate className="mb-4 text-5xl text-cyan-300" />
                    <span className="font-bold">
                      {template ? template.name : "Upload standard template"}
                    </span>
                    <span className="mt-2 text-sm text-white/45">
                      Stored in frontend state for hackathon demo
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => selectTemplate(e.target.files?.[0])}
                    />
                  </label>
                  <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-cyan-300 px-6 py-4 font-black text-slate-950 shadow-[0_0_32px_rgba(34,211,238,0.38)]">
                    <FaSave />
                    Save Template
                  </button>
                </form>
              )}

              {mode === "issue" && (
                <form onSubmit={issueCertificate} className="space-y-5">
                  <h2 className="text-3xl font-black">Issue Certificate</h2>
                  <div className="flex items-center gap-3 rounded-2xl border border-cyan-300/20 bg-cyan-300/5 p-4 text-sm text-cyan-100">
                    <FaRocket className="text-cyan-300" />
                    <span>
                      Certificate ID, SHA256 hash, blockchain transaction, and QR are generated by the backend.
                    </span>
                  </div>
                  <input
                    required
                    placeholder="Student Name"
                    value={studentName}
                    onChange={(e) => {
                      setStudentName(e.target.value);
                      if (e.target.value.trim()) {
                        pushEvent({
                          type: "issuance",
                          status: "info",
                          title: "Student Data Entered",
                          detail: `${e.target.value} queued for certificate issuance`,
                          studentName: e.target.value,
                          year,
                        });
                      }
                    }}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none focus:border-cyan-300"
                  />
                  <input
                    required
                    placeholder="Year"
                    value={year}
                    onChange={(e) => {
                      setYear(e.target.value);
                      if (studentName.trim()) {
                        pushEvent({
                          type: "issuance",
                          status: "info",
                          title: "Issuance Year Entered",
                          detail: `${studentName} | ${e.target.value}`,
                          studentName,
                          year: e.target.value,
                        });
                      }
                    }}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none focus:border-cyan-300"
                  />
                  <button
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-3 rounded-2xl bg-cyan-300 px-6 py-5 text-lg font-black text-slate-950 shadow-[0_0_38px_rgba(34,211,238,0.42)] transition hover:scale-[1.01] disabled:opacity-70"
                  >
                    {loading ? (
                      <FaCircleNotch className="animate-spin" />
                    ) : (
                      <FaCertificate />
                    )}
                    {loading ? "Generating on chain..." : "Generate Certificate"}
                  </button>
                </form>
              )}

              {error && (
                <div className="mt-5 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-red-100">
                  {error}
                </div>
              )}
            </motion.section>

            <section className="relative overflow-hidden rounded-[34px] border border-white/10 bg-black/40 p-5 shadow-[0_0_90px_rgba(168,85,247,0.1)] backdrop-blur-2xl sm:p-6">
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
              <h2 className="mb-5 text-3xl font-black">Live Preview</h2>
              {templatePreview && (
                <div className="mb-5 rounded-[28px] border border-white/10 bg-white/[0.03] p-4 shadow-[inset_0_0_36px_rgba(255,255,255,0.04)]">
                  <img
                    src={templatePreview}
                    alt="Certificate template preview"
                    className="max-h-80 w-full rounded-2xl object-contain"
                  />
                </div>
              )}

              {loading && (
                <div className="mb-5 h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    animate={{ x: ["-100%", "120%"] }}
                    transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
                    className="h-full w-1/2 rounded-full bg-gradient-to-r from-cyan-300 to-purple-300"
                  />
                </div>
              )}

              {response && (
                <div className="space-y-4">
                  {response.generatedCertificateUrl && (
                    <div className="rounded-[28px] border border-green-300/30 bg-green-300/5 p-4 shadow-[0_0_42px_rgba(134,239,172,0.12)]">
                      <img
                        src={response.generatedCertificateUrl}
                        alt="Generated certificate preview"
                        className="w-full rounded-2xl object-contain"
                      />
                    </div>
                  )}
                  <Data label="Certificate ID" value={response.certificateId} />
                  <Data label="Blockchain Hash" value={response.certificateHash} />
                  <Data label="Tx Hash" value={response.blockchainTx} />
                  <div className="flex flex-wrap items-end gap-4">
                    {response.qrCode && (
                      <div>
                        <div className="mb-2 flex items-center gap-2 text-white/60">
                          <FaQrcode className="text-cyan-300" />
                          QR Code
                        </div>
                        <img
                          src={response.qrCode}
                          alt="QR"
                          className="h-36 w-36 rounded-xl bg-white p-3"
                        />
                      </div>
                    )}
                    {response.generatedCertificateUrl && (
                      <a
                        href={response.generatedCertificateUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-5 py-4 font-bold text-cyan-100"
                      >
                        <FaDownload />
                        Download
                      </a>
                    )}
                  </div>
                </div>
              )}
            </section>
          </div>

          {response && (
            <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-2xl sm:p-8">
              <h2 className="mb-5 text-2xl font-black">Issuance History</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <Data label="Latest Student" value={studentName} />
                <Data label="Latest Year" value={year} />
                <Data label="Blockchain Status" value="Transaction confirmed" />
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}

function Data({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white/45">
        {label}
      </p>
      <p className="break-all font-mono text-sm text-cyan-100">{value}</p>
    </div>
  );
}

export default InstitutionPortal;
