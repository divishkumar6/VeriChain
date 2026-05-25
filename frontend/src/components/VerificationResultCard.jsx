import React from 'react';

const statusConfig = {
  Verified: {
    title: 'VERIFIED CERTIFICATE',
    subtitle: 'Blockchain Integrity: VALID',
    description: 'Certificate hash matches ledger state and issuer records.',
    accent: 'from-emerald-500 via-emerald-400 to-emerald-300',
    badge: 'VALID',
  },
  Tampered: {
    title: 'TAMPERED CERTIFICATE',
    subtitle: 'Hash Mismatch Detected',
    description: 'Certificate contents do not match the recorded blockchain fingerprint.',
    accent: 'from-red-500 via-red-400 to-red-300',
    badge: 'INVALID',
  },
  Suspicious: {
    title: 'SUSPICIOUS CERTIFICATE',
    subtitle: 'Template Inconsistency Detected',
    description: 'The certificate format differs from the trusted issuer template.',
    accent: 'from-amber-500 via-amber-400 to-amber-300',
    badge: 'REVIEW',
  },
};

export default function VerificationResultCard({ status }) {
  const config = statusConfig[status];

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30">
      <div className={`mb-4 inline-flex rounded-full bg-gradient-to-r ${config.accent} px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-900/20`}>
        {config.badge}
      </div>
      <h3 className="text-xl font-semibold text-white">{config.title}</h3>
      <p className="mt-2 text-slate-300">{config.subtitle}</p>
      <p className="mt-4 text-sm leading-6 text-slate-400">{config.description}</p>
      <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
        <span className="inline-flex h-2 w-2 rounded-full bg-white/70" />
        <span>Employer verification readiness</span>
      </div>
    </div>
  );
}
