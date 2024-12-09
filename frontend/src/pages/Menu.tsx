import { IoLocationSharp } from "react-icons/io5";
import { TbMoneybag } from "react-icons/tb";
import { BiLogIn } from "react-icons/bi";
import { MdConstruction } from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Logo from "../components/Logo";  
import "../styles/Menu.css";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const position = [-15.7801, -47.9292];
  const navigate = useNavigate();

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
      </MapContainer>

      <div className="map-container">
        <div className="login-container">
          <h1>O QUE VOCÊ QUER FAZER?</h1>
          <div className="button-group">
            <button
              className="purple-btn-map"
              onClick={() => navigate("/login")}
            >
              <BiLogIn className="icon" />
              LOGIN
            </button>
            <button
              className="gray-btn-map"
              onClick={() => navigate("/noticias")}
            >
              <BiLogIn className="icon" />
              NOTÍCIAS
            </button>
          </div>
          <button
            className="blue-btn-map"
            onClick={() => navigate("/mapa")}
          >
            <BiLogIn className="icon" />
            VER MAPA
          </button>
        </div>

        <h1 className="inter-text">OU</h1>
        <h1>FILTRAR MAPA:</h1>
        <div className="btn-container-buttom">
          <div className="btn-container-left">
            <button
              className="green-btn-map"
              onClick={() => navigate("/regiao")}
            >
              <IoLocationSharp className="icon" />
              REGIÃO
            </button>
            <button
              className="yellow-btn-map"
              onClick={() => navigate("/valor")}
            >
              <TbMoneybag className="icon" />
              VALOR
            </button>
          </div>
          <div className="btn-container-right">
            <button
              className="red-btn-map"
              onClick={() => navigate("/tipe")}
            >
              <MdConstruction className="icon" />
              TIPO
            </button>
            <button
              className="orange-btn-map"
              onClick={() => navigate("/status")}
            >
              <FaListCheck className="icon" />
              STATUS
            </button>
          </div>
        </div>
      </div>
      <Logo />
    </div>
  );
}
