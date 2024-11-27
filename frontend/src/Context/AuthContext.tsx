'use client'
import React, { createContext, useContext, useEffect } from "react"
import { useState } from "react";

export interface User{ 
    id: number; 
    username: string;
    email: string;
    password: string; 
    picture?: string; 
}

interface AuthContextType{ 
    user: User | null;
    signup: (username: string, email: string, password: string) => Promise<{ ok: boolean; error?: string}>;
    login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>; 
    logout: () => void;
    isReady: boolean;
}

interface AuthProviderProps{
    children: React.ReactNode; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null); 
    const [error, setError] = useState<string>("");
    const [token, setToken] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false); 

    useEffect(() => {
        const storedToken = localStorage.getItem('token'); 
        const storedUser = localStorage.getItem('user');

        if (storedToken){
            setToken(storedToken); 
            if (storedUser){  
                setUser(JSON.parse(storedUser));
            }
        }
        
        setIsReady(true);
    }, []);

    const login = async (email: string, password: string): Promise<{ ok: boolean; error?: string }> => {
        const data = { email, password }; 

        try {
            const response = await fetch('http://localhost:5000/users/login', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include',
                mode: 'cors'
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || 'Login failed');
                return { ok: false, error: errorData.error || 'Login failed' };
            }

            const result = await response.json();
            const token = response.headers.get('Authorization')?.split(' ')[1] || result.token;
            
            if (!token) {
                return { ok: false, error: 'No token received' };
            }

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(result.user));
            setToken(token);
            setUser(result.user);
            return { ok: true };

        } catch (error) {
            const errorMessage = 'Network error: Failed to connect to server';
            console.error('Login error:', error);
            setError(errorMessage);
            return { ok: false, error: errorMessage };
        }
    }; 

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    const SignUp = async (username: string, email: string, password: string) => {
        const data = { username, email, password}

        try {
            const response = await fetch('http://localhost:5000/users/create', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(data),
                credentials: 'include'
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Registration failed:', errorData);
                return { ok: false, error: errorData.error || 'Registration failed' };
            }
            
            const result = await response.json();
            return { ok: true };
        } catch(error) {
            console.error('Registration error:', error);
            return { ok: false, error: 'Error connecting to server' };
        }
    }

    return (
        <AuthContext.Provider value={{ 
            user, 
            signup: SignUp, 
            login,
            logout,
            isReady 
        }}>
            {isReady ? children : null}
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