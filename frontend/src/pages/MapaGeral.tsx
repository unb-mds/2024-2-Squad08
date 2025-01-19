import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/MapaGeral.css';
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import tipoIcon from '../assets/Geral.png';
import { useObrasCoordinates } from '../hooks/useObras';

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
              icon={customIcon}
              eventHandlers={{
                click: () => {
                  navigate(`/info/${obra.id}`);
                }
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

        <button
          className="btn-map"
          onClick={() => navigate("/")}
        >
          MENU
        </button>

        <div className="logo-container">
          <Logo />
        </div>
      </div>
    </div>
  );
}