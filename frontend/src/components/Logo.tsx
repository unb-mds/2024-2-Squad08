import { useNavigate } from "react-router-dom";
import "../styles/Logo.css";

const Logo = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="logo-background">
      <button className="logo-button" onClick={handleLogoClick}>
        MONITORA BSB
      </button>
    </div>
  );
};

export default Logo;
