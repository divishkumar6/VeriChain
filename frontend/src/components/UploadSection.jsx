import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCloudUploadAlt,
  FaDownload,
  FaFingerprint,
  FaQrcode,
} from "react-icons/fa";

import {
  uploadCertificate,
} from "../services/certificateApi";

const emptyForm = {
  studentName: "",
  institutionName: "",
  degree: "",
  year: "",
};

function UploadSection() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const setDroppedFile = (selectedFile) => {
    if (selectedFile) {
      setFile(selectedFile);
      setError("");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setError("");
    setResponse(null);

    if (!file) {
      setError("Upload a certificate template image first.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("certificate", file);

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      const res = await uploadCertificate(data);
      setResponse(res.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
        "Certificate issuance failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="upload"
      className="px-4 py-24 sm:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
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
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />

          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-8">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.32em] text-cyan-300">
                  Institution Console
                </p>
                <h2 className="text-3xl font-black text-white sm:text-5xl">
                  Issue Certificate
                </h2>
              </div>

              <form
                onSubmit={handleUpload}
                className="space-y-6"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    ["studentName", "Student Name"],
                    ["institutionName", "Institution"],
                    ["degree", "Degree"],
                    ["year", "Year"],
                  ].map(([name, label]) => (
                    <label
                      key={name}
                      className="block"
                    >
                      <span className="mb-2 block text-sm text-white/60">
                        {label}
                      </span>
                      <input
                        type="text"
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none transition focus:border-cyan-300 focus:shadow-[0_0_22px_rgba(34,211,238,0.22)]"
                      />
                    </label>
                  ))}
                </div>

                <label
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    setDroppedFile(e.dataTransfer.files?.[0]);
                  }}
                  className={`flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition ${
                    dragging
                      ? "border-green-300 bg-green-300/10"
                      : "border-cyan-300/30 bg-cyan-300/5 hover:border-cyan-300"
                  }`}
                >
                  <FaCloudUploadAlt className="mb-5 text-5xl text-cyan-300" />
                  <span className="text-lg font-bold text-white">
                    {file ? file.name : "Drop template image here"}
                  </span>
                  <span className="mt-2 text-sm text-white/50">
                    PNG, JPG, or JPEG template accepted
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      setDroppedFile(e.target.files?.[0])
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
                  <FaFingerprint />
                  {loading
                    ? "Writing certificate to chain..."
                    : "Generate and Store Certificate"}
                </button>
              </form>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-5 sm:p-6">
              {!response && (
                <div className="flex h-full min-h-80 flex-col justify-center">
                  <div className="mb-6 h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      animate={{
                        x: loading ? ["-100%", "120%"] : "-100%",
                      }}
                      transition={{
                        repeat: loading ? Infinity : 0,
                        duration: 1.1,
                        ease: "linear",
                      }}
                      className="h-full w-1/2 rounded-full bg-gradient-to-r from-cyan-300 to-green-300"
                    />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-[0.28em] text-green-300">
                    Chain Status
                  </p>
                  <p className="mt-3 text-2xl font-black text-white">
                    Awaiting issuance payload
                  </p>
                  <p className="mt-4 text-white/55">
                    The backend will generate the hash, store it on blockchain,
                    save MongoDB metadata, generate QR, and return the final
                    certificate artifact.
                  </p>
                </div>
              )}

              {response && (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  className="space-y-6"
                >
                  <div className="rounded-2xl border border-green-300/30 bg-green-300/10 p-5">
                    <p className="text-sm font-bold uppercase tracking-[0.28em] text-green-300">
                      Issued
                    </p>
                    <h3 className="mt-2 text-3xl font-black text-white">
                      Certificate Uploaded
                    </h3>
                  </div>

                  <div className="space-y-4 text-sm">
                    <PreviewRow
                      label="Certificate ID"
                      value={response.certificateId}
                    />
                    <PreviewRow
                      label="Blockchain Hash"
                      value={response.certificateHash}
                    />
                    <PreviewRow
                      label="Blockchain TX"
                      value={response.blockchainTx}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-[auto_1fr]">
                    <div>
                      <div className="mb-3 flex items-center gap-2 text-white/70">
                        <FaQrcode className="text-cyan-300" />
                        QR Preview
                      </div>
                      <img
                        src={response.qrCode}
                        alt="Certificate QR"
                        className="h-40 w-40 rounded-xl bg-white p-3"
                      />
                    </div>

                    {response.generatedCertificateUrl && (
                      <a
                        href={response.generatedCertificateUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-3 self-end rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-5 py-4 font-bold text-cyan-100 transition hover:border-cyan-300"
                      >
                        <FaDownload />
                        Download Generated Certificate
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PreviewRow({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white/45">
        {label}
      </p>
      <p className="break-all font-mono text-cyan-100">
        {value}
      </p>
    </div>
  );
}

export default UploadSection;
