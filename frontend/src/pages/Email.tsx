import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "../styles/Registros.css"; 
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";

export default function Email() {
  const position = [-15.7801, -47.9292];
  const navigate = useNavigate(); 

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleEmail = () => {
    if (!email) {
      setError('Preencha o campo.');
      return;
    }
    if (!email.endsWith('@gmail.com')) {
      setError('Insira um email válido.');
      return;
    }
    setError('');
    navigate('/login'); 
  };

  return (
    <div className="relative h-screen w-full">
      <MapContainer 
        center={position} 
        zoom={10} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
      
      <Logo /> 

      <div className="login">
        <div className="input-container-login password-page">
          <h1>DIGITE SEU EMAIL</h1>
          <p>Um token será enviado para o seu email para redefinição de senha</p>
          <input 
            type="text" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
          {error && <p className="error-message">{error}</p>} 
          <button 
            className="btn-login"
            onClick={handleEmail}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
