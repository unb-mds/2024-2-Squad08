import 'leaflet/dist/leaflet.css';
import { BiLogIn } from "react-icons/bi";
import { FaListCheck } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { MdConstruction } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";
import { MapContainer, TileLayer } from 'react-leaflet';
import { useNavigate } from "react-router-dom";
import { RiLogoutCircleFill } from "react-icons/ri";
import Logo from "../components/Logo";
import { useAuth } from '../Context/AuthContext';
import "../styles/Menu.css";

export default function Menu() {
  const position = [-15.7801, -47.9292];
  const navigate = useNavigate();
  const { logout } = useAuth();

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
            {localStorage.getItem('token') ? (
              <>
                <button
                  className="purple-btn-map"
                  onClick={() => navigate("/endereco")}
                >
                  <IoLocationSharp className="icon" />
                  ENDEREÇO
                </button>
                <button
                  className="red-btn-map"
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  <RiLogoutCircleFill className="icon" />
                  LOGOUT
                </button>
              </>
            ) : (
              <button
                className="purple-btn-map"
                onClick={() => navigate("/login")}
              >
                <BiLogIn className="icon" />
                LOGIN
              </button>
            )}
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
              onClick={() => navigate("/tipo")}
            >
              <MdConstruction className="icon" />
              TIPO
            </button>
            
            <button
              className="orange-btn-map"
              onClick={() => navigate("/executor")}
            >
              <FaListCheck className="icon" />
              EXECUTOR
            </button>
          </div>
        </div>
      </div>
      <Logo />
    </div>
  );
}