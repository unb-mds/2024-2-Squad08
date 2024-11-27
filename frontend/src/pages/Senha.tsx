import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "../styles/login.css"; 
import Logo from "../components/logo";

export default function MapaPage() {
  const position = [-15.7801, -47.9292]; 

  return (
    <div className="relative h-screen w-full">
      <MapContainer 
        center={position} 
        zoom={10} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
      
      <Logo /> 

      <div className="login">
        <div className="input-container-login password-page">
            <h1>REDEFINIR SENHA</h1>
          <input type="text" placeholder='Email' />
          <input type="text" placeholder='Nova senha' />
          <input type="text" placeholder='Confirmar senha' />
          <button className="btn-login">Salvar</button>
        </div>
      </div>
    </div>
  );
}
