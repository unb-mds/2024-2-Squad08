import { useState, useEffect } from 'react';
import axios from 'axios';

export interface ObraCoordinates {
  id: number;
  nome: string;
  latitude: number;
  longitude: number;
  tipo: string;
  situacao: string;
  valorInvestimentoPrevisto: number;
  original_wkt: string;
}

interface UseObrasCoordinatesReturn {
  obras: ObraCoordinates[];
  loading: boolean;
  error: string | null;
  fetchFilteredObrasValue: (tipo?: string, situacao?: string, valores?: string[]) => Promise<void>;
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
        setObras(response.data.data);
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

  const fetchFilteredObrasValue = async (tipo?: string, situacao?: string, valores?: string[]) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/filter`, {
        params: { tipo, situacao, valores }
      });
      if (response.data.success) {
        setObras(response.data.data);
        setError(null);
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