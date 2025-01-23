import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/InformacoesGerais.css";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";

interface ObraDetails {
  id: number;
  nome: string;
  latitude: number;
  longitude: number;
  tipo: string;
  situacao: string;
  valorInvestimentoPrevisto: number;
  original_wkt: string;
}

export default function InformacoesGerais() {
  const { obraId } = useParams();
  const navigate = useNavigate();
  const [obra, setObra] = useState<ObraDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchObraDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/obras/${obraId}/coordinates`
        );
        if (response.data.success) {
          setObra(response.data.data);
          setError(null);
        } else {
          setError("Erro ao carregar detalhes da obra.");
        }
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar detalhes da obra.");
      } finally {
        setLoading(false);
      }
    };

    fetchObraDetails();
  }, [obraId]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!obra) {
    return <div>Nenhuma obra encontrada.</div>;
  }

  const position = [obra.latitude, obra.longitude] as [number, number];

  return (
    <div className="relative h-screen w-full">
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>

      <Logo />

      <div className="general-info">
        <h1>INFORMAÇÕES GERAIS</h1>
        <p>Identificador: {obra.id}</p>
        <p>Nome: {obra.nome}</p>
        <p>Tipo: {obra.tipo}</p>
        <p>Situação: {obra.situacao}</p>
        <p>Valor Investido: R$ {obra.valorInvestimentoPrevisto.toLocaleString('pt-BR')}</p>
        <div className="info-btn">
          <button onClick={() => navigate("/mapa")}>SAIR</button>
        </div>
      </div>
    </div>
  );
}
