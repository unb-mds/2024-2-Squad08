import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "../styles/Filtros.css"; 
import Logo from "../components/Logo";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';

export default function FiltroTipo() {
  const navigate = useNavigate();
  const position = [-15.7801, -47.9292];
  const [statusFiltro, setStatusFiltro] = useState<string[]>([]);
  const [tipos, setTipos] = useState<string[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchTipos = async () => {
      try {
        const response = await fetch('http://localhost:5000/obras/tipos', { signal });
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        
        const data = await response.json();
        if (data.success) {
          setTipos(data.data);
        } else {
          console.error('Erro ao buscar tipos:', data.error);
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Erro ao buscar tipos:', error);
        }
      }
    };

    fetchTipos();
    return () => controller.abort();
  }, []);

  const handleCheckboxChange = useCallback((value: string) => {
    setStatusFiltro((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  }, []);

  const limparFiltros = useCallback(() => setStatusFiltro([]), []);

  const handleConcluir = useCallback(async () => {
    try {
      const url = new URL('http://localhost:5000/obras/filterExec');
      statusFiltro.forEach(tipo => url.searchParams.append('tipo', tipo));

      console.log('URL da requisição:', url.toString());

      const response = await fetch(url.toString());
      if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);

      const rawData = await response.text();
      console.log('Resposta bruta:', rawData);

      const data = JSON.parse(rawData);
      console.log('Dados parseados:', data);

      if (data.success) {
        navigate("/mapa", { state: { filteredObras: data.data } });
      } else {
        console.error('Erro ao buscar obras:', data.error);
      }
    } catch (error) {
      console.error('Erro ao buscar obras:', error);
    }
  }, [statusFiltro, navigate]);

  return (
    <div className="relative h-screen w-full">
      <MapContainer center={position} zoom={10} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
      </MapContainer>
      
      <Logo /> 
      <div className="filter-container">
        <h1>ESCOLHA O TIPO</h1>

        <div className="checkbox-filter type">
          {tipos.map((tipo, index) => (
            <label key={index}>
              <input 
                type="checkbox" 
                value={tipo}
                checked={statusFiltro.includes(tipo)}
                onChange={() => handleCheckboxChange(tipo)}
              />
              {tipo}
            </label>
          ))}
        </div>

        <div className="filter-btn">
          <button className="clean-btn" onClick={limparFiltros}>
            LIMPAR
          </button>
          <button className="check-btn" onClick={handleConcluir}>
            CONCLUIR
          </button>
        </div>
      </div>
    </div>
  );
}