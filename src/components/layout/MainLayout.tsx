import React from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import './Layout.css';
import Profile from '../../pages/Profile';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <Navbar />
                <div className="animate-fade-in">
                    {children}
                </div>
            </main>
            <Profile />
        </div>
    );
};
