import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "../styles/Registros.css"; 
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";

export default function Endereco() {
  const position = [-15.7801, -47.9292];
  const navigate = useNavigate();  

  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
  const [error, setError] = useState('');

  const handleCepChange = async (e) => {
    const newCep = e.target.value;
    setCep(newCep);

    if (newCep.length > 0 && newCep.length < 8) {
      setError('CEP inválido!');
      setCidade('');
      setEstado('');
      setRua('');
      setBairro('');
      return;
    }

    if (newCep.length === 8) { 
      try {
        const response = await fetch(`https://viacep.com.br/ws/${newCep}/json/`);
        const data = await response.json();

        if (data.erro) {
          setError('CEP não encontrado!');
          setCidade('');
          setEstado('');
          setRua('');
          setBairro('');
        } else {
          setCidade(data.localidade || '');
          setEstado(data.uf || '');
          setRua(data.logradouro || '');
          setBairro(data.bairro || '');
          setError('');
        }
      } catch (err) {
        setError('Erro ao buscar o endereço!');
        setCidade('');
        setEstado('');
        setRua('');
        setBairro('');
      }
    } else {
      setError('');
    }
  };

  const handleAddress = () => {
    if (!cep || !cidade || !estado || !rua || !bairro || !numero) {
      setError('Preencha todos os campos!');
      return;
    }
    try {
      // const response = await fetch('/add_address', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     user_id: 1, 
      //     cep, cidade, estado, rua, bairro, numero
      //   }),
      // });
      // const data = await response.json();
      
      if (response.ok) {
        setError('');
        navigate('/'); 
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Erro ao tentar cadastrar o endereço.');
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
        <h1>CADASTRAR ENDEREÇO</h1>

        <div className="input-container-login">
          <input 
            type="text" 
            placeholder='CEP' 
            value={cep}
            onChange={handleCepChange}
          />
          <input 
            type="text" 
            placeholder='Cidade' 
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
          <input 
            type="text" 
            placeholder='Estado' 
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
          <input 
            type="text" 
            placeholder='Rua' 
            value={rua}
            onChange={(e) => setRua(e.target.value)}
          />
          <input 
            type="text" 
            placeholder='Bairro' 
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />
          <input 
            type="text" 
            placeholder='Número' 
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />

          <button 
            className="btn-login"
            onClick={handleAddress}
          >
            Salvar
          </button>
        </div>

        {/* Mensagem de erro com className */}
        {error && <p className="error-message">{error}</p>}

      </div>
    </div>
  );
}
