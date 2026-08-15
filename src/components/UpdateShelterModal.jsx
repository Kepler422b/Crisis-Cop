import React, { useState } from 'react';

export default function UpdateShelterModal({ shelter, onClose, onUpdate }) {
  const [occupied, setOccupied] = useState(shelter.occupied);
  const [capacity, setCapacity] = useState(shelter.capacity);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      ...shelter,
      occupied: parseInt(occupied),
      capacity: parseInt(capacity),
      status: parseInt(occupied) >= parseInt(capacity) ? 'Full' : 'Open'
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
        <h2 style={{ marginBottom: '24px', color: 'var(--text-primary)', fontSize: '20px' }}>Update {shelter.name.split('—')[0]}</h2>
        <form onSubmit={handleSubmit} className="flex-col" style={{ gap: '16px' }}>
          <div className="flex-col gap-2">
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase' }}>Current Occupancy</label>
            <input type="number" min="0" value={occupied} onChange={e => setOccupied(e.target.value)} required style={{ padding: '12px', background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }} />
          </div>
          <div className="flex-col gap-2">
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase' }}>Maximum Capacity</label>
            <input type="number" min="1" value={capacity} onChange={e => setCapacity(e.target.value)} required style={{ padding: '12px', background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }} />
          </div>
          <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
            <button type="button" onClick={onClose} className="btn-3d" style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)' }}>Cancel</button>
            <button type="submit" className="btn-3d" style={{ flex: 1, background: 'var(--accent-medical)', color: '#000' }}>Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  )
}
