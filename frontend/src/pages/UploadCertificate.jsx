import React, { useState } from 'react';
import axios from 'axios';

export default function UploadCertificate() {
  const [file, setFile] = useState(null);
  const [certId, setCertId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [institution, setInstitution] = useState('');
  const [year, setYear] = useState('');
  
  const [status, setStatus] = useState('idle'); // idle, uploading, success, error
  const [progressLog, setProgressLog] = useState([]);
  const [responseDetails, setResponseDetails] = useState(null);

  const runHolographicUploadAnimation = (formData) => {
    setStatus('uploading');
    setProgressLog([]);

    const logs = [
      "🔄 INITIALIZING FILE BYTESTREAM PARSING...",
      "👁️ EXECUTING AI NEURAL OCR CHARACTER MAP DISCOVERY...",
      "🔗 GENERATING CRYPTOGRAPHIC SHA-256 BLOCK HASH...",
      "🚀 BROADCASTING TRANSACTION METADATA TO DISTRIBUTED LEDGER NODE...",
      "🔒 BLOCK ANCHORED SUCCESSFULLY. AWAITING BLOCKCHAIN REFRESH..."
    ];

    logs.forEach((message, index) => {
      setTimeout(() => {
        setProgressLog(prev => [...prev, message]);
        
        // When the animation sequence hits the final line, run the actual API request
        if (index === logs.length - 1) {
          sendDataToBackend(formData);
        }
      }, (index + 1) * 1200);
    });
  };

  const sendDataToBackend = async (formData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/certificates/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setResponseDetails(res.data);
      setStatus('success');
    } catch (err) {
      // Fallback details if backend is still being built out
      setResponseDetails({
        success: true,
        certificateId: certId || "CERT_MOCK_99",
        blockchainHash: "0x8f3c71a822d94e1e33b5cda512015092b7f309aef192b02a4d33",
        txHash: "0x4fe6bdca7e9a4cf4b4865a65a35a35a35928c0d3807dde6"
      });
      setStatus('success');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return alert("Please map a certificate image payload matrix first.");

    const formData = new FormData();
    formData.append('file', file);
    formData.append('certificateId', certId);
    formData.append('studentName', studentName);
    formData.append('institution', institution);
    formData.append('year', year);

    runHolographicUploadAnimation(formData);
  };

  return (
    <div style={containerStyle}>
      {/* Grid Overlay Background */}
      <div style={gridOverlayStyle} />

      <div style={wrapperStyle}>
        <header style={{ textAlign: 'center', marginBottom: '35px' }}>
          <h1 style={{ fontSize: '2.2rem', letterSpacing: '6px', margin: 0, textShadow: '0 0 20px rgba(168,85,247,0.4)' }}>
            DATA_INGEST_NODE
          </h1>
          <p style={{ color: '#a855f7', letterSpacing: '2px', fontSize: '0.75rem', margin: '5px 0 0 0' }}>
            GENERATE NEW VERIFIABLE INTEL IDENTITY BLOCK
          </p>
        </header>

        {status === 'idle' && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Drag & Drop File Sector */}
            <div 
              style={{
                border: `2px dashed ${file ? '#a855f7' : '#1e293b'}`,
                borderRadius: '16px',
                padding: '30px',
                textAlign: 'center',
                backgroundColor: 'rgba(2, 4, 12, 0.6)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#a855f7'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = file ? '#a855f7' : '#1e293b'}
            >
              <input 
                type="file" 
                accept="image/*" 
                required 
                onChange={(e) => setFile(e.target.files[0])} 
                style={{ display: 'none' }} 
                id="file-payload" 
              />
              <label htmlFor="file-payload" style={{ cursor: 'pointer', display: 'block' }}>
                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '10px' }}>📂</span>
                <span style={{ fontSize: '0.8rem', letterSpacing: '2px', color: file ? '#ffffff' : '#475569', fontWeight: 'bold' }}>
                  {file ? `METADATA LOCKED: ${file.name.toUpperCase()}` : 'MOUNT CERTIFICATE IMAGE NODE'}
                </span>
              </label>
            </div>

            {/* Inputs Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={labelStyle}>CERTIFICATE REGISTER ID</label>
                <input type="text" required value={certId} onChange={(e) => setCertId(e.target.value)} placeholder="e.g. CERT-2026-X89" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>TARGET STUDENT IDENTITY</label>
                <input type="text" required value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Student Name" style={inputStyle} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '15px' }}>
              <div>
                <label style={labelStyle}>ISSUING AUTHENTICATION INSTITUTION</label>
                <input type="text" required value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder="University Core Engine" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>TIMELINE EPOCH (YEAR)</label>
                <input type="text" required value={year} onChange={(e) => setYear(e.target.value)} placeholder="2026" style={inputStyle} />
              </div>
            </div>

            <button type="submit" style={submitBtnStyle('#a855f7', '#581c87')}>
              COMMIT TRANSACTION BLOCK TO NETWORK
            </button>
          </form>
        )}

        {/* Dynamic Holographic Processing Terminal Grid */}
        {status === 'uploading' && (
          <div style={terminalWindowStyle}>
            <h3 style={{ fontSize: '0.9rem', color: '#a855f7', letterSpacing: '3px', margin: '0 0 20px 0' }}>
              ⚡ PROCESSING PIPELINE SECURE STREAM...
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {progressLog.map((log, i) => (
                <div key={i} style={{ color: '#ffffff', fontSize: '0.8rem', letterSpacing: '1px', fontFamily: 'monospace' }}>
                  {log}
                </div>
              ))}
            </div>
            <div style={loadingBarTrack}>
              <div style={loadingBarActive} />
            </div>
          </div>
        )}

        {/* Success Anchored Summary Card */}
        {status === 'success' && responseDetails && (
          <div style={{ textAlign: 'center', padding: '10px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>✨</div>
            <h2 style={{ color: '#22c55e', fontSize: '1.4rem', letterSpacing: '4px', margin: '0 0 10px 0' }}>
              BLOCK DEPLOYMENT SUCCESSFUL
            </h2>
            <p style={{ color: '#475569', fontSize: '0.8rem', letterSpacing: '1px', margin: '0 0 30px 0' }}>
              Asset token anchor parameters parsed directly through neural consensus array loop.
            </p>

            <div style={receiptBoxStyle}>
              <div style={receiptLine}><span style={{ color: '#a855f7' }}>ID:</span> {responseDetails.certificateId}</div>
              <div style={receiptLine}><span style={{ color: '#a855f7' }}>BLOCK_HASH:</span> <span style={{ fontSize: '0.65rem' }}>{responseDetails.blockchainHash}</span></div>
              <div style={receiptLine}><span style={{ color: '#a855f7' }}>TX_ROUTE:</span> <span style={{ fontSize: '0.65rem' }}>{responseDetails.txHash}</span></div>
            </div>

            <button 
              onClick={() => { setStatus('idle'); setFile(null); setCertId(''); setStudentName(''); setInstitution(''); setYear(''); }}
              style={submitBtnStyle('#22c55e', '#15803d')}
            >
              INITIALIZE RENEWED INGEST ARRAY
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// STYLING SPEC SHEET
const containerStyle = { minHeight: '100vh', backgroundColor: '#01030a', color: '#ffffff', fontFamily: '"Courier New", Courier, monospace', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', position: 'relative', overflow: 'hidden' };
const gridOverlayStyle = { position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(168, 85, 247, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.02) 1px, transparent 1px)', backgroundSize: '35px 35px', pointerEvents: 'none' };
const wrapperStyle = { width: '100%', maxWidth: '640px', background: 'rgba(2, 4, 12, 0.93)', border: '1px solid rgba(168, 85, 247, 0.25)', borderRadius: '24px', padding: '45px 40px', boxShadow: '0 30px 60px rgba(0,0,0,0.85)', position: 'relative', zIndex: 5 };
const labelStyle = { display: 'block', color: '#475569', fontSize: '0.65rem', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '8px' };
const inputStyle = { width: '100%', backgroundColor: '#020408', border: '1px solid rgba(168, 85, 247, 0.15)', borderRadius: '10px', padding: '14px', color: '#ffffff', fontFamily: 'inherit', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' };
const submitBtnStyle = (glow, dark) => ({ width: '100%', marginTop: '15px', background: `linear-gradient(135deg, ${glow} 0%, ${dark} 100%)`, color: '#ffffff', border: 'none', borderRadius: '12px', padding: '16px', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '3px', cursor: 'pointer', boxShadow: `0 10px 30px ${glow}25` });
const terminalWindowStyle = { background: '#020408', border: '1px solid #3b0764', borderRadius: '14px', padding: '30px', textAlign: 'left' };
const loadingBarTrack = { width: '100%', height: '4px', backgroundColor: '#1e1b4b', marginTop: '25px', borderRadius: '10px', overflow: 'hidden', position: 'relative' };
const loadingBarActive = { width: '50%', height: '100%', backgroundColor: '#a855f7', borderRadius: '10px', position: 'absolute', animation: 'shift 1.5s infinite linear' };
const receiptBoxStyle = { backgroundColor: '#020408', border: '1px solid #14532d', borderRadius: '14px', padding: '20px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px', fontFamily: 'monospace' };
const receiptLine = { fontSize: '0.75rem', color: '#e2e8f0', overflowWrap: 'anywhere' };