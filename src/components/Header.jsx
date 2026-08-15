import React from 'react';

const agencies = [
  { name: 'NDRF', color: 'var(--accent-ndrf)', connected: true },
  { name: 'Police', color: 'var(--accent-police)', connected: true },
  { name: 'Fire & Rescue', color: 'var(--accent-fire)', connected: true },
  { name: 'Medical', color: 'var(--accent-medical)', connected: true },
  { name: 'Govt (SDMA)', color: '#b37feb', connected: true }
];

export default function Header() {
  return (
    <header style={{
      gridColumn: '1 / -1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      backgroundColor: 'var(--bg-header)',
      borderBottom: '1px solid var(--border-color)',
      zIndex: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--accent-medical)' }} className="critical-pulse" />
        <h1 style={{ fontSize: '16px', fontWeight: '600', letterSpacing: '0.05em', margin: 0, color: 'var(--text-primary)' }}>
          CRISIS COP — MUMBAI DISTRICT OPERATIONS
        </h1>
      </div>
      
      <div style={{ display: 'flex', gap: '12px' }}>
        {agencies.map(agency => (
          <div key={agency.name} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '24px',
            backgroundColor: 'var(--bg-panel)',
            border: '1px solid var(--border-color)',
            fontSize: '13px', fontWeight: '500'
          }}>
            <span style={{ 
              width: '8px', height: '8px', borderRadius: '50%', 
              backgroundColor: agency.color,
              animation: 'pulse-dot 2s infinite'
            }}></span>
            {agency.name}
          </div>
        ))}
      </div>
    </header>
  );
}
