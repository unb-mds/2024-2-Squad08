import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "../styles/Registros.css"; 
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";

export default function Senha() {
  const position = [-15.7801, -47.9292];
  const navigate = useNavigate(); 

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handlePassword = () => {
    if (!email || !newPassword || !confirmPassword) {
      setError('Preencha todos os campos!');
      return;
    }
    if (!email.endsWith('@gmail.com')) {
      setError('Insira um email válido.');
      return;
    }
    if (newPassword.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('As senhas não conferem!');
      return;
    }
    setError('');
    navigate('/endereco'); 
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
          <h1>REDEFINIR SENHA</h1>
          <input 
            type="text" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Nova senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Confirmar senha" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
          {error && <p className="error-message">{error}</p>} {/* Exibe erro, se houver */}
          <button 
            className="btn-login"
            onClick={handlePassword}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
