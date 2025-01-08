import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "../styles/Filtros.css"; 
import Logo from "../components/Logo";
import { useState } from "react";

export default function FiltroExecutor() {
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
            <h1>ESCOLHA O EXECUTOR</h1>

            <div className="checkbox-filter executer">
                <label>
                  <input 
                    type="checkbox" 
                    value="iniciada" 
                    checked={statusFiltro.includes("iniciada")}
                    onChange={() => handleCheckboxChange("iniciada")}
                  />
                  Departamento Nacional de Infraestrutura de Transportes
                </label>

                <label>
                  <input 
                    type="checkbox" 
                    value="CBMDF" 
                    checked={statusFiltro.includes("CBMDF")}
                    onChange={() => handleCheckboxChange("CBMDF")}
                  />
                  Corpo de Bombeiros Militar do Distrito Federal
                </label>

                <label>
                  <input 
                    type="checkbox" 
                    value="SEA" 
                    checked={statusFiltro.includes("SEA")}
                    onChange={() => handleCheckboxChange("SEA")}
                  />
                  Secretaria de Estado da Agricultura
                </label>

                <label>
                  <input 
                    type="checkbox" 
                    value="ADR" 
                    checked={statusFiltro.includes("ADR")}
                    onChange={() => handleCheckboxChange("ADR")}
                  />
                  Abastecimento e Desenvolvimento Rural 
                </label>

                <label>
                  <input 
                    type="checkbox" 
                    value="DER" 
                    checked={statusFiltro.includes("DER")}
                    onChange={() => handleCheckboxChange("DER")}
                  />
                  Departamento de Estradas de Rodagem 
                </label>

                <label>
                  <input 
                    type="checkbox" 
                    value="FUB" 
                    checked={statusFiltro.includes("FUB")}
                    onChange={() => handleCheckboxChange("FUB")}
                  />
                  Fundação Univesidade de Brasília
                </label>

                <label>
                  <input 
                    type="checkbox" 
                    value="MIDR" 
                    checked={statusFiltro.includes("MIDR")}
                    onChange={() => handleCheckboxChange("MIDR")}
                  />
                  Ministério  da Integração e do Desenvolvimento Regional
                </label>

                <label>
                  <input 
                    type="checkbox" 
                    value="CE" 
                    checked={statusFiltro.includes("CE")}
                    onChange={() => handleCheckboxChange("CE")}
                  />
                  Comando do Exército
                </label>

                <label>
                  <input 
                    type="checkbox" 
                    value="IFECTB" 
                    checked={statusFiltro.includes("IFECTB")}
                    onChange={() => handleCheckboxChange("IFECTB")}
                  />
                  Instituto Federal Educação, Ciência e Tecnologia de Brasília
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
