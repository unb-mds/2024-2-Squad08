import { useState } from 'react';
import axios from 'axios';

interface Address {
    cep: string;
    cidade: string;
    estado: string;
    rua: string;
    bairro: string;
    numero: string;
}

function useAddress() {
    const [address, setAddress] = useState<Address>({
        cep: '',
        cidade: '',
        estado: '',
        rua: '',
        bairro: '',
        numero: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const setField = (field: keyof Address, value: string) => {
        setAddress(prev => ({
            ...prev,
            [field]: value
        }));
        setError('');
    };

    const validateFields = () => {
        const requiredFields = ['cep', 'cidade', 'estado', 'rua', 'bairro', 'numero'];
        const missingFields = requiredFields.filter(field => !address[field as keyof Address]);

        if (missingFields.length > 0) {
            setError(`Campos obrigatórios faltando: ${missingFields.join(', ')}`);
            return false;
        }
        return true;
    };

    const handleCepChange = async (cep: string) => {
        setField('cep', cep);
        setError('');

        const numericCep = cep.replace(/\D/g, '');

        if (numericCep.length === 8) {
            setLoading(true);
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${numericCep}/json/`);
                const data = response.data;

                if (!data.erro) {
                    setAddress(prev => ({
                        ...prev,
                        cep: numericCep,
                        cidade: data.localidade,
                        estado: data.uf,
                        rua: data.logradouro,
                        bairro: data.bairro
                    }));
                } else {
                    setError('CEP não encontrado');
                }
            } catch (error) {
                console.error('Erro ao buscar CEP:', error);
                setError('Erro ao buscar o CEP. Tente novamente.');
            } finally {
                setLoading(false);
            }
        }
    };

    const registerAddress = async () => {
        const user = JSON.parse(localStorage.getItem('user') || null);
        const userId = user?.id;
    
        if (!userId) {
            setError('Usuário não está logado. Faça login novamente.');
            return false;
        }
    
        console.log('Iniciando cadastro de endereço...', { userId, address });
    
        if (!validateFields()) {
            console.log('Validação falhou');
            return false;
        }
    
        setLoading(true);
        setError('');
        const API_URL = import.meta.env.VITE_MONITORA_API_URL as string;

        try {
            const payload = {
                ...address,
                user_id: userId // Usar o userId obtido do localStorage
            };
            console.log('Enviando payload:', payload);
    
            const response = await axios.post(`${API_URL}/endereco/cadastrar`, payload);
    
            console.log('Resposta da API:', response);
    
            if (response.status === 201) {
                console.log('Endereço cadastrado com sucesso');
                return true;
            } else {
                setError('Erro ao cadastrar endereço: ' + (response.data?.message || 'Erro desconhecido'));
                return false;
            }
        } catch (error) {
            console.error('Erro ao cadastrar endereço:', error);
            console.error('Detalhes do erro:', error.response?.data);
    
            setError(
                error.response?.data?.message || 
                error.response?.data?.error || 
                'Erro ao cadastrar endereço. Tente novamente.'
            );
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        address,
        error,
        loading,
        setField,
        handleCepChange,
        registerAddress
    };
}

export default useAddress;