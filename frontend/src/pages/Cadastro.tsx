import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import "../styles/Registros.css";

export default function Cadastro() {
  const position = [-15.7801, -47.9292]; 
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [regiao, setRegiao] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleRegister = () => {
    if (!usuario || !email || !password || !regiao) {
      setError('Preencha todos os campos!');
      return;
    }
    try {
      // const response = await axios.post('http://localhost:5000/cadastro', { username: usuario, email, password, region: regiao });

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

          <h1>ESCOLHA A REGIÃO</h1>
          <select 
            value={regiao}
            onChange={(e) => setRegiao(e.target.value)}
          >
            <option value="" disabled>Selecione sua região</option>
            <option value="norte">Região Norte</option>
            <option value="sul">Região Sul</option>
            <option value="leste">Região Leste</option>
            <option value="oeste">Região Oeste</option>
            <option value="nordeste">Região Nordeste</option>
            <option value="noroeste">Região Noroeste</option>
            <option value="sudeste">Região Sudeste</option>
            <option value="sudoeste">Região Sudoeste</option>
          </select>

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

