import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import VerifySection, {
  VerificationCard,
} from "../components/VerifySection";
import {
  getCertificate,
} from "../services/certificateApi";

function VerifyCertificate() {
  const { certificateId: routeCertificateId } = useParams();
  const [searchParams] = useSearchParams();
  const certificateId =
    routeCertificateId ||
    searchParams.get("certificateId");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(Boolean(certificateId));

  useEffect(() => {
    if (!certificateId) {
      return;
    }

    async function fetchCertificate() {
      try {
        setLoading(true);
        const res = await getCertificate(certificateId);
        setResult(res.data);
      } catch (error) {
        setResult({
          status: "TAMPERED",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchCertificate();
  }, [certificateId]);

  if (!certificateId) {
    return (
      <>
        <Navbar />
        <div className="pt-20">
          <VerifySection />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="px-4 pb-24 pt-32 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{
              opacity: 0,
              y: 28,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-3xl border border-cyan-300/20 bg-slate-950/60 p-5 shadow-[0_0_80px_rgba(34,211,238,0.14)] backdrop-blur-2xl sm:p-8 lg:p-10"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.32em] text-cyan-300">
              QR Verification
            </p>
            <h1 className="text-3xl font-black text-white sm:text-5xl">
              Certificate Result
            </h1>

            {loading && (
              <div className="mt-8">
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
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
                <p className="mt-4 text-white/55">
                  Fetching certificate from backend...
                </p>
              </div>
            )}

            {result && (
              <VerificationCard result={result} />
            )}
          </motion.div>
        </div>
      </main>
    </>
  );
}

export default VerifyCertificate;
