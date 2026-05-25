import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentWallet() {
  const navigate = useNavigate();

  // Mock certificate data
  const certificates = [
    { id: 'VC-8829-X', title: 'Bachelor of Science (CS)', date: '2025-05-15', status: 'VERIFIED' },
    { id: 'VC-4412-K', title: 'Advanced Cloud Architecture', date: '2026-01-10', status: 'VERIFIED' },
  ];

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>STUDENT_VAULT</h2>
      <div style={gridStyle}>
        {certificates.map((cert) => (
          <div key={cert.id} style={cardStyle}>
            <p style={labelStyle}>CERT_ID: {cert.id}</p>
            <h3 style={certTitleStyle}>{cert.title}</h3>
            <p style={statusStyle}>● {cert.status}</p>
            <p style={dateStyle}>ANCHORED: {cert.date}</p>
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/')} style={backBtnStyle}>RETURN TO CORE</button>
    </div>
  );
}

// STYLES
const containerStyle = { minHeight: '100vh', backgroundColor: '#01030a', color: '#fff', padding: '50px', fontFamily: '"Courier New", monospace' };
const titleStyle = { letterSpacing: '4px', borderBottom: '1px solid #00f2fe', paddingBottom: '10px' };
const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' };
const cardStyle = { background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px', border: '1px solid #00f2fe' };
const labelStyle = { color: '#00f2fe', fontSize: '0.7rem' };
const certTitleStyle = { margin: '10px 0' };
const statusStyle = { color: '#22c55e', fontSize: '0.8rem' };
const dateStyle = { color: '#64748b', fontSize: '0.7rem' };
const backBtnStyle = { marginTop: '40px', background: 'transparent', border: '1px solid #fff', color: '#fff', padding: '10px 20px', cursor: 'pointer' };