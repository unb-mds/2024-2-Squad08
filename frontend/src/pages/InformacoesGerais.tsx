import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "../styles/InformacoesGerais.css"; 
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

        <div className="general-info">
            <h1>INFORMAÇÕES GERAIS</h1>
            <p>Identificador:</p>
            <p>Endereço:</p>
            <p>CEP:</p>
            <p>Data Inicial:</p>
            <p>Data Final:</p>
            <p>Executor:</p>
            <p>Valor:</p>
            <p>Tipo:</p>
            <p>Região:</p>

            <div className="info-btn">
                <button
                    onClick={() => navigate("/mapa")} >
                    SAIR
                </button>
            </div>

        </div>
    </div>
  );
}
