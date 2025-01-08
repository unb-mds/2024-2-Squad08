import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "../styles/MapaGeral.css"; 
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";

export default function MapaGeral() {
  const position = [-15.7801, -47.9292]; 
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full">
      <MapContainer 
        center={position} 
        zoom={13} 
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>

      {/* Botão fixo */}
      <button
        className="btn-map"
        onClick={() => navigate("/")}
      >
        MENU
      </button>

      {/* Logo fixa sobre o mapa */}
      <div className="logo-container">
        <Logo />
      </div>
    </div>
  );
}
