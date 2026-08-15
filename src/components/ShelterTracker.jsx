import React from 'react';

export default function ShelterTracker({ shelters, onEditClick }) {
  return (
    <div className="flex-col gap-3" style={{ marginTop: '8px' }}>
      <div className="flex-row justify-between mb-2">
        <h2 style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Shelter Capacity</h2>
        <span style={{ backgroundColor: 'rgba(0, 230, 118, 0.1)', color: 'var(--accent-medical)', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '600' }}>
          Live
        </span>
      </div>

      <div className="flex-col gap-4">
        {shelters.map(s => {
          const util = s.occupied / s.capacity;
          const isFull = util >= 1;
          const isClosed = s.status === 'Closed';
          
          return (
            <div key={s.id} onClick={() => onEditClick && onEditClick(s)} style={{ cursor: 'pointer', padding: '6px', borderRadius: '4px', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
              <div className="flex-row justify-between" style={{ marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', color: isClosed ? 'var(--text-muted)' : 'var(--text-primary)', fontWeight: '500' }}>{s.name}</span>
                {isClosed ? (
                  <span style={{ fontSize: '12px', color: 'var(--accent-fire)', backgroundColor: 'rgba(255, 77, 79, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>Closed</span>
                ) : (
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{s.occupied} / {s.capacity}</span>
                )}
              </div>
              
              {!isClosed && (
                <div style={{ height: '4px', backgroundColor: 'var(--bg-base)', borderRadius: '2px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                  <div style={{ 
                    height: '100%', 
                    width: `${util * 100}%`, 
                    backgroundColor: isFull ? 'var(--accent-fire)' : 'var(--accent-medical)',
                    transition: 'width 0.5s ease-out'
                  }} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
