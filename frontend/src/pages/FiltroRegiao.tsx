import { useState } from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/Filtros.css";
import Logo from "../components/Logo";

const regioesAdministrativas = [
  "Plano Piloto", "Gama", "Brazlândia", "Candangolândia",
  "Riacho Fundo II", "Riacho Fundo", "Recanto das Emas", "Lago Sul",
  "Planaltina", "Paranoá", "Guará", "Samambaia", "Santa Maria",
  "São Sebastião", "Park Way", "Sobradinho II", "Jardim Botânico",
  "Vicente Pires", "SIA", "Águas Claras", "Ceilândia", "Fercal",
  "Taguatinga", "Pôr do Sol", "Arniqueira", "Sudoeste/Octogonal",
  "Varjão", "Núcleo Bandeirante", "Cruzeiro", "Lago Norte",
  "SCIA", "Itapoã"
];

export default function FiltroRegiao() {
  const [statusFiltro, setStatusFiltro] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null); // Novo estado para exibir erros
  const navigate = useNavigate();

  const handleCheckboxChange = (value: string) => {
    setStatusFiltro((prev) => 
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const limparFiltros = () => {
    setStatusFiltro([]);
    setError(null); // Limpar erro ao resetar os filtros
  };

  const handleConcluir = async () => {
    if (statusFiltro.length === 0) {
      setError("Selecione pelo menos uma região antes de continuar.");
      return;
    }

    try {
      setError(null); // Resetar erro antes da requisição
      const response = await axios.get('http://localhost:5000/obras/filterRegion', {
        params: { regions: statusFiltro }
      });

      if (response.data.success && response.data.data.length > 0) {
        navigate("/mapa", { state: { filteredObras: response.data.data } });
      } else {
        setError("Nenhuma obra encontrada para os filtros selecionados.");
      }
    } catch (error) {
      console.error("Erro ao filtrar obras por região:", error);
      setError("Ocorreu um erro ao buscar as obras. Tente novamente mais tarde.");
    }
  };

  const position = [-15.7801, -47.9292];

  return (
    <div className="relative h-screen w-full">
      <MapContainer center={position} zoom={10} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>

      <Logo />
      <div className="filter-container">
        <h1>ESCOLHA A REGIÃO ADMINISTRATIVA</h1>
        <div className="checkbox-filter region">
          {regioesAdministrativas.map((ra) => (
            <label key={ra}>
              <input
                type="checkbox"
                value={ra}
                checked={statusFiltro.includes(ra)}
                onChange={() => handleCheckboxChange(ra)}
              />
              {ra}
            </label>
          ))}
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="filter-btn">
          <button className="clean-btn" onClick={limparFiltros}>LIMPAR</button>
          <button className="check-btn" onClick={handleConcluir}>CONCLUIR</button>
        </div>
      </div>
    </div>
  );
}
