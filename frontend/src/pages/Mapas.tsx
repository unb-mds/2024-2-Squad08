import React from 'react';
import { IoLocationSharp } from "react-icons/io5";
import { TbMoneybag } from "react-icons/tb";
import { BiLogIn } from "react-icons/bi";
import { MdConstruction } from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";
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
        <div className="btn-container-left">
          <button className="green-btn-map">
            <IoLocationSharp className="icon" />
            REGIÃO
          </button>
          <button className="yellow-btn-map">
            <TbMoneybag className="icon" />
            VALOR
          </button>
        </div>
        <div className="btn-container-right">
          <button className="red-btn-map">
            <MdConstruction className="icon" />
            TIPO
          </button>
          <button className="orange-btn-map">
            <FaListCheck className="icon" />
            STATUS
          </button>
        </div>
      </div>

      <div className="login-container">
        <h1>JÁ POSSUI UMA CONTA?</h1>
        <button className="gray-btn-map">
          <BiLogIn className="icon" />
          LOGIN
        </button>
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
