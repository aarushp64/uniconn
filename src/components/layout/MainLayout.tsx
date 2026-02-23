import React from 'react';
import { Navbar } from './Navbar';
import './Layout.css';


interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="app-layout">
            <main className="main-content">
                <Navbar />
                <div className="animate-fade-in content-area">
                    {children}
                </div>
            </main>
        </div>
    );
};
