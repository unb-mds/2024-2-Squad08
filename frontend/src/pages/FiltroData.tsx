import 'leaflet/dist/leaflet.css';
import { ChangeEvent, useState } from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import Logo from "../components/Logo";
import "../styles/Filtros.css";

export default function FiltroData() {
  const position: [number, number] = [-15.7801, -47.9292];
  const [dataInicio, setDataInicio] = useState<string>('');
  const [dataFim, setDataFim] = useState<string>('');

  const limparFiltros = () => {
    setDataInicio('');
    setDataFim('');
  };

  const handleDataInicioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDataInicio(event.target.value);
  };

  const handleDataFimChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDataFim(event.target.value);
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
        <h1>ESCOLHA A DATA</h1>
        
        <div className="date-filter">
          <label>
            Data de Início:
            <input 
              type="date" 
              value={dataInicio} 
              onChange={handleDataInicioChange}
            />
          </label>
          
          <label>
            Data de Fim:
            <input 
              type="date" 
              value={dataFim} 
              onChange={handleDataFimChange}
            />
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
