import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "../styles/Filtros.css"; 
import Logo from "../components/Logo";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useObrasCoordinates } from '../hooks/useObras';

const API_URL = 'http://localhost:5000/obras';

export default function FiltroValor() {
  const navigate = useNavigate();
  const position = [-15.7801, -47.9292];
  const [statusFiltroValores, setStatusFiltroValores] = useState<string[]>([]);
  const { obras, loading, error, fetchFilteredObrasValue } = useObrasCoordinates();

  const handleCheckboxChange = (value: string) => {
    setStatusFiltroValores((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleLimpar = () => {
    setStatusFiltroValores([]);
  };

  const handleConcluir = async () => {
    try {
      console.log("Valores selecionados:", statusFiltroValores);
      
      const filteredData = await fetchFilteredObrasValue(undefined, undefined, statusFiltroValores);
      
      console.log("Dados filtrados recebidos:", filteredData);
      
      navigate('/mapa', { state: { filteredObras: filteredData } });
    } catch (error) {
      console.error('Erro ao buscar obras filtradas:', error);
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
      <div className="filter-container">
        <h1>ESCOLHA O VALOR</h1>

        <div className="checkbox-filter value">
          {[
            { label: "Abaixo de R$ 100.000,00", value: "cem" },
            { label: "Abaixo de R$ 200.000,00", value: "duzentos" },
            { label: "Abaixo de R$ 300.000,00", value: "trezentos" },
            { label: "Abaixo de R$ 500.000,00", value: "quinhentos" },
            { label: "Abaixo de R$ 700.000,00", value: "setecentos" },
            { label: "Abaixo de R$ 900.000,00", value: "novecentos" },
            { label: "Acima de R$ 1.000.000,00", value: "milhao" }
          ].map(({ label, value }) => (
            <label key={value}>
              <input
                type="checkbox"
                value={value}
                checked={statusFiltroValores.includes(value)}
                onChange={() => handleCheckboxChange(value)}
              />
              {label}
            </label>
          ))}
        </div>

        <div className="filter-btn">
          <button className="clean-btn" onClick={handleLimpar}>LIMPAR</button>
          <button className="check-btn" onClick={handleConcluir}>CONCLUIR</button>
        </div>
      </div>

      {loading && <p className="loading-message">Carregando...</p>}
      {error && <p className="error-message">Erro: {error}</p>}

      <div className="obras-container">
        <h2>Obras Filtradas</h2>
        <ul>
          {obras.map((obra) => (
            <li key={obra.id}>
              {obra.nome} - {obra.situacao}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
