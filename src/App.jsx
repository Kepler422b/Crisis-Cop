import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={setCurrentUser} />} />
        <Route 
          path="/" 
          element={currentUser ? <Dashboard currentUser={currentUser} /> : <Navigate to="/login" replace />} 
        />
      </Routes>
    </BrowserRouter>
  )
}
