import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "../styles/registros.css"; 
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
        <h1>FAÇA O CADASTRO</h1>
        <p>Para obter informações personalizadas</p>

        <div className="input-container-login">
          <input type="text" placeholder='Usuário' />
          <input type="text" placeholder='Email' />
          <input type="text" placeholder='Senha' />
          <button className="btn-login">Salvar</button>
        </div>
      </div>
    </div>
  );
}
