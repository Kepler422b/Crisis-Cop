import React, { useState } from 'react';

export default function AddResourceModal({ onClose, onAdd, currentUser }) {
  const [item, setItem] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      id: 'r' + Date.now(),
      item,
      agency: currentUser.split(' ')[0],
      location: location || 'HQ',
      status: 'pending'
    });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', zIndex: 9999,
      display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div className="glass-panel" style={{ width: '400px', padding: '32px' }}>
        <h2 style={{ marginBottom: '24px', color: 'var(--text-primary)', fontSize: '20px' }}>Request Resource</h2>
        <form onSubmit={handleSubmit} className="flex-col" style={{ gap: '16px' }}>
          <div className="flex-col gap-2">
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase' }}>Resource Details</label>
            <input type="text" value={item} onChange={e => setItem(e.target.value)} required placeholder="E.g., 5x Ambulances, 100x Water Bottles" style={{ padding: '12px', background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }} />
          </div>
          <div className="flex-col gap-2">
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase' }}>Delivery Location</label>
            <input type="text" value={location} onChange={e => setLocation(e.target.value)} required placeholder="E.g., Shelter A, Andheri East" style={{ padding: '12px', background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }} />
          </div>
          <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
            <button type="button" onClick={onClose} className="btn-3d" style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)' }}>Cancel</button>
            <button type="submit" className="btn-3d" style={{ flex: 1, background: 'var(--accent-ndrf)', color: '#000' }}>Request</button>
          </div>
        </form>
      </div>
    </div>
  )
}
