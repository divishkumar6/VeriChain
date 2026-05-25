import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  // Check if a token exists in local storage to determine login state
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload(); // Refresh the page to update the UI buttons
  };

  const handleVerifyAccess = () => {
    if (!isLoggedIn) {
      alert("🔒 ACCESS DENIED: Node authentication required.");
      navigate('/login');
    } else {
      navigate('/verify');
    }
  };

  return (
    <div style={containerStyle}>
      <div style={gridOverlayStyle} />

      <header style={headerStyle}>
        <h1 style={titleStyle}>VERI_CHAIN_CORE</h1>
        <p style={subtitleStyle}>SECURE ACADEMIC CREDENTIAL VERIFICATION ENGINE</p>

        {/* Dynamic Navigation Panel */}
        <div style={navPanelStyle}>
          <button onClick={handleVerifyAccess} style={btnStyle('#00f2fe', '#0044ff')}>VERIFY PORTAL</button>
          <button onClick={() => navigate('/wallet')} style={btnStyle('#00f2fe', '#0044ff')}>STUDENT WALLET</button>
          
          {/* Conditional rendering: Show Login/Register ONLY if not logged in */}
          {!isLoggedIn ? (
            <>
              <button onClick={() => navigate('/login')} style={btnStyle('#22c55e', '#15803d')}>ACCESS NODE (LOGIN)</button>
              <button onClick={() => navigate('/signup')} style={btnStyle('#a855f7', '#6b21a8')}>REGISTER IDENTITY</button>
            </>
          ) : (
            /* Show Logout ONLY if user is already authenticated */
            <button onClick={handleLogout} style={btnStyle('#ef4444', '#7f1d1d')}>TERMINATE SESSION (LOGOUT)</button>
          )}
        </div>
      </header>
    </div>
  );
}

// STYLING
const containerStyle = { minHeight: '100vh', backgroundColor: '#01030a', color: '#ffffff', fontFamily: '"Courier New", Courier, monospace', padding: '40px 20px', position: 'relative' };
const gridOverlayStyle = { position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0, 242, 254, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 254, 0.03) 1px, transparent 1px)', backgroundSize: '30px 30px', pointerEvents: 'none' };
const headerStyle = { textAlign: 'center', maxWidth: '900px', margin: '60px auto', position: 'relative', zIndex: 2 };
const titleStyle = { fontSize: '3rem', letterSpacing: '8px', marginBottom: '20px', textShadow: '0 0 30px rgba(0,242,254,0.6)' };
const subtitleStyle = { color: '#00f2fe', letterSpacing: '3px', fontSize: '1rem', fontWeight: 'bold', marginBottom: '45px' };
const navPanelStyle = { display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' };
const btnStyle = (glow, dark) => ({
  background: `linear-gradient(135deg, ${glow} 0%, ${dark} 100%)`,
  color: '#ffffff',
  border: 'none',
  borderRadius: '10px',
  padding: '16px 28px',
  fontSize: '0.85rem',
  fontWeight: 'bold',
  letterSpacing: '2px',
  cursor: 'pointer',
  boxShadow: `0 8px 25px ${glow}33`
});