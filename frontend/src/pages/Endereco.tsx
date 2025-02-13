import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "../styles/Registros.css";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";
import { useAddress } from '../hooks/useAddress';
import { useAuth } from '../Context/AuthContext';

export default function Endereco() {
    const position = [-15.7801, -47.9292];
    const navigate = useNavigate();
    const { user } = useAuth();
    const {
        address,
        error,
        setField,
        handleCepChange,
        registerAddress
    } = useAddress();

    const handleSubmit = async () => {
        if (!user?.id) {
            navigate('/login');
            return;
        }

        const success = await registerAddress(user.id);
        if (success) {
            navigate('/');
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
                <h1>CADASTRAR ENDEREÇO</h1>

                <div className="input-container-login">
                    <input
                        type="text"
                        placeholder='CEP'
                        value={address.cep}
                        onChange={(e) => handleCepChange(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder='Cidade'
                        value={address.cidade}
                        onChange={(e) => setField('cidade', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder='Estado'
                        value={address.estado}
                        onChange={(e) => setField('estado', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder='Rua'
                        value={address.rua}
                        onChange={(e) => setField('rua', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder='Bairro'
                        value={address.bairro}
                        onChange={(e) => setField('bairro', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder='Número'
                        value={address.numero}
                        onChange={(e) => setField('numero', e.target.value)}
                    />

                    <button
                        className="btn-login"
                        onClick={handleSubmit}
                    >
                        Salvar
                    </button>
                </div>

                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
}

