import React from 'react';

export default function IncidentLog({ logs }) {
  return (
    <div className="flex-col gap-3" style={{ marginTop: '8px', flex: 1, overflow: 'hidden' }}>
      <h2 style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', marginBottom: '8px' }}>
        Incident Log
      </h2>
      
      <div className="flex-col gap-4" style={{ overflowY: 'auto', paddingRight: '8px' }}>
        {logs.map(log => (
          <div key={log.id} style={{ display: 'flex', gap: '12px', fontSize: '13px' }}>
            <div style={{ color: 'var(--text-muted)', fontWeight: '500', width: '40px', flexShrink: 0 }}>
              {log.time}
            </div>
            <div>
              <div style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: log.color, marginRight: '8px', marginBottom: '1px' }} />
              <span style={{ color: 'var(--text-secondary)', fontWeight: '500', marginRight: '8px' }}>
                {log.agency} —
              </span>
              <span style={{ color: 'var(--text-primary)', lineHeight: 1.4 }}>
                {log.text}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
