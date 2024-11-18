import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GrUserWorker } from "react-icons/gr";
import { renderToStaticMarkup } from 'react-dom/server';

const iconMarkup = renderToStaticMarkup(<GrUserWorker size={40} className="text-gray-950	" />);

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
    <div className='h-screen w-full'>
      <MapContainer 
        center={position} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
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
    </div>
  );
}