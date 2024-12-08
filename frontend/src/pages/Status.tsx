import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../status.css";

export default function Status() {
  const position = [-15.7801, -47.9292]; // Coordenadas de exemplo
  const [statusFiltro, setStatusFiltro] = useState<string[]>([]);

  const toggleFiltro = (status: string) => {
    setStatusFiltro((prev) =>
      prev.includes(status) ? prev.filter((item) => item !== status) : [...prev, status]
    );
  };

  return (
    <div className="relative h-screen w-full">
      {/* Mapa */}
      <MapContainer center={position} zoom={10} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>

      {/* MOdal do filtro STATUS */}
      <div className="modal-filtro">
        <h2>ESCOLHA O STATUS</h2>
        <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              checked={statusFiltro.includes("Iniciada")}
              onChange={() => toggleFiltro("Iniciada")}
            />
            Iniciada
          </label>
          <label>
            <input
              type="checkbox"
              checked={statusFiltro.includes("Em andamento")}
              onChange={() => toggleFiltro("Em andamento")}
            />
            Em andamento
          </label>
          <label>
            <input
              type="checkbox"
              checked={statusFiltro.includes("Atrasada")}
              onChange={() => toggleFiltro("Atrasada")}
            />
            Atrasada
          </label>
          <label>
            <input
              type="checkbox"
              checked={statusFiltro.includes("Concluída")}
              onChange={() => toggleFiltro("Concluída")}
            />
            Concluída
          </label>
        </div>
        <div className="button-container">
          <button onClick={() => setStatusFiltro([])}>Limpar</button>
          <button onClick={() => console.log(statusFiltro)}>Concluir</button>
        </div>
      </div>
    </div>
  );
}
