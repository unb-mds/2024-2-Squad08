import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/MapaGeral.css'; 
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
// import tipoIcon from '../assets/Geral.png';
import { useObrasCoordinates } from '../hooks/useObras';
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
  const { obras, loading, error } = useObrasCoordinates();

  console.log('Obras data:', obras);

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-gray-900 items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen bg-gray-900 items-center justify-center">
        <div className="text-white">{error}</div>
      </div>
    );
  }

  const defaultCenter: [number, number] = [-15.792, -47.929];
  const mapCenter = obras.length > 0 
    ? [obras[0].latitude, obras[0].longitude] as [number, number]
    : defaultCenter;

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="flex-grow relative">
        <MapContainer 
          center={mapCenter}
          zoom={13} 
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {obras.map((obra) => (
            <Marker
              key={obra.id}
              position={[obra.latitude, obra.longitude]} 
              icon={iconeConst}
              eventHandlers={{
                click: () => {
                  navigate(`/info/${obra.id}`);
                },
              }}
              
            >
              <Popup>
                <div>
                  <h3 className="font-bold">{obra.nome}</h3>
                  <p>Tipo: {obra.tipo}</p>
                  <p>Situação: {obra.situacao}</p>
                  <p>Valor: R$ {obra.valorInvestimentoPrevisto.toLocaleString('pt-BR')}</p>
                </div>
              </Popup>
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
