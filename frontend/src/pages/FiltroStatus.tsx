import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "../styles/filtros.css"; 
import Logo from "../components/logo";
import { IoIosClose } from "react-icons/io";

export default function MapaPage() {
  const position = [-15.7801, -47.9292]; 

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

            <div className="checkbox-filter">
                <label>
                <input type="checkbox" value="status1" />
                Iniciada
                </label>
                <label>
                <input type="checkbox" value="status2" />
                Em andamento
                </label>
                <label>
                <input type="checkbox" value="status3" />
                Atrasada
                </label>
                <label>
                <input type="checkbox" value="status4" />
                Concluída
                </label>
            </div>

            <div className="filter-btn">
                <button className="clean-btn">LIMPAR</button>
                <button className="check-btn">CONCLUIR</button>
            </div>
        </div>
    </div>
  );
}
