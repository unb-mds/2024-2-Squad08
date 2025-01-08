import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "../styles/Filtros.css"; 
import Logo from "../components/Logo";
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
            <h1>ESCOLHA O TIPO</h1>

            <div className="checkbox-filter type">
                <label>
                  <input 
                    type="checkbox" 
                    value="educação" 
                    checked={statusFiltro.includes("educação")}
                    onChange={() => handleCheckboxChange("educação")}
                  />
                  Educação
                </label>

                <label>
                  <input 
                    type="checkbox" 
                    value="desenvolvimento" 
                    checked={statusFiltro.includes("desenvolvimento")}
                    onChange={() => handleCheckboxChange("desenvolvimento")}
                  />
                  Desenvolvimento
                </label>

                <label>
                  <input 
                    type="checkbox" 
                    value="aministrativo" 
                    checked={statusFiltro.includes("aministrativo")}
                    onChange={() => handleCheckboxChange("aministrativo")}
                  />
                  Administrativo
                </label>

                <label>
                  <input 
                    type="checkbox" 
                    value="infraestrutura" 
                    checked={statusFiltro.includes("infraestrutura")}
                    onChange={() => handleCheckboxChange("infraestrutura")}
                  />
                  Infraestrutura Urbana
                </label>

                <label>
                  <input 
                    type="checkbox" 
                    value="energia" 
                    checked={statusFiltro.includes("energia")}
                    onChange={() => handleCheckboxChange("energia")}
                  />
                  Energia
                </label>

                <label>
                  <input 
                    type="checkbox" 
                    value="seguranca" 
                    checked={statusFiltro.includes("seguranca")}
                    onChange={() => handleCheckboxChange("seguranca")}
                  />
                  Segurança Pública
                </label>

                <label>
                  <input 
                    type="checkbox" 
                    value="esporte" 
                    checked={statusFiltro.includes("esporte")}
                    onChange={() => handleCheckboxChange("esporte")}
                  />
                  Esporte
                </label>

                <label>
                  <input 
                    type="checkbox" 
                    value="rodovia" 
                    checked={statusFiltro.includes("rodovia")}
                    onChange={() => handleCheckboxChange("rodovia")}
                  />
                  Rodovia
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
