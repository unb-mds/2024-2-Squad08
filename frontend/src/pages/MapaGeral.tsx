import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/MapaGeral.css';
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import tipoIcon from '../assets/Geral.png';
import { useObras } from '../hooks/useObras';

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
  const { obras, loading, error } = useObras();

  // Debug log the entire obras array
  console.log('Obras received:', obras);

  const getCoordinates = (geometria: any) => {
    // Debug log the received geometria
    console.log('Processing geometria:', geometria);
    
    try {
      if (geometria && geometria.coordinates) {
        console.log('Found coordinates:', geometria.coordinates);
        // GeoJSON uses [longitude, latitude], Leaflet needs [latitude, longitude]
        const coords = [geometria.coordinates[1], geometria.coordinates[0]];
        console.log('Converted coordinates:', coords);
        return coords;
      }
      console.log('No coordinates found in geometria');
      return null;
    } catch (error) {
      console.error('Error parsing geometria:', error);
      return null;
    }
  };

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

  // Debug log the number of obras being processed
  console.log('Number of obras to display:', obras.length);

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="flex-grow relative">
        <MapContainer 
          center={[-15.792, -47.929]} 
          zoom={13} 
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {obras.map((obra) => {
            console.log('Processing obra:', obra.id, obra.nome);
            const coordinates = getCoordinates(obra.geometria);
            console.log('Calculated coordinates:', coordinates);
            
            if (!coordinates) {
              console.log('Skipping obra due to missing coordinates:', obra.id);
              return null;
            }

            return (
              <Marker
                key={obra.id}
                position={coordinates}
                icon={customIcon}
                eventHandlers={{
                  click: () => {
                    navigate(`/info/${obra.id}`);
                  }
                }}
              />
            );
          })}
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