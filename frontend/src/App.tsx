// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Obras from './pages/Obras';
import Mapas from './pages/Mapas';
import Noticias from './pages/Noticias';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Mapas />} />
      <Route path="/obras" element={<Obras />} />
      <Route path="/home" element={<Home />} />
      <Route path="/noticias" element={<Noticias />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;