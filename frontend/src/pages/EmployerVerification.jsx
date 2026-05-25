import React, { useState, useRef, useEffect } from 'react';

export function EmployerVerification() {
  const [file, setFile] = useState(null);
  const [stage, setStage] = useState('idle'); // 'idle' | 'scanning' | 'computing' | 'result'
  const [progress, setProgress] = useState(0);
  const [logText, setLogText] = useState('');
  const [isGenuine, setIsGenuine] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glossPos, setGlossPos] = useState({ x: 50, y: 50 });
  
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  // --- 3D HYPER-PARALLAX MOUSE MATRIX ---
  const handleMouseMove3D = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const cardX = e.clientX - card.left;
    const cardY = e.clientY - card.top;
    const centerX = card.width / 2;
    const centerY = card.height / 2;
    
    // Increased rotation angle for more extreme 3D depth tilt
    const rotateX = ((cardY - centerY) / centerY) * 38; 
    const rotateY = -((cardX - centerX) / centerX) * 38; 
    
    setRotate({ x: rotateX, y: rotateY });
    setGlossPos({ x: (cardX / card.width) * 100, y: (cardY / card.height) * 100 });
  };

  const reset3DEffect = () => {
    setRotate({ x: 0, y: 0 });
  };

  // --- OVERCLOCKED FULL-SCREEN MATRIX NETWORKING BACKDROP ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const points = [];
    // Cranked up point count for a denser, hyper-alive background network mesh
    const maxPoints = 120; 

    for (let i = 0; i < maxPoints; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 4.5, // Faster drift speed
        vy: (Math.random() - 0.5) * 4.5
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      let cyberColor = '0, 242, 254'; 
      if (stage === 'scanning') cyberColor = '245, 158, 11'; // Neon Amber
      if (stage === 'computing') cyberColor = '34, 197, 94'; // Cyber Green
      if (stage === 'result' && !isGenuine) cyberColor = '239, 68, 68'; // Warning Red

      for (let i = 0; i < maxPoints; i++) {
        const p1 = points[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        ctx.fillStyle = `rgba(${cyberColor}, 0.85)`;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < maxPoints; j++) {
          const p2 = points[j];
          const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (distance < 140) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${cyberColor}, ${0.35 - distance / 140})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [stage, isGenuine]);

  const triggerUploadStream = () => {
    if (stage === 'scanning' || stage === 'computing') return;
    fileInputRef.current.click();
  };

  const handleFileCapture = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStage('idle');
    }
  };

  const runQuantumVerification = () => {
    if (!file) {
      alert("🛑 CORE ERROR: Load a valid encrypted file packet before running validation matrix.");
      return;
    }

    setStage('scanning');
    setProgress(15);
    setLogText('🖥️ COLD-BOOTING SECURE PARSING KERNELS...');

    setTimeout(() => {
      setStage('computing');
      
      const serverLogs = [
        '📡 CONNECTING TO BLOCKCHAIN LEDGER INSTANCES...',
        '🔒 EXTRACTING CRYPTOGRAPHIC STORAGE SHARES...',
        '💾 COMPUTING CHECKSUM PARITY CHECKS...',
        '⚡ CROSS-REFERENCING SYSTEM IDENTITY KEYS...'
      ];

      let logStep = 0;
      const coreTimer = setInterval(() => {
        if (logStep < serverLogs.length) {
          setLogText(serverLogs[logStep]);
          setProgress((prev) => Math.min(prev + 22, 96));
          logStep++;
        } else {
          clearInterval(coreTimer);
          setProgress(100);
          
          setTimeout(() => {
            const fileNameLower = file.name.toLowerCase();
            const validSignature = fileNameLower.includes('cert') || 
                                   fileNameLower.includes('verify') || 
                                   fileNameLower.includes('proof') || 
                                   fileNameLower.includes('pdf') || 
                                   fileNameLower.includes('doc');

            setIsGenuine(validSignature);
            setStage('result');
          }, 600);
        }
      }, 800);

    }, 1500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#01030a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"Courier New", Courier, monospace',
      position: 'relative',
      overflow: 'hidden',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      
      {/* Background canvas link */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }} />

      {/* CSS STYLESHEET FOR HYPER-ANIMATIONS */}
      <style>{`
        @keyframes sweepLaserEffect {
          0% { top: -5%; filter: drop-shadow(0 0 15px #00f2fe); }
          50% { filter: drop-shadow(0 0 35px #00f2fe) brightness(2); }
          100% { top: 105%; filter: drop-shadow(0 0 15px #00f2fe); }
        }
        @keyframes mainframeNeonGlow {
          0%, 100% { border-color: rgba(0, 242, 254, 0.4); box-shadow: 0 30px 70px rgba(0,0,0,0.8), 0 0 30px rgba(0, 242, 254, 0.15); }
          50% { border-color: rgba(0, 242, 254, 0.9); box-shadow: 0 30px 70px rgba(0,0,0,0.8), 0 0 60px rgba(0, 242, 254, 0.4); }
        }
        @keyframes computedNeonGlow {
          0%, 100% { border-color: rgba(34, 197, 94, 0.4); box-shadow: 0 30px 70px rgba(0,0,0,0.8), 0 0 30px rgba(34, 197, 94, 0.15); }
          50% { border-color: rgba(34, 197, 94, 0.9); box-shadow: 0 30px 70px rgba(0,0,0,0.8), 0 0 60px rgba(34, 197, 94, 0.4); }
        }
        @keyframes alarmSirenPulse {
          0%, 100% { border-color: #ef4444; box-shadow: 0 0 30px rgba(239, 68, 68, 0.3), inset 0 0 20px rgba(239, 68, 68, 0.2); filter: saturate(1); }
          50% { border-color: #ff2222; box-shadow: 0 0 70px #ef4444, inset 0 0 40px rgba(239, 68, 68, 0.5); filter: saturate(1.4); }
        }
        @keyframes rippleRingRadar {
          0% { transform: scale(0.85); opacity: 1; filter: blur(0px); }
          100% { transform: scale(1.35); opacity: 0; filter: blur(8px); }
        }
        @keyframes dynamicChassisRotation {
          0% { transform: rotateY(0deg) rotateX(10deg); }
          50% { transform: rotateY(180deg) rotateX(-10deg); }
          100% { transform: rotateY(360deg) rotateX(10deg); }
        }
        @keyframes holographicGlitchLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
        .laser-sweep { position: absolute; left: 0; right: 0; height: 6px; background: linear-gradient(90deg, transparent, #00f2fe, #ffffff, #00f2fe, transparent); animation: sweepLaserEffect 1.5s infinite ease-in-out; zIndex: 10; }
        .cyber-chassis-idle { animation: mainframeNeonGlow 3s infinite ease-in-out; }
        .cyber-chassis-computing { animation: computedNeonGlow 2s infinite ease-in-out; }
        .emergency-lockdown { animation: alarmSirenPulse 0.4s infinite ease-in-out !important; }
        .radar-pulse-ring { position: absolute; inset: 0; border: 3px solid #22c55e; border-radius: 24px; animation: rippleRingRadar 2.2s infinite ease-out; pointer-events: none; }
        .spinning-mainframe-cube { animation: dynamicChassisRotation 7s infinite linear; transform-style: preserve-3d; }
        .glitch-bar-overlay { position: absolute; width: 100%; height: 2px; background: rgba(0, 242, 254, 0.15); animation: holographicGlitchLine 2.5s infinite linear; pointer-events: none; }
      `}</style>

      {/* MAIN CORES TERMINAL INTERFACE CONTAINER */}
      <div 
        onMouseMove={handleMouseMove3D}
        onMouseLeave={reset3DEffect}
        style={{
          position: 'relative',
          zIndex: 5,
          width: '100%',
          maxWidth: '510px',
          background: 'rgba(2, 4, 12, 0.93)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(0, 242, 254, 0.3)',
          borderRadius: '24px',
          padding: '45px 35px',
          transformStyle: 'preserve-3d',
          transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: 'transform 0.08s ease-out, border-color 0.4s',
          boxSizing: 'border-box'
        }}
        className={
          stage === 'result' && !isGenuine ? 'emergency-lockdown' : 
          stage === 'computing' || stage === 'scanning' ? 'cyber-chassis-computing' : 'cyber-chassis-idle'
        }
      >
        
        {/* Holographic light reflection matrix */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '24px',
          background: `radial-gradient(circle at ${glossPos.x}% ${glossPos.y}%, rgba(0, 242, 254, 0.18) 0%, transparent 55%)`,
          pointerEvents: 'none',
          zIndex: 6
        }} />
        <div className="glitch-bar-overlay" />

        {/* Outer Corner Alignment Targets */}
        <div style={{ position: 'absolute', top: '16px', left: '16px', width: '15px', height: '15px', borderTop: '3px solid #00f2fe', borderLeft: '3px solid #00f2fe' }} />
        <div style={{ position: 'absolute', top: '16px', right: '16px', width: '15px', height: '15px', borderTop: '3px solid #00f2fe', borderRight: '3px solid #00f2fe' }} />
        <div style={{ position: 'absolute', bottom: '16px', left: '16px', width: '15px', height: '15px', borderBottom: '3px solid #00f2fe', borderLeft: '3px solid #00f2fe' }} />
        <div style={{ position: 'absolute', bottom: '16px', right: '16px', width: '15px', height: '15px', borderBottom: '3px solid #00f2fe', borderRight: '3px solid #00f2fe' }} />

        <header style={{ marginBottom: '35px', textAlign: 'center', transform: 'translateZ(70px)' }}>
          <h1 style={{ fontSize: '2.2rem', letterSpacing: '8px', color: '#ffffff', margin: '0 0 5px 0', fontWeight: 'bold', textShadow: '0 0 20px rgba(0,242,254,0.8)' }}>
            VERI_CHAIN
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: stage === 'computing' ? '#22c55e' : '#00f2fe', inlineBlock: 'true', boxShadow: '0 0 10px currentColor' }} />
            <p style={{ color: '#334155', fontSize: '0.7rem', letterSpacing: '4px', margin: 0, fontWeight: '900' }}>
              SECURE DECENTRALIZED TERMINAL
            </p>
          </div>
        </header>

        {/* STAGE A: IDLE FILE SELECTION PANEL */}
        {(stage === 'idle' || stage === 'scanning') && (
          <div style={{ transform: 'translateZ(50px)', transformStyle: 'preserve-3d' }}>
            <div 
              onClick={triggerUploadStream}
              style={{
                border: file ? '2px solid #22c55e' : '1px dashed rgba(0, 242, 254, 0.45)',
                borderRadius: '16px',
                padding: '55px 20px',
                background: file ? 'rgba(34, 197, 94, 0.05)' : 'rgba(1, 2, 6, 0.75)',
                boxShadow: file ? '0 0 30px rgba(34,197,94,0.15)' : 'inset 0 4px 20px rgba(0,0,0,0.8)',
                cursor: stage === 'scanning' ? 'not-allowed' : 'pointer',
                position: 'relative',
                overflow: 'hidden',
                textAlign: 'center',
                marginBottom: '30px',
                transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
              }}
            >
              {stage === 'scanning' && <div className="laser-sweep" />}

              <div style={{ fontSize: '4rem', marginBottom: '15px', filter: file ? 'drop-shadow(0 0 20px #22c55e)' : 'drop-shadow(0 0 15px #00f2fe)' }}>
                {file ? '📦' : '🖲️'}
              </div>
              <h3 style={{ color: '#ffffff', fontSize: '1.2rem', margin: '0 0 6px 0', letterSpacing: '2px' }}>
                {file ? 'PAYLOAD LOADED' : 'INJECT CRYPTO TARGET'}
              </h3>
              <p style={{ color: file ? '#22c55e' : '#475569', fontSize: '0.8rem', margin: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', padding: '0 10px' }}>
                {file ? `[HASH]: ${file.name}` : 'Drop or select credentials block manifest'}
              </p>
            </div>

            <input type="file" ref={fileInputRef} onChange={handleFileCapture} disabled={stage === 'scanning'} style={{ display: 'none' }} />

            {stage === 'idle' && (
              <button
                onClick={runQuantumVerification}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #00f2fe 0%, #0044ff 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '18px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  letterSpacing: '4px',
                  cursor: 'pointer',
                  boxShadow: '0 12px 35px rgba(0, 242, 254, 0.4)',
                  transform: 'translateZ(40px)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => { e.target.style.filter = 'brightness(1.2)'; e.target.style.boxShadow = '0 15px 45px rgba(0, 242, 254, 0.6)'; }}
                onMouseLeave={(e) => { e.target.style.filter = 'none'; e.target.style.boxShadow = '0 12px 35px rgba(0, 242, 254, 0.4)'; }}
              >
                EXECUTE IDENTITY CHECK
              </button>
            )}

            {stage === 'scanning' && (
              <div style={{ color: '#f59e0b', fontSize: '0.85rem', letterSpacing: '2px', fontWeight: 'bold', textShadow: '0 0 10px #f59e0b', textAlign: 'center' }}>
                INITIALIZING HARDWARE REGISTERS... PLEASE STAND BY
              </div>
            )}
          </div>
        )}

        {/* STAGE B: HYPER-ANIMATED COMPUTING STATUS MATRIX */}
        {stage === 'computing' && (
          <div style={{ textAlign: 'center', transform: 'translateZ(60px)', transformStyle: 'preserve-3d' }}>
            <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 30px auto', perspective: '400px' }}>
              <div className="spinning-mainframe-cube" style={{ fontSize: '4.5rem', lineHeight: '100px', color: '#22c55e', filter: 'drop-shadow(0 0 25px #22c55e)' }}>
                🎛️
              </div>
            </div>

            <div style={{
              backgroundColor: '#010307',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '12px',
              padding: '18px',
              minHeight: '50px',
              marginBottom: '25px',
              boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.9)'
            }}>
              <div style={{ color: '#1e293b', fontSize: '0.65rem', marginBottom: '5px', letterSpacing: '2px', textAlign: 'left', fontWeight: 'bold' }}>SYSTEM PROCESSING CORE COMPILER //</div>
              <div style={{ color: '#22c55e', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'left', letterSpacing: '1px' }}>
                &gt; {logText}
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#475569', marginBottom: '8px', letterSpacing: '2px' }}>
                <span>PARSING DATA SEGMENTS</span>
                <span style={{ color: '#22c55e', fontWeight: 'bold' }}>{progress}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#02050c', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #22c55e, #00f2fe)', boxShadow: '0 0 15px #22c55e', transition: 'width 0.15s linear' }} />
              </div>
            </div>
          </div>
        )}

        {/* STAGE C: MATRIX RIPPLE RESULT CARD DISPLAY */}
        {stage === 'result' && (
          <div style={{ transform: 'translateZ(60px)', transformStyle: 'preserve-3d' }}>
            {isGenuine ? (
              <div style={{
                position: 'relative',
                border: '2px solid #22c55e',
                borderRadius: '16px',
                padding: '45px 20px',
                background: 'rgba(34, 197, 94, 0.03)',
                boxShadow: '0 0 50px rgba(34, 197, 94, 0.2)',
                textAlign: 'center'
              }}>
                <div className="radar-pulse-ring" />
                <div style={{ fontSize: '4.5rem', marginBottom: '15px', filter: 'drop-shadow(0 0 25px #22c55e)' }}>🛡️</div>
                <h2 style={{ color: '#22c55e', fontSize: '1.45rem', margin: '0 0 10px 0', letterSpacing: '3px', fontWeight: 'bold' }}>
                  INTEGRITY AUTHENTICATED
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: '1.5', margin: '0 0 25px 0' }}>
                  Ledger hash verification index match successful. Record structural payload maps perfectly to system credentials parameters.
                </p>
                <div style={{ backgroundColor: '#020408', padding: '12px', borderRadius: '8px', border: '1px solid rgba(34, 197, 94, 0.2)', fontSize: '0.65rem', color: '#334155', textAlign: 'left', wordBreak: 'break-all' }}>
                  <span style={{ color: '#22c55e', display: 'block', fontWeight: 'bold' }}>✔️ BLOCK CHAIN UNIQUE HASH POINTER:</span>
                  0x7f3c41a2e96b81d0f33c2e82cd59b17adcf9
                </div>
              </div>
            ) : (
              <div style={{
                border: '2px solid #ef4444',
                borderRadius: '16px',
                padding: '45px 20px',
                background: 'rgba(239, 68, 68, 0.03)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '4.5rem', marginBottom: '15px', filter: 'drop-shadow(0 0 25px #ef4444)' }}>🚨</div>
                <h2 style={{ color: '#ef4444', fontSize: '1.4rem', margin: '0 0 10px 0', letterSpacing: '3px', fontWeight: 'bold', textShadow: '0 0 15px rgba(239,68,68,0.5)' }}>
                  HASH VERIFY FAULT
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: '1.5', margin: '0 0 25px 0' }}>
                  CRITICAL PARITY ERR: Document validation failed. Asset rejected automatically by security firewall arrays.
                </p>
                <div style={{ backgroundColor: '#020408', padding: '12px', borderRadius: '8px', border: '1px solid #ef4444', fontSize: '0.7rem', color: '#ef4444', fontWeight: 'bold', letterSpacing: '1px' }}>
                  🛑 ROUTING ABORTED // CHAIN LINKS INVALIDATED
                  </div>
              </div>
            )}

            <button
              onClick={() => { setFile(null); setStage('idle'); }}
              style={{
                marginTop: '30px',
                width: '100%',
                backgroundColor: 'transparent',
                border: '1px solid #1e293b',
                color: '#475569',
                borderRadius: '10px',
                padding: '15px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                letterSpacing: '2px',
                fontWeight: 'bold',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#00f2fe'}
              onMouseLeave={(e) => e.target.style.color = '#475569'}
            >
              FLUSH PIPELINE CACHE BUFFER
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default EmployerVerification;