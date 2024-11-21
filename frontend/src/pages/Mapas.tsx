import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt, FaDollarSign, FaExclamationTriangle, FaSlidersH } from 'react-icons/fa';
import './Mapas.css'; // Import custom CSS

// Custom Button component
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'outline' }> = ({ 
  children, 
  className = '', 
  variant,
  ...props 
}) => {
  const baseClass = "px-4 py-2 rounded-md font-medium text-sm";
  const variantClass = variant === 'outline' 
    ? "border border-gray-300 text-gray-300 hover:bg-gray-700" 
    : "bg-blue-500 text-white hover:bg-blue-600";
  
  return (
    <button 
      className={`${baseClass} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: '/path/to/custom-icon.png', // Make sure this path is correct
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'custom-marker' // Apply the custom CSS class
});

export default function MapInterface() {
  const markers = [
    { position: [-15.834, -48.057], label: "Obra 1" },
    { position: [-15.835, -48.058], label: "Obra 2" },
    { position: [-15.836, -48.059], label: "Obra 3" },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="flex justify-center p-4">
        <div className="flex gap-2 p-2 rounded-lg shadow-lg bg-opacity-0">
          <Button variant="outline" className="flex items-center gap-2">
            <FaMapMarkerAlt className="w-4 h-4" />
            REGIÃO DA OBRA
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FaDollarSign className="w-4 h-4" />
            VALOR INVESTIDO
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FaExclamationTriangle className="w-4 h-4" />
            TIPO DE OBRA
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FaSlidersH className="w-4 h-4" />
            STATUS DA OBRA
          </Button>
        </div>
      </div>
      <div className="flex-grow relative">
        <MapContainer center={[-15.835, -48.057]} zoom={13} className="h-full w-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.position} icon={customIcon}>
              <Popup>{marker.label}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

