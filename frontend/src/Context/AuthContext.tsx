'use client'
import React, { createContext, useContext } from "react"
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
}

interface AuthProviderProps{
    children: React.ReactNode; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null); 

    const SignUp = async (username: string, email: string, password: string) => {
        const data = { username, email, password}

        try {
            const response = await fetch('http://localhost:5000/users/create', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(data)
            })
            if (response.ok) {
                return { ok: true}
            }
            else{
                const result = await response.json();
                return { ok: false, error: result.error }
            }
        } catch(error){
            return { ok: false, error: 'Error'}
        }
    }

    return (
        <AuthContext.Provider value={{ user, signup: SignUp }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return [context.signup, context.user] as const;
}

export { AuthContext, AuthProvider, useAuth }; 