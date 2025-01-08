import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/MapaGeral.css'; 
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import tipoIcon from '../assets/Geral.png';

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: tipoIcon, 
  iconSize: [30, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'custom-marker' 
});

export default function MapInterface() {
  const navigate = useNavigate();

  const markers = [
    { position: [-15.787, -47.929], label: "Obra 1" }, // Praça dos Três Poderes
    { position: [-15.795, -47.929], label: "Obra 2" }, // Palácio do Planalto
    { position: [-15.795, -47.929], label: "Obra 3" }, // Supremo Tribunal Federal
    { position: [-15.780, -47.939], label: "Obra 4" }, // Torre de TV
    { position: [-15.792, -47.930], label: "Obra 5" }, // Congresso Nacional
    { position: [-15.794, -47.925], label: "Obra 6" }, // Catedral Metropolitana de Brasília
    { position: [-15.794, -47.920], label: "Obra 7" }, // Museu Nacional
    { position: [-15.801, -47.918], label: "Obra 8" }, // Parque da Cidade
    { position: [-15.792, -47.910], label: "Obra 9" }, // Praça dos Três Poderes
    { position: [-15.792, -47.912], label: "Obra 10" }, // Palácio da Alvorada
    { position: [-15.802, -47.911], label: "Obra 11" }, // Memorial JK
    { position: [-15.803, -47.906], label: "Obra 12" }, // Parque Nacional de Brasília
    { position: [-15.789, -47.899], label: "Obra 13" }, // Estádio Mané Garrincha
    { position: [-15.785, -47.913], label: "Obra 14" }, // Universidade de Brasília (UnB)
    { position: [-15.789, -47.919], label: "Obra 15" }, // Biblioteca Nacional de Brasília
    { position: [-15.797, -47.907], label: "Obra 16" }, // Centro Cultural Banco do Brasil
    { position: [-15.799, -47.913], label: "Obra 17" }, // Praça do Buriti
    { position: [-15.802, -47.926], label: "Obra 18" }, // Ponte JK
    { position: [-15.802, -47.922], label: "Obra 19" }, // Parque Olhos D'Água
    { position: [-15.810, -47.930], label: "Obra 20" }, // Santuário Dom Bosco
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="flex-grow relative">
        <MapContainer center={[-15.792, -47.929]} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {markers.map((marker, index) => (
            <Marker 
              key={index} 
              position={marker.position} 
              icon={customIcon}
              eventHandlers={{
                click: () => {
                  navigate('/info');
                }
              }}
            >
            </Marker>
          ))}
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
    </div>
  );
}
