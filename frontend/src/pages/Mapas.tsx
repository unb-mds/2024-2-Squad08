import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GrUserWorker } from "react-icons/gr";
import { renderToStaticMarkup } from 'react-dom/server';
import Logo from "../components/logo";  
import "/home/beatriz/Documentos/Github/MOSP-G8/frontend/src/styles/mapa.css"

const iconMarkup = renderToStaticMarkup(<GrUserWorker size={40} className="text-gray-950" />);

const customIcon = new L.DivIcon({
  html: iconMarkup,
  className: 'custom-icon',
  iconSize: [40, 40], 
  iconAnchor: [20, 40], 
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function Mapas() {
  const position = [-15.7801, -47.9292];
  const position1 = [-16.000, -48.000];
  const position2 = [-15.900, -47.800]; 

  return (
    <div className="relative h-screen w-full">
      <MapContainer 
        center={position} 
        zoom={14} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <div className="map-container">
          <h1>ESCOLHA UM FILTRO</h1>

        <div className="btn-container-map">
          <div className="btn-container-first">
            <button>REGIÃO</button>
            <button>VALOR</button>
          </div>
          
          <div className="btn-container-second">
            <button>TIPO</button>
            <button>STATUS</button>
          </div>

          <div className="btn-container-third">
            <button>LOGIN</button>
            <button>CADASTRO</button>
          </div>

        </div>
      </div>


        <Marker position={position} icon={customIcon}>
          <Popup>
            Obra de Revitalização
          </Popup>
        </Marker>
        <Marker position={position1} icon={customIcon}>
          <Popup>
            Obra de Revitalização    
          </Popup>
        </Marker>
        <Marker position={position2} icon={customIcon}>
          <Popup>
            Obra de Revitalização
          </Popup>
        </Marker>
      </MapContainer>
      
      <Logo />
    
    </div>
  );
}
