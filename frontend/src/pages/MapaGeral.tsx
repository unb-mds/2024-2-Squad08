import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/MapaGeral.css'; 
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../components/Logo";
import { useObrasCoordinates } from '../hooks/useObras';
import education from '../assets/education.png';
import construction from '../assets/contruction.png';
import sport from '../assets/sport.png';
import security from '../assets/security.png';
import energy from '../assets/energia.png';
import adm from '../assets/adm.png';
import development from '../assets/development.png';
import road from '../assets/road.png';
import { filterObras } from '../utils/FiltroUtils';

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

const defaultCenter: [number, number] = [-15.792, -47.929];

export default function MapInterface() {
  const navigate = useNavigate();
  const location = useLocation();
  const [filteredObras, setFilteredObras] = useState<ObraCoordinates[]>([]);
  const { obras, loading, error } = useObrasCoordinates();

  useEffect(() => {
    const state = location.state as {
      tipo?: string;
      situacao?: string;
      valores?: string[];
    };

    if (state && obras.length > 0) {
      const filtered = filterObras(obras, state);
      setFilteredObras(filtered);
    } else {
      setFilteredObras(obras);
    }
  }, [obras, location.state]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const defaultCenter: [number, number] = [-15.792, -47.929];
  const mapCenter = filteredObras.length > 0 
    ? [filteredObras[0].latitude, filteredObras[0].longitude] as [number, number]
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
          {filteredObras.map((obra) => (
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
