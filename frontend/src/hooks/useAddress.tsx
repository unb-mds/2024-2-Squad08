import axios from 'axios';
import { useState } from 'react';

export interface Address {
    id?: number;
    user_id: number;
    cep: string;
    cidade: string;
    estado: string;
    rua: string;
    bairro: string;
    numero: string;
}
interface AddressState {
    cep: string;
    cidade: string;
    estado: string;
    rua: string;
    bairro: string;
    numero: string;
}

interface UseAddressReturn {
    address: AddressState;
    error: string;
    setField: (field: keyof AddressState, value: string) => void;
    handleCepChange: (cep: string) => Promise<void>;
    registerAddress: (userId: number) => Promise<boolean>;
    clearAddress: () => void;
}

const API_URL = import.meta.env.VITE_MONITORA_API_URL as string;

export const addressService = {
    async fetchAddressByCep(cep: string) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            
            if (data.erro) {
                throw new Error('CEP não encontrado!');
            }
            
            return data;
        } catch (error) {
            throw new Error('Erro ao buscar o endereço!');
        }
    },

    async registerAddress(address: Address) {
        try {
            const response = await axios.post(`${API_URL}/endereco/cadastrar`, address, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            return {
                ok: true,
                data: response.data
            };
        } catch (error: any) {
            return {
                ok: false,
                error: error.response?.data?.error || 'Erro ao cadastrar endereço'
    };
        }
    }
};


export const useAddress = (): UseAddressReturn => {
    const [address, setAddress] = useState<AddressState>({
        cep: '',
        cidade: '',
        estado: '',
        rua: '',
        bairro: '',
        numero: ''
    });
    const [error, setError] = useState('');

    const setField = (field: keyof AddressState, value: string) => {
        setAddress(prev => ({ ...prev, [field]: value }));
    };

    const clearAddress = () => {
        setAddress({
            cep: '',
            cidade: '',
            estado: '',
            rua: '',
            bairro: '',
            numero: ''
        });
        setError('');
    };

    const handleCepChange = async (cep: string) => {
        setField('cep', cep);

        if (cep.length > 0 && cep.length < 8) {
            setError('CEP inválido!');
            clearAddress();
            return;
        }

        if (cep.length === 8) {
            try {
                const data = await addressService.fetchAddressByCep(cep);
                setAddress(prev => ({
                    ...prev,
                    cidade: data.localidade || '',
                    estado: data.uf || '',
                    rua: data.logradouro || '',
                    bairro: data.bairro || '',
                }));
                setError('');
            } catch (err: any) {
                setError(err.message);
                clearAddress();
            }
        }
    };

    const registerAddress = async (userId: number): Promise<boolean> => {
        if (!address.cep || !address.cidade || !address.estado || 
            !address.rua || !address.bairro || !address.numero) {
            setError('Preencha todos os campos!');
            return false;
        }

        const result = await addressService.registerAddress({
            user_id: userId,
            ...address
        });

        if (!result.ok) {
            setError(result.error);
            return false;
        }

        clearAddress();
        return true;
    };

    return {
        address,
        error,
        setField,
        handleCepChange,
        registerAddress,
        clearAddress
    };
};
