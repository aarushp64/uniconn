import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import './Layout.css';


interface MainLayoutProps {
    children: React.ReactNode;
    rightPanel?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, rightPanel }) => {
    return (
        <div className="app-layout">
            <main className="main-content">
                <Navbar />
                <div className={`animate-fade-in ${rightPanel ? 'dashboard-layout' : 'dashboard-layout dashboard-layout--no-right'}`}>
                    <div className="dashboard-sidebar">
                        <Sidebar />
                    </div>
                    <div className="dashboard-feed">
                        {children}
                    </div>
                    {rightPanel && (
                        <div className="dashboard-right">
                            {rightPanel}
                        </div>
                    )}
                </div>
                <MobileNav />
            </main>
        </div>
    );
};
