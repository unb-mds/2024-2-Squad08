import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/MapaGeral.css'; 
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
// import tipoIcon from '../assets/Geral.png';
import education from '../assets/education.png';
import construction from '../assets/contruction.png';
import sport from '../assets/sport.png';
import security from '../assets/security.png';
import energy from '../assets/energia.png';
import adm from '../assets/adm.png';
import development from '../assets/development.png';
import road from '../assets/road.png';


const iconeEducacao = new L.Icon({
  iconUrl: education, 
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'custom-marker' 
});

const iconeConst = new L.Icon({
  iconUrl: construction, 
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'custom-marker' 
});

const iconeSport = new L.Icon({
  iconUrl: sport, 
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'custom-marker' 
});

const iconeSecurity = new L.Icon({
  iconUrl: security, 
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'custom-marker' 
});

const iconeEnergy = new L.Icon({
  iconUrl: energy, 
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'custom-marker' 
});

const iconeAdm = new L.Icon({
  iconUrl: adm, 
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'custom-marker' 
});

const iconeDev = new L.Icon({
  iconUrl: development, 
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'custom-marker' 
});

const iconeRoad = new L.Icon({
  iconUrl: road, 
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'custom-marker' 
});

export default function MapInterface() {
  const navigate = useNavigate();

  const markers = [
    { position: [-15.787, -47.929], label: "Obra 1", type: "Infraestrutura Urbana"}, // Praça dos Três Poderes
    { position: [-15.795, -47.929], label: "Obra 2", type: "Infraestrutura Urbana"}, // Palácio do Planalto
    { position: [-15.795, -47.929], label: "Obra 3", type: "Infraestrutura Urbana"}, // Supremo Tribunal Federal
    { position: [-15.780, -47.939], label: "Obra 4", type: "Infraestrutura Urbana"}, // Torre de TV
    { position: [-15.792, -47.930], label: "Obra 5", type: "Infraestrutura Urbana"}, // Congresso Nacional
    { position: [-15.794, -47.925], label: "Obra 6", type: "Infraestrutura Urbana"}, // Catedral Metropolitana de Brasília
    { position: [-15.794, -47.920], label: "Obra 7", type: "Infraestrutura Urbana"}, // Museu Nacional
    { position: [-15.801, -47.918], label: "Obra 8", type: "Infraestrutura Urbana"}, // Parque da Cidade
    { position: [-15.792, -47.910], label: "Obra 9", type: "Infraestrutura Urbana"}, // Praça dos Três Poderes
    { position: [-15.792, -47.912], label: "Obra 10", type: "Infraestrutura Urbana"}, // Palácio da Alvorada
    { position: [-15.802, -47.911], label: "Obra 11", type: "Infraestrutura Urbana"}, // Memorial JK
    { position: [-15.803, -47.906], label: "Obra 12", type: "Infraestrutura Urbana"}, // Parque Nacional de Brasília
    { position: [-15.789, -47.899], label: "Obra 13", type: "esporte"}, // Estádio Mané Garrincha
    { position: [-15.785, -47.913], label: "Obra 14", type: "educacao"}, // Universidade de Brasília (UnB)
    { position: [-15.789, -47.919], label: "Obra 15", type: "educacao"}, // Biblioteca Nacional de Brasília
    { position: [-15.797, -47.907], label: "Obra 16", type: "desenvolvimento"}, // Centro Cultural Banco do Brasil
    { position: [-15.799, -47.913], label: "Obra 17", type: "Infraestrutura Urbana"}, // Praça do Buriti
    { position: [-15.802, -47.926], label: "Obra 18", type: "Infraestrutura Urbana"}, // Ponte JK
    { position: [-15.802, -47.922], label: "Obra 19", type: "Infraestrutura Urbana"}, // Parque Olhos D'Água
    { position: [-15.810, -47.930], label: "Obra 20", type: "Infraestrutura Urbana"}, // Santuário Dom Bosco
    { position: [-15.795, -47.945], label: "Obra 22", type: "educacao" },
    { position: [-15.834, -47.906], label: "Obra 23", type: "Infraestrutura Urbana" },
    { position: [-15.857, -47.905], label: "Obra 24", type: "esporte" },
    { position: [-15.828, -47.910], label: "Obra 25", type: "seguranca" },
    { position: [-15.812, -47.912], label: "Obra 26", type: "energia" },
    { position: [-15.867, -47.916], label: "Obra 27", type: "administracão" },
    { position: [-15.876, -47.917], label: "Obra 28", type: "desenvolvimento" },
    { position: [-15.819, -47.915], label: "Obra 29", type: "rodovia" },
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
              icon={
                marker.type === "educacao" ? iconeEducacao : 
                marker.type === "Infraestrutura Urbana" ? iconeConst  : 
                marker.type === "esporte" ? iconeSport :
                marker.type === "seguranca" ? iconeSecurity :
                marker.type === "energia" ? iconeEnergy :
                marker.type === "administracão" ? iconeAdm :
                marker.type === "desenvolvimento" ? iconeDev :
                marker.type === "rodovia" ? iconeRoad :
                marker.type === "Infraestrutura Urbana" ? iconeConst : iconeConst
              }
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
