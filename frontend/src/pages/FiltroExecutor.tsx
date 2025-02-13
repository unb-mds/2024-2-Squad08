import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "../styles/Filtros.css"; 
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_MONITORA_API_URL as string;

export default function FiltroExecutor() {
  const navigate = useNavigate();
  const position = [-15.7801, -47.9292];
  const [statusFiltroExecutores, setStatusFiltroExecutores] = useState<string[]>([]);
  const [executores, setExecutores] = useState<string[]>([]);

  useEffect(() => {
    const fetchExecutores = async () => {
      try {
        const response = await fetch(`${API_URL}/obras/executores`);
        const data = await response.json();
        if (data.success) {
          setExecutores(data.data);
        } else {
          console.error('Erro ao buscar executores:', data.error);
        }
      } catch (error) {
        console.error('Erro ao buscar executores:', error);
      }
    };

    fetchExecutores();
  }, []);

  const handleCheckboxChange = (value: string) => {
    setStatusFiltroExecutores((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleLimpar = () => {
    setStatusFiltroExecutores([]);
  };

  const handleConcluir = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFiltroExecutores.length > 0) {
        params.append('executores', statusFiltroExecutores[0]);
      }
      const url = `${API_URL}/obras/filterExec?${params.toString()}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        const obrasNormalizadas = data.data.map((obra: any) => {
          const executorField = obra.executores || obra.executor || '';
          return {
            ...obra,
            executores: executorField.replace(/"/g, ''),
          };
        });
        navigate("/mapa", { state: { filteredObras: obrasNormalizadas } });
      } else {
        console.error('Erro ao buscar obras:', data.error);
      }
    } catch (error) {
      console.error('Erro ao buscar obras:', error);
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
          attribution='&copy; OpenStreetMap contributors'
        />
      </MapContainer>
      
      <Logo />
      <div className="filter-container">
        <h1>ESCOLHA O EXECUTOR</h1>
        <div className="checkbox-filter executer">
          {executores.map((executor, index) => (
            <label key={index}>
              <input 
                type="checkbox" 
                value={executor} 
                checked={statusFiltroExecutores.includes(executor)}
                onChange={() => handleCheckboxChange(executor)}
              />
              {executor}
            </label>
          ))}
        </div>
        <div className="filter-btn">
          <button className="clean-btn" onClick={handleLimpar}>
            LIMPAR
          </button>
          <button className="check-btn" onClick={handleConcluir}>
            CONCLUIR
          </button>
        </div>
      </div>
    </div>
  );
}