import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    avatar?: string;
    role?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (userData: User) => void;
    logout: () => void;
    updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'uniconn_user';
const DEFAULT_USER: User = {
    id: 'user-001',
    name: 'Vedant Dande',
    email: 'vedant.dande@mituniversity.edu.in',
    username: 'vedant_dande',
    role: 'STUDENT',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : DEFAULT_USER;
        } catch {
            return DEFAULT_USER;
        }
    });

    useEffect(() => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_USER));
        }
    }, []);

    const login = (userData: User) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem('token');
        setUser(null);
    };

    const updateUser = (data: Partial<User>) => {
        setUser((prev) => {
            const updated = prev ? { ...prev, ...data } : { ...DEFAULT_USER, ...data };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <AuthContext.Provider value={{ user, loading: false, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
