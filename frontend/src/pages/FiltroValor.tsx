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
            <h1>ESCOLHA O VALOR</h1>
            
            <div className="checkbox-filter value">
                <label>
                  <input 
                    type="checkbox" 
                    value="cem" 
                    checked={statusFiltro.includes("cem")}
                    onChange={() => handleCheckboxChange("cem")}
                  />
                  Abaixo de R$ 100.000,00
                </label>

                <label>
                  <input 
                    type="checkbox" 
                    value="duzentos" 
                    checked={statusFiltro.includes("duzentos")}
                    onChange={() => handleCheckboxChange("duzentos")}
                  />
                  Abaixo de R$ 200.000,00
                </label>

                <label>
                  <input 
                    type="checkbox" 
                    value="trezentos" 
                    checked={statusFiltro.includes("trezentos")}
                    onChange={() => handleCheckboxChange("trezentos")}
                  />
                  Abaixo de R$ 300.000,00
                </label>

                <label>
                  <input 
                    type="checkbox" 
                    value="quinhentos" 
                    checked={statusFiltro.includes("quinhentos")}
                    onChange={() => handleCheckboxChange("quinhentos")}
                  />
                  Abaixo de R$ 500.000,00
                </label>

                <label>
                  <input 
                    type="checkbox" 
                    value="setecentos" 
                    checked={statusFiltro.includes("setecentos")}
                    onChange={() => handleCheckboxChange("setecentos")}
                  />
                Abaixo de R$ 700.000,00
                </label>

                <label>
                  <input 
                    type="checkbox" 
                    value="novecentos" 
                    checked={statusFiltro.includes("novecentos")}
                    onChange={() => handleCheckboxChange("novecentos")}
                  />
                  Abaixo de R$ 900.000,00
                </label>

                <label>
                  <input 
                    type="checkbox" 
                    value="milhao" 
                    checked={statusFiltro.includes("milhao")}
                    onChange={() => handleCheckboxChange("milhao")}
                  />
                  Acima de R$ 1.000.000,00
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
