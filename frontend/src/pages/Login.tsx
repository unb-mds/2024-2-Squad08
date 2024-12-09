import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "../styles/Registros.css"; 
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const position = [-15.7801, -47.9292]; 
  const navigate = useNavigate();

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
        <h1>FAÇA O LOGIN</h1>
        <p>E veja todas as obras que estão acontecendo em sua cidade</p>

        <div className="input-container-login">
          <input type="text" placeholder='Usuário' />
          <input type="text" placeholder='Senha' />
          <button className="btn-login">Entrar</button>
        </div>

        <div className="link-login">
          <a 
            href="#"
            onClick={() => navigate("/senha")} >
            Esqueci a senha
          </a>

          <a 
            href="#"
            onClick={() => navigate("/cadastro")} >
            Não tenho conta
          </a>
        </div>
        
      </div>
    </div>
  );
}
