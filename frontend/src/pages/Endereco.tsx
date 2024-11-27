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
        <h1>CADASTRAR ENDEREÇO</h1>

        <div className="input-container-login">
          <input type="text" placeholder='CEP' />
          <input type="text" placeholder='Cidade' />
          <input type="text" placeholder='Estado' />
          <input type="text" placeholder='Rua' />
          <input type="text" placeholder='Bairro' />
          <input type="text" placeholder='Número' />
          <button className="btn-login">Salvar</button>
        </div>

        <div className="link-login">
          <a href="#">Esqueci a senha</a>
          <a href="#">Não tenho conta</a>
        </div>
        
      </div>
    </div>
  );
}
