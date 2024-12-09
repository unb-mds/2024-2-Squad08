import { Link } from "react-router-dom";
import "../styles/Logo.css";

const Logo = () => {
  return (
    <div className="logo-background">
      <Link to="/menu">
        <button className="logo-button">
          MONITORA BSB
        </button>
      </Link>
    </div>
  );
};

export default Logo;
