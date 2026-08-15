import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function ResourceRequests({ requests, onFulfill }) {
  return (
    <div className="flex-col gap-3">
      <div className="flex-row justify-between mb-2">
        <h2 style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Resource Requests</h2>
        <span style={{ backgroundColor: 'rgba(250, 173, 20, 0.1)', color: 'var(--accent-ndrf)', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '600' }}>
          {requests.length} pending
        </span>
      </div>
      
      <div className="flex-col gap-3">
        {requests.map(req => (
          <div key={req.id} className="glass-panel" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '600', fontSize: '15px', color: 'var(--text-primary)', marginBottom: '4px' }}>{req.item}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{req.agency} — {req.location}</div>
            </div>
            {req.status === 'pending' ? (
              <button 
                onClick={() => onFulfill(req.id)}
                style={{ 
                  backgroundColor: 'transparent', border: '1px solid var(--border-color)', 
                  color: 'var(--text-primary)', padding: '8px 16px', borderRadius: '6px',
                  cursor: 'pointer', fontSize: '13px', fontWeight: '500', transition: 'all 0.2s',
                  outline: 'none'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                }}
              >
                Fulfill
              </button>
            ) : (
              <CheckCircle color="var(--accent-medical)" size={20} />
            )}
          </div>
        ))}
        {requests.length === 0 && (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
            All requests fulfilled.
          </div>
        )}
      </div>
    </div>
  )
}
