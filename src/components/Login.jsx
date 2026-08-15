import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const AGENCIES = [
  "NDRF (National Disaster Response Force)",
  "Mumbai Police",
  "Maharashtra Fire Services",
  "BMC Health Department",
  "State Disaster Management Authority (SDMA)"
];

export default function Login({ onLogin }) {
  const [agency, setAgency] = useState(AGENCIES[0]);
  const [passcode, setPasscode] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(agency);
    navigate('/');
  };

  return (
    <div style={{
      height: '100vh', width: '100vw', 
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'var(--bg-base)',
      background: 'radial-gradient(circle at center, #161822 0%, #0a0b10 100%)'
    }}>
      <div className="glass-panel" style={{
        width: '400px', padding: '40px',
        display: 'flex', flexDirection: 'column', gap: '24px',
        alignItems: 'center',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255,255,255,0.1)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <ShieldAlert size={56} color="var(--accent-police)" className="critical-pulse" />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', letterSpacing: '2px', color: 'var(--text-primary)', margin: 0 }}>CRISIS COP</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '8px' }}>SECURE ACCESS PORTAL</p>
        </div>

        <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="flex-col gap-2">
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase' }}>Select Agency</label>
            <select 
              value={agency} 
              onChange={e => setAgency(e.target.value)}
              style={{
                width: '100%', padding: '14px', backgroundColor: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--border-color)', borderTop: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)', outline: 'none', fontSize: '14px',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              {AGENCIES.map(a => <option key={a} value={a} style={{ backgroundColor: '#1a1d27' }}>{a}</option>)}
            </select>
          </div>

          <div className="flex-col gap-2">
             <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase' }}>Access Code</label>
             <input 
                type="password"
                placeholder="Enter generic code"
                value={passcode}
                onChange={e => setPasscode(e.target.value)}
                style={{
                  width: '100%', padding: '14px', backgroundColor: 'rgba(0,0,0,0.4)',
                  border: '1px solid var(--border-color)', borderTop: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)', outline: 'none', fontSize: '14px',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)'
                }}
             />
          </div>

          <button type="submit" className="btn-3d" style={{ marginTop: '8px', padding: '16px', fontSize: '15px' }}>
            INITIALIZE CONNECTION
          </button>
        </form>
      </div>
    </div>
  )
}
