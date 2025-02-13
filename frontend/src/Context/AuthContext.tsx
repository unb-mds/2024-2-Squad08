'use client'
import React, { createContext, useContext } from "react"
import { useState } from "react";
import axios from "axios";

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    picture?: string;
}

interface AuthContextType {
    user: User | null;
    signup: (username: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
    login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
    validateEmail: (email: string) => boolean;
    validatePassword: (password: string) => boolean;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const API_URL = import.meta.env.VITE_MONITORA_API_URL as string;

    const validateEmail = (email: string): boolean => {
        return email.endsWith('@gmail.com');
    };

    const validatePassword = (password: string): boolean => {
        return password.length >= 8;
    };

    const signup = async (username: string, email: string, password: string) => {
        if (!username || !email || !password) {
            return { ok: false, error: 'Preencha todos os campos!' };
        }
    
        const data = { username, email, password }
    
        try {
            const response = await axios.post(`${API_URL}/usuario/cadastro`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 201) {
                return { ok: true }
            } else {
                return { ok: false, error: response.data.error || 'Erro desconhecido' }
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return { ok: false, error: error.response?.data?.error || 'Erro ao cadastrar' }
            }
            return { ok: false, error: 'Erro de conexão' }
        }
    }

    const login = async (email: string, password: string) => {
        if (!email || !password) {
            return { ok: false, error: 'Preencha todos os campos!' };
        }

        if (!validateEmail(email)) {
            return { ok: false, error: 'Insira um email válido.' };
        }

        if (!validatePassword(password)) {
            return { ok: false, error: 'A senha deve ter no mínimo 8 caracteres.' };
        }

        try {
            const response = await axios.post(`${API_URL}/usuario/login`, { username: email, password }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 200) {
                const userData = response.data.user;
                const { token } = response.data;
                localStorage.setItem('token', token);
                setUser({
                    id: userData.id,
                    username: userData.username,
                    email: userData.email,
                    password: '',
                    picture: userData.picture,
                });
                return { ok: true }
            } else {
                return { ok: false, error: response.data.error }
            }
        } catch (error) {
            return { ok: false, error: 'Credenciais inválidas' }
        }
    }

    return (
        <AuthContext.Provider value={{ user, signup, login, validateEmail, validatePassword }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export { AuthContext, AuthProvider, useAuth };
