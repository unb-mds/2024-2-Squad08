import { useState, useEffect } from 'react';
import axios from 'axios';

export interface ObraCoordinates {
  id: number;
  nome: string;
  latitude: number;
  longitude: number;
  tipo: string;
  situacao: string;
  executores: string; 
  valorInvestimentoPrevisto: number;
  original_wkt: string;
}

interface UseObrasCoordinatesReturn {
  obras: ObraCoordinates[];
  loading: boolean;
  error: string | null;
  fetchFilteredObrasValue: (
    tipo?: string,
    situacao?: string,
    valores?: string, 
    executores?: string[]
  ) => Promise<void>;
}

interface ImportMeta {
  env: {
    VITE_API_URL: string;
  };
}

export const API_URL = import.meta.env.VITE_MONITORA_API_URL as string;

console.log('Environment Variables:', import.meta.env);

export const useObrasCoordinates = (): UseObrasCoordinatesReturn => {
  const [obras, setObras] = useState<ObraCoordinates[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchObras = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/obras/coordinates`);
      if (response.data.success) {
        const obrasNormalizadas = response.data.data.map((obra: any) => {
          const executorField = obra.executores || obra.executor || '';
          return {
            ...obra,
            executores: executorField.replace(/"/g, ''),
          };
        });
        setObras(obrasNormalizadas);
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


  const fetchFilteredObrasValue = async (
    tipo?: string,
    situacao?: string,
    valores?: string[],
    executores?: string[]
  ) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/filterExec`, {
        params: { tipo, situacao, 'valores[]': valores, executores },
      });
      if (response.data.success) {
        const obrasNormalizadas = response.data.data.map((obra: any) => {
          const executorField = obra.executores || obra.executor || '';
          return {
            ...obra,
            executores: executorField.replace(/"/g, ''),
          };
        });
        setObras(obrasNormalizadas);
        setError(null);
        return obrasNormalizadas;
      } else {
        setError('Erro ao carregar obras filtradas');
      }
    } catch (err) {
      console.error('Error fetching filtered obras:', err);
      setError('Erro ao buscar obras filtradas');
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    fetchObras();
  }, []);

  return { obras, loading, error, fetchFilteredObrasValue };
};
