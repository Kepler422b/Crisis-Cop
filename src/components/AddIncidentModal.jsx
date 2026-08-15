import React, { useState } from 'react';

export default function AddIncidentModal({ onClose, onAdd, initialLocation }) {
  const [type, setType] = useState('Fire');
  const [priority, setPriority] = useState('High');
  const [label, setLabel] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      id: 'i' + Date.now(),
      type,
      priority,
      lat: initialLocation ? initialLocation.lat : 19.0760 + (Math.random() - 0.5) * 0.1,
      lng: initialLocation ? initialLocation.lng : 72.8777 + (Math.random() - 0.5) * 0.1,
      critical: priority === 'High',
      label: label || 'New Incident'
    });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', zIndex: 9999,
      display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div className="glass-panel" style={{ width: '400px', padding: '32px', transform: 'translateY(0) scale(1)' }}>
        <h2 style={{ marginBottom: '24px', color: 'var(--text-primary)', fontSize: '20px' }}>Add New Incident</h2>
        <form onSubmit={handleSubmit} className="flex-col" style={{ gap: '16px' }}>
          <div className="flex-col gap-2">
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase' }}>Incident Type</label>
            <select value={type} onChange={e => setType(e.target.value)} style={{ padding: '12px', background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
              <option value="Fire">Fire & Rescue</option>
              <option value="Medical">Medical Emergency</option>
              <option value="Police">Police / Law Enforcement</option>
              <option value="NDRF">NDRF / Rescue</option>
            </select>
          </div>
          <div className="flex-col gap-2">
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase' }}>Priority</label>
            <select value={priority} onChange={e => setPriority(e.target.value)} style={{ padding: '12px', background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
              <option value="High">High (Critical)</option>
              <option value="Med">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="flex-col gap-2">
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase' }}>Description / Label</label>
            <input type="text" value={label} onChange={e => setLabel(e.target.value)} required placeholder="E.g., Structural collapse..." style={{ padding: '12px', background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }} />
          </div>
          <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
            <button type="button" onClick={onClose} className="btn-3d" style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)' }}>Cancel</button>
            <button type="submit" className="btn-3d" style={{ flex: 1, background: 'var(--accent-fire)', color: '#000' }}>Submit Incident</button>
          </div>
        </form>
      </div>
    </div>
  )
}
