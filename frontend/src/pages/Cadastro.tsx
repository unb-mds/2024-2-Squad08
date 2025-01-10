import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "../styles/Registros.css"; 
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const position = [-15.7801, -47.9292]; 
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    if (!usuario || !email || !password) {
      setError('Preencha todos os campos!');
      return;
    }
    try {
      // const response = await axios.post('http://localhost:5000/cadastro', { username: usuario, email, password });

      navigate('/endereco'); 
    } catch (err) {
      setError(err.response?.data?.error || 'Erro inesperado');
    }
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
        <h1>FAÇA O CADASTRO</h1>
        <p>Para obter informações personalizadas</p>

        <div className="input-container-login">
          <input 
            type="text" 
            placeholder='Usuário' 
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <input 
            type="text" 
            placeholder='Email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          <input 
            type="password" 
            placeholder='Senha' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          <button 
            className="btn-login"
            onClick={handleRegister} 
          >
            Salvar
          </button>

          {error && <p className="error-message">{error}</p>}

        </div>
      </div>
    </div>
  );
}
