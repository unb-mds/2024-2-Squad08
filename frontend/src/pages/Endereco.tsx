import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "../styles/Registros.css";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";
import useAddress from '../hooks/useAddress';
import { useAuth } from '../Context/AuthContext';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/marker-icon-2x.png',
    iconUrl: '/marker-icon.png',
    shadowUrl: '/marker-shadow.png'
});

function MapUpdater({ position }) {
    const map = useMap();
    useEffect(() => {
        map.setView(position, 15);
    }, [position, map]);
    return null;
}

export default function Endereco() {
    const position = [-15.7801, -47.9292];
    const navigate = useNavigate();
    const { user } = useAuth();
    const {
        address,
        error,
        loading,
        setField,
        handleCepChange,
        registerAddress
    } = useAddress();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        const userId = user?.id;

        if (!userId) {
            console.log('Usuário não está logado');
            navigate('/login');
            return;
        }

        try {
            console.log('Iniciando submissão do formulário...');
            const success = await registerAddress(userId); // Passar o userId obtido
            console.log('Resultado do cadastro:', success);
            
            if (success) {
                alert('Endereço cadastrado com sucesso!');
                navigate('/');
            }
        } catch (err) {
            console.error('Erro no handleSubmit:', err);
        }
    };

    return (
        <div className="relative h-screen w-full">
            <MapContainer
                center={position}
                zoom={10}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
            </MapContainer>

            <Logo />

            <div className="login">
                <h1>{localStorage.getItem('token') ? 'EDITAR ENDEREÇO' : 'CADASTRAR ENDEREÇO'}</h1>
                <form onSubmit={handleSubmit} className="input-container-login">
                    <input
                        type="text"
                        placeholder='CEP'
                        value={address.cep}
                        onChange={(e) => handleCepChange(e.target.value)}
                        disabled={loading}
                    />
                    <input
                        type="text"
                        placeholder='Cidade'
                        value={address.cidade}
                        onChange={(e) => setField('cidade', e.target.value)}
                        disabled={loading}
                    />
                    <input
                        type="text"
                        placeholder='Estado'
                        value={address.estado}
                        onChange={(e) => setField('estado', e.target.value)}
                        disabled={loading}
                    />
                    <input
                        type="text"
                        placeholder='Rua'
                        value={address.rua}
                        onChange={(e) => setField('rua', e.target.value)}
                        disabled={loading}
                    />
                    <input
                        type="text"
                        placeholder='Bairro'
                        value={address.bairro}
                        onChange={(e) => setField('bairro', e.target.value)}
                        disabled={loading}
                    />
                    <input
                        type="text"
                        placeholder='Número'
                        value={address.numero}
                        onChange={(e) => setField('numero', e.target.value)}
                        disabled={loading}
                    />

                    <button
                        type="submit"
                        className="btn-login"
                        disabled={loading}
                    >
                        {loading ? 'Salvando...' : 'Salvar'}
                    </button>
                </form>

                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
}