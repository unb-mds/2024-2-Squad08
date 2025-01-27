import { useState, useEffect } from 'react';
import axios from 'axios';



export interface ObraCoordinates {
  id: number;
  nome: string;
  latitude: number;
  longitude: number;
  tipo: string;
  situacao: string;
  executor: string;
  valorInvestimentoPrevisto: number;
  original_wkt: string;
}

interface UseObrasCoordinatesReturn {
  obras: ObraCoordinates[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const API_URL = 'http://localhost:5000/obras';

export const useObrasCoordinates = (): UseObrasCoordinatesReturn => {
  const [obras, setObras] = useState<ObraCoordinates[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchObras = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/coordinates`);
      if (response.data.success) {
  
        const obrasData = response.data.data.map((obra: any) => ({
          ...obra,
          executor: obra.executores
            ? obra.executores.map((e: any) => e.nome).join(', ')
            : 'Não informado', 
        }));
        setObras(obrasData);
        setError(null);
      } else {
        setError('Erro ao carregar coordenadas das obras');
      }
    } catch (err) {
      console.error('Error fetching coordinates:', err);
      setError('Erro ao carregar coordenadas das obras');
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchObras();
  }, []);

  return { obras, loading, error, refetch: fetchObras };
};

