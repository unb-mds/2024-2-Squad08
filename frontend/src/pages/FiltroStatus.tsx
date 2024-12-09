import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "../styles/Filtros.css"; 
import Logo from "../components/Logo";
import { IoIosClose } from "react-icons/io";
import { useState } from "react";

export default function FiltroStatus() {
  const position = [-15.7801, -47.9292];
  const [statusFiltro, setStatusFiltro] = useState<string[]>([]); 
  
  const handleCheckboxChange = (value: string) => {
    setStatusFiltro((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value) 
        : [...prev, value] 
    );
  };

  const limparFiltros = () => {
    setStatusFiltro([]); 
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
            <IoIosClose className="close-icon"/>
            <h1>ESCOLHA O STATUS</h1>

            <div className="checkbox-filter status">
                <label>
                  <input 
                    type="checkbox" 
                    value="iniciada" 
                    checked={statusFiltro.includes("iniciada")}
                    onChange={() => handleCheckboxChange("iniciada")}
                  />
                  Iniciada
                </label>

                <label>
                  <input 
                    type="checkbox" 
                    value="andamento" 
                    checked={statusFiltro.includes("andamento")}
                    onChange={() => handleCheckboxChange("andamento")}
                  />
                  Em andamento
                </label>

                <label>
                  <input 
                    type="checkbox" 
                    value="atrasada" 
                    checked={statusFiltro.includes("atrasada")}
                    onChange={() => handleCheckboxChange("atrasada")}
                  />
                Atrasada
                </label>

                <label>
                  <input 
                    type="checkbox" 
                    value="concluida" 
                    checked={statusFiltro.includes("concluida")}
                    onChange={() => handleCheckboxChange("concluida")}
                  />
                  Concluída
                </label>
            </div>

            <div className="filter-btn">
                <button className="clean-btn" onClick={limparFiltros}>
                  LIMPAR
                </button>
                <button className="check-btn">
                  CONCLUIR
                </button>
            </div>
        </div>
    </div>
  );
}
