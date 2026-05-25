import React, { useState } from 'react';

export default function EmployerVerification() {
  const [mode, setMode] = useState('upload'); // 'upload' or 'qr'
  const [isVerifying, setIsVerifying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentLog, setCurrentLog] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleStartVerification = () => {
    setIsVerifying(true);
    setShowResult(false);
    setProgress(0);
    
    const logs = [
      'Initializing system calibration...',
      'Syncing with decentralized data nodes...',
      'Running cryptographic ledger hash match...',
      'Validation successfully finalized!'
    ];

    // Step-by-step loading timeline
    setTimeout(() => { setProgress(25); setCurrentLog(logs[0]); }, 400);
    setTimeout(() => { setProgress(55); setCurrentLog(logs[1]); }, 1200);
    setTimeout(() => { setProgress(85); setCurrentLog(logs[2]); }, 2200);
    
    setTimeout(() => { 
      setProgress(100); 
      setCurrentLog(logs[3]);
      setTimeout(() => {
        setIsVerifying(false);
        setShowResult(true);
      }, 600);
    }, 3200);
  };

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 flex flex-col justify-between font-sans antialiased relative overflow-hidden">
      
      {/* 1. EMBEDDED PURE CSS ANIMATION KEYFRAMES */}
      <style>{`
        @keyframes pageSlideIn {
          0% { transform: translateX(30px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes cardPopUp {
          0% { transform: translateY(20px) scale(0.98); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes cyberPulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px #00f2fe); }
          50% { transform: scale(1.03); filter: drop-shadow(0 0 15px #00f2fe); }
        }
        @keyframes auraGlow {
          0%, 100% { opacity: 0.3; transform: scale(1) translate(0px, 0px); }
          50% { opacity: 0.5; transform: scale(1.1) translate(10px, -10px); }
        }
        .animate-slide-page { animation: pageSlideIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-card-pop { animation: cardPopUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.1) forwards; }
        .animate-cyber-avatar { animation: cyberPulse 2s infinite ease-in-out; }
        .animate-aura { animation: auraGlow 6s infinite ease-in-out; }
      `}</style>

      {/* Futuristic Background Neon Aura Flares */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none animate-aura" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[130px] pointer-events-none animate-aura" style={{ animationDelay: '3s' }} />

      {/* Main Container */}
      <main className="max-w-4xl w-full mx-auto px-6 py-12 flex-grow flex flex-col items-center justify-center relative z-10">
        
        {/* Header Text */}
        <div className="text-center max-w-xl mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
            VeriChain <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400 font-mono">INTEGRITY_CHECK</span>
          </h1>
          <p className="text-slate-400 text-sm">
            Designed for rapid employer verification demos with premium UX polish.
          </p>
        </div>

        {/* Outer Premium Container Box */}
        <div className="w-full max-w-lg bg-[#0e1326]/60 border border-slate-800/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl shadow-black/60 relative">
          
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> Verification Actions
          </h2>

          {/* Mode Switcher Toggle with Sliding Visual Effect */}
          <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-900 mb-6 relative">
            <button
              onClick={() => setMode('upload')}
              className={`flex-1 text-center py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-300 relative z-10 ${mode === 'upload' ? 'text-white font-bold' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Upload Certificate
            </button>
            <button
              onClick={() => setMode('qr')}
              className={`flex-1 text-center py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-300 relative z-10 ${mode === 'qr' ? 'text-white font-bold' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Scan QR Code
            </button>
            {/* Sliding Background Pillar effect */}
            <div 
              className="absolute top-1.5 bottom-1.5 left-1.5 rounded-lg bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 transition-all duration-300 pointer-events-none"
              style={{
                width: 'calc(50% - 12px)',
                transform: mode === 'qr' ? 'translateX(100%)' : 'translateX(0)'
              }}
            />
          </div>

          {/* 2. SLIDING CONTENT TRACK */}
          <div key={mode} className="animate-slide-page space-y-6">
            {mode === 'upload' ? (
              <div className="space-y-4">
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider">Upload certificate file</label>
                <div className="border border-dashed border-slate-800 hover:border-cyan-500/50 rounded-xl p-6 bg-slate-950/40 text-center cursor-pointer transition-all">
                  <div className="text-2xl mb-2">📄</div>
                  <p className="text-xs text-slate-300 font-medium">Choose a file to upload</p>
                  <p className="text-[10px] text-slate-500 mt-1">PDF, PNG, or JPEG recommended</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider">Camera Scan Portal</label>
                <div className="border border-slate-800 rounded-xl aspect-video bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-x-0 h-0.5 bg-cyan-400 top-0 animate-bounce opacity-40 shadow-[0_0_10px_#00f2fe]" />
                  <div className="text-3xl opacity-40">🔲</div>
                  <p className="text-[11px] text-slate-500 mt-2 font-mono">Initializing device video pipeline...</p>
                </div>
              </div>
            )}

            {/* Verification Fire Trigger Button */}
            {!isVerifying && (
              <button
                onClick={handleStartVerification}
                className="w-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white font-medium text-xs py-3 rounded-xl tracking-widest uppercase shadow-lg shadow-cyan-500/10 hover:brightness-110 active:scale-[0.99] transition-all duration-200"
              >
                Start Upload Verification
              </button>
            )}
          </div>

          {/* 3. CYBERPUNK ANIME CHARACTER LOADING OVERLAY */}
          {isVerifying && (
            <div className="mt-8 pt-6 border-t border-slate-900 text-center space-y-6">
              
              {/* Custom SVG Anime Futuristic HUD Interface Avatar */}
              <div className="w-24 h-24 mx-auto relative flex items-center justify-center">
                
                {/* Spinning Tech Rings */}
                <div className="absolute inset-0 border-2 border-dashed border-cyan-400/30 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
                <div className="absolute inset-2 border border-dotted border-indigo-400/40 rounded-full animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }} />
                
                {/* Vector Anime Cyber Tech Avatar Core */}
                <div className="w-16 h-16 rounded-full bg-slate-950 border border-cyan-400 flex items-center justify-center overflow-hidden relative z-10 animate-cyber-avatar">
                  <svg viewBox="0 0 64 64" className="w-12 h-12 text-cyan-400 drop-shadow-[0_0_4px_#00f2fe]" fill="currentColor">
                    {/* Futuristic Headset Visor Vector */}
                    <path d="M32 12C20.95 12 12 20.95 12 32c0 4.1.1 7.2 1.3 9.4l3.1-2.1C15.5 37.7 15 35.1 15 32c0-9.38 7.62-17 17-17s17 7.62 17 17c0 3.1-.5 3.9-1.4 5.9l3.1 2.1c1.2-2.2 1.3-5.3 1.3-9.4 0-11.05-8.95-20-20-20z" opacity="0.6" />
                    {/* Spiky Sci-Fi Anime Hair Silhouette */}
                    <path d="M32 16l4 8-6-2 5 9-7-4 2 11-5-8-3 8-1-11-5 4 4-9-6 2 8-8z" />
                    {/* Tech Mask Visor Line */}
                    <path d="M20 36h24v4H20z" className="fill-indigo-400 animate-pulse" />
                    <circle cx="32" cy="38" r="1.5" className="fill-cyan-300" />
                  </svg>
                </div>
              </div>

              {/* Dynamic Progress Indicator */}
              <div className="max-w-xs mx-auto space-y-2">
                <div className="flex justify-between text-[10px] font-mono text-cyan-400 tracking-wider">
                  <span>SYSTEM_SCAN_SEQUENCE</span>
                  <span className="font-bold">{progress}%</span>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded-full p-0.5 border border-slate-900 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full rounded-full transition-all duration-300 shadow-[0_0_8px_#00f2fe]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-500 font-mono h-4 tracking-tight animate-pulse truncate">
                  &gt;&gt; {currentLog}
                </p>
              </div>

            </div>
          )}

          {/* 4. PREMIUM CARD RESULTS (BOUNCY ENTRIES) */}
          {showResult && (
            <div className="mt-8 pt-6 border-t border-slate-900 animate-card-pop">
              <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
                <div className="flex gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 text-emerald-400 text-xs font-bold">
                    ✓
                  </div>
                  <div className="space-y-3 w-full">
                    <div>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-widest bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                        GENUINE BLOCK CONFIRMED
                      </span>
                      <h4 className="text-base font-bold text-white mt-2">Poorvi N</h4>
                      <p className="text-xs text-slate-400">B.E. Computer Science & Engineering</p>
                    </div>
                    <div className="text-[10px] font-mono bg-slate-950/80 p-3 rounded-lg border border-slate-900 break-all text-slate-400">
                      <span className="text-slate-600 font-bold block mb-0.5">LEDGER_HASH_STAMP:</span>
                      0x74f1bc92a83d4e8c11a0bb33f2e82cd9145faee7b19cba0021fefde8319eac52
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Footer System Status */}
      <footer className="border-t border-slate-900/60 bg-[#070a13] py-4 px-6 text-[10px] text-slate-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© 2026 VeriChain Framework. Live Sandbox Module.</p>
        <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> CORE_GUI_ACTIVE</span>
      </footer>

    </div>
  );
}