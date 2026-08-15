import React, { useState, useEffect } from 'react'
import { collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc, serverTimestamp, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import Header from './Header'
import LiveMap from './LiveMap'
import StatsOverview from './StatsOverview'
import ResourceRequests from './ResourceRequests'
import ShelterTracker from './ShelterTracker'
import IncidentLog from './IncidentLog'
import AddIncidentModal from './AddIncidentModal'
import AddResourceModal from './AddResourceModal'
import UpdateShelterModal from './UpdateShelterModal'

const INITIAL_COP_STATE = {
  incidents: [
    { type: 'Fire', priority: 'High', lat: 19.1136, lng: 72.8697, critical: true, label: 'Building Fire in Andheri' },
    { type: 'Medical', priority: 'Med', lat: 19.0413, lng: 72.8558, critical: false, label: 'Triage Center Dharavi' },
    { type: 'Police', priority: 'High', lat: 18.9220, lng: 72.8347, critical: false, label: 'Crowd Control Colaba' },
    { type: 'NDRF', priority: 'High', lat: 19.1170, lng: 72.8330, critical: true, label: 'Flood Unit Juhu' },
    { type: 'Fire', priority: 'Med', lat: 19.0760, lng: 72.8777, critical: false, label: 'Transformer Fire Kurla' },
    { type: 'Medical', priority: 'High', lat: 18.9690, lng: 72.8205, critical: true, label: 'Mass Casualty Incident Worli' },
    { type: 'Police', priority: 'Low', lat: 19.2183, lng: 72.8133, critical: false, label: 'Traffic Blockade Borivali' }
  ],
  resources: [
    { item: '4x Rescue Boats', agency: 'NDRF', location: 'Dharavi Sector 2', status: 'pending' },
    { item: 'Emergency Water', agency: 'Govt (SDMA)', location: 'Shelter A', status: 'pending' },
    { item: '10x Trauma Kits', agency: 'Medical', location: 'Worli Triage', status: 'pending' },
    { item: '2x Fire Engines', agency: 'Fire & Rescue', location: 'Andheri West', status: 'pending' },
    { item: 'Riot Gear', agency: 'Police', location: 'Colaba Station', status: 'pending' }
  ],
  shelters: [
    { name: 'Shelter A — BMC School', capacity: 400, occupied: 380, status: 'Open', lat: 19.0450, lng: 72.8500 },
    { name: 'Shelter B — Wankhede', capacity: 1000, occupied: 450, status: 'Open', lat: 18.9380, lng: 72.8258 },
    { name: 'Shelter C — NESCO Center', capacity: 2500, occupied: 2100, status: 'Open', lat: 19.1524, lng: 72.8550 },
    { name: 'Shelter D — Somaiya Ground', capacity: 800, occupied: 800, status: 'Full', lat: 19.0735, lng: 72.8995 },
    { name: 'Shelter E — BKC Grounds', capacity: 3000, occupied: 150, status: 'Open', lat: 19.0658, lng: 72.8658 }
  ]
}

export default function Dashboard({ currentUser }) {
  const [incidents, setIncidents] = useState([]);
  const [resources, setResources] = useState([]);
  const [shelters, setShelters] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState(false);

  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [editingShelter, setEditingShelter] = useState(null);

  useEffect(() => {
    try {
      const unsubIncidents = onSnapshot(collection(db, 'incidents'), snapshot => {
        setIncidents(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      }, err => setDbError(true));
      
      const unsubResources = onSnapshot(collection(db, 'resources'), snapshot => {
        setResources(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      }, err => setDbError(true));
      
      const unsubShelters = onSnapshot(collection(db, 'shelters'), snapshot => {
        setShelters(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      }, err => setDbError(true));
      
      const unsubLogs = onSnapshot(query(collection(db, 'logs'), orderBy('createdAt', 'desc')), snapshot => {
        setLogs(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      }, err => setDbError(true));

      return () => {
        unsubIncidents(); unsubResources(); unsubShelters(); unsubLogs();
      }
    } catch (err) {
      console.error("Firebase connection error:", err);
      setDbError(true);
      setLoading(false);
    }
  }, []);

  const addLog = async (text, color, agency) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    await addDoc(collection(db, 'logs'), {
      time: timeStr,
      agency,
      color,
      text,
      createdAt: serverTimestamp()
    });
  }

  const handleMapClick = (latlng) => {
    setClickedLocation(latlng);
    setShowIncidentModal(true);
  };

  const handleFulfillResource = async (id) => {
    const req = resources.find(r => r.id === id);
    if (!req) return;
    await updateDoc(doc(db, 'resources', id), { status: 'fulfilled' });
    await addLog(`Fulfilled request for ${req.item}`, 'var(--text-primary)', currentUser.split(' ')[0]);
  }

  const handleResolveIncident = async (id) => {
    const inc = incidents.find(i => i.id === id);
    if (!inc) return;
    await deleteDoc(doc(db, 'incidents', id));
    await addLog(`Marked resolved: ${inc.label}`, 'var(--accent-medical)', currentUser.split(' ')[0]);
  };

  const handleUpdateShelter = async (updatedShelter) => {
    const { id, ...data } = updatedShelter;
    await updateDoc(doc(db, 'shelters', id), data);
    await addLog(`Updated capacity info for ${updatedShelter.name.split('—')[0]}`, 'var(--text-primary)', currentUser.split(' ')[0]);
  };

  const handleAddIncident = async (inc) => {
    await addDoc(collection(db, 'incidents'), inc);
    await addLog(`Added new incident: ${inc.label}`, 'var(--accent-fire)', currentUser.split(' ')[0]);
    setShowIncidentModal(false);
    setClickedLocation(null);
  };

  const handleAddResource = async (res) => {
    await addDoc(collection(db, 'resources'), res);
    await addLog(`Requested ${res.item}`, 'var(--accent-ndrf)', currentUser.split(' ')[0]);
    setShowResourceModal(false);
  };

  const handleSeedDatabase = async () => {
    try {
      for (const inc of INITIAL_COP_STATE.incidents) await addDoc(collection(db, 'incidents'), inc);
      for (const res of INITIAL_COP_STATE.resources) await addDoc(collection(db, 'resources'), res);
      for (const she of INITIAL_COP_STATE.shelters) await addDoc(collection(db, 'shelters'), she);
      await addLog("Initial state seeded to database", "var(--accent-fire)", "System");
      alert("Database seeded successfully!");
    } catch (err) {
      alert("Error seeding database: " + err.message);
    }
  }

  if (dbError) {
    return (
      <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px', padding: '40px' }}>
        <h2>Database Connection Error</h2>
        <p style={{ color: 'var(--text-muted)' }}>Could not connect to Firebase. Please check your `.env.local` configuration and ensure you have created a Firestore database.</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header />
      
      {/* Main Map Area (Left) */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', display: 'flex', gap: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'var(--bg-panel-solid)', boxShadow: '0 4px 20px rgba(0,0,0,0.5)', zIndex: 10 }}>
          <span style={{ color: 'var(--text-primary)', fontWeight: '600', marginRight: 'auto' }}>Operational COP</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '12px', alignSelf: 'center', marginRight: '8px' }}>Tip: Click anywhere on the map to add an incident 📍</span>
          {(incidents.length === 0 || resources.length === 0 || shelters.length === 0) && <button className="btn-3d" onClick={handleSeedDatabase} style={{ padding: '6px 16px', fontSize: '13px', backgroundColor: 'var(--accent-medical)' }}>Seed Initial Data</button>}
          <button className="btn-3d" onClick={() => { setClickedLocation(null); setShowIncidentModal(true); }} style={{ padding: '6px 16px', fontSize: '13px' }}>+ Add Incident</button>
          <button className="btn-3d" onClick={() => setShowResourceModal(true)} style={{ padding: '6px 16px', fontSize: '13px' }}>+ Request Resource</button>
        </div>
        
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>Loading map data...</div>
        ) : (
          <LiveMap incidents={incidents} shelters={shelters} onMapClick={handleMapClick} onResolveIncident={handleResolveIncident} />
        )}
        
        <StatsOverview 
          activeIncidents={incidents.length} 
          resourceRequests={resources.filter(r=>r.status==='pending').length} 
          sheltersOpen={shelters.filter(s=>s.status==='Open').length}
          unitsDeployed={24}
        />
      </div>

      {/* Side Panel Area (Right) */}
      <div style={{ 
        display: 'flex', flexDirection: 'column', gap: '24px', 
        padding: '24px', backgroundColor: 'var(--bg-panel-solid)', 
        borderLeft: '1px solid rgba(255,255,255,0.05)', overflowY: 'auto' 
      }}>
        <ResourceRequests 
          requests={resources.filter(r => r.status === 'pending')} 
          onFulfill={handleFulfillResource} 
        />
        <ShelterTracker shelters={shelters} onEditClick={(s) => setEditingShelter(s)} />
        <IncidentLog logs={logs} />
      </div>
      
      {showIncidentModal && <AddIncidentModal initialLocation={clickedLocation} onClose={() => { setShowIncidentModal(false); setClickedLocation(null); }} onAdd={handleAddIncident} />}
      {showResourceModal && <AddResourceModal currentUser={currentUser} onClose={() => setShowResourceModal(false)} onAdd={handleAddResource} />}
      {editingShelter && <UpdateShelterModal shelter={editingShelter} onClose={() => setEditingShelter(null)} onUpdate={handleUpdateShelter} />}
    </div>
  )
}
