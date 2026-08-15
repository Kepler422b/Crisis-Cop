import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

const TYPE_CONFIG = {
  'Fire': { hex: '#ff4d4f' },
  'Medical': { hex: '#00e676' },
  'Police': { hex: '#40a9ff' },
  'NDRF': { hex: '#faad14' }
};

const createIcon = (type, priority, critical) => {
  const conf = TYPE_CONFIG[type] || { hex: '#fff' };
  const pulseClass = critical ? 'critical-pulse' : '';
  
  const html = `
    <div style="display: flex; flex-direction: column; align-items: center; pointer-events: none;">
      <div class="${pulseClass}" style="
        width: 24px; height: 24px; border-radius: 50%;
        background-color: ${conf.hex}; display: flex; justify-content: center; align-items: center;
        box-shadow: 0 5px 15px rgba(0,0,0,0.6), inset 0 -2px 4px rgba(0,0,0,0.5);
        border: 2px solid rgba(255,255,255,0.8);
      ">
      </div>
      <div style="
        margin-top: 6px; padding: 2px 6px; border-radius: 4px;
        background-color: ${conf.hex}; color: #000; font-size: 10px; font-weight: 700;
        white-space: nowrap; box-shadow: 0 4px 8px rgba(0,0,0,0.5);
      ">
        ${type} — ${priority}
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-leaflet-icon',
    iconSize: [40, 60],
    iconAnchor: [20, 20],
  });
};

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      if (onMapClick) onMapClick(e.latlng);
    }
  });
  return null;
}

export default function LiveMap({ incidents, shelters, onMapClick, onResolveIncident }) {
  // Mumbai coordinates
  const position = [19.0760, 72.8777];

  return (
    <div style={{ flex: 1, position: 'relative' }}>
      <MapContainer center={position} zoom={11} style={{ height: '100%', width: '100%', backgroundColor: '#0a0b10', cursor: 'crosshair' }}>
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <MapClickHandler onMapClick={onMapClick} />
        
        {incidents.map(inc => (
          <Marker 
            key={inc.id} 
            position={[inc.lat, inc.lng]} 
            icon={createIcon(inc.type, inc.priority, inc.critical)}
          >
            <Popup>
              <strong>{inc.type} Incident</strong><br/>Priority: {inc.priority}<br/>{inc.label}
              <div style={{ marginTop: '8px' }}>
                <button 
                  onClick={(e) => { e.stopPropagation(); onResolveIncident(inc.id); }}
                  style={{ padding: '4px 8px', backgroundColor: 'var(--accent-medical)', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', width: '100%' }}
                >
                  ✓ Mark as Resolved
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {shelters.map(s => (
          <CircleMarker 
            key={s.id} 
            center={[s.lat, s.lng]} 
            radius={8} 
            pathOptions={{ color: '#b37feb', fillColor: '#b37feb', fillOpacity: 0.8, weight: 2 }}
          >
            <Popup>
              <strong>{s.name}</strong><br/>Capacity: {s.occupied}/{s.capacity}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  )
}
