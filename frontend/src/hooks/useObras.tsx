// hooks/useObras.ts
import { useState, useEffect } from 'react';
import axios from 'axios';


export interface Obra {
  id: number;
  nome: string;
  uf: string;
  situacao: string;
  tipo: string;
  executores: any;
  natureza: string;
  endereco: string;
  funcaoSocial: string;
  dataInicialPrevista: string | null;
  dataFinalPrevista: string | null;
  fontesDeRecurso: any;
  valorInvestimentoPrevisto: number;
  origemRecurso: string;
  qdtEmpregosGerados: number;
  geometria: any;
}

interface UseObrasReturn {
  obras: Obra[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const API_URL = 'http://localhost:5000';


export const useObras = () => {
  const [obras, setObras] = useState<Obra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchObras = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/obras`);
      console.log('API Response:', response.data);
      setObras(response.data);
      setError(null);
    } catch (err) {
      console.error('Full error object:', err);
      setError('Erro ao carregar obras');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObras();
  }, []);

  return { obras, loading, error, refetch: fetchObras };
};
