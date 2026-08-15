import React from 'react';

export default function StatsOverview({ activeIncidents, resourceRequests, sheltersOpen, unitsDeployed }) {
  const statStyle = { flex: 1, padding: '24px', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'center' };
  const labelStyle = { fontSize: '13px', color: 'var(--text-muted)', fontWeight: '500' };
  
  return (
    <div style={{
      display: 'flex',
      backgroundColor: 'var(--bg-panel-solid)',
      borderTop: '1px solid var(--border-color)',
      height: '110px',
      zIndex: 5
    }}>
      <div style={{...statStyle, paddingLeft: '32px'}}>
        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--accent-fire)', marginBottom: '4px', lineHeight: 1 }}>{activeIncidents}</div>
        <div style={labelStyle}>Active incidents</div>
      </div>
      <div style={statStyle}>
        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--accent-ndrf)', marginBottom: '4px', lineHeight: 1 }}>{resourceRequests}</div>
        <div style={labelStyle}>Resource requests</div>
      </div>
      <div style={statStyle}>
        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--accent-police)', marginBottom: '4px', lineHeight: 1 }}>{sheltersOpen}</div>
        <div style={labelStyle}>Shelters open</div>
      </div>
      <div style={{...statStyle, borderRight: 'none'}}>
        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--accent-medical)', marginBottom: '4px', lineHeight: 1 }}>{unitsDeployed}</div>
        <div style={labelStyle}>Units deployed</div>
      </div>
    </div>
  );
}
