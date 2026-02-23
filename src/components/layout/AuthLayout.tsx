import React from 'react';
import { Card } from '../common/Card';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen w-full flex-center p-4 relative overflow-hidden bg-bg-main">
            {/* Background Gradients */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-sky-200 opacity-20 blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-teal-200 opacity-20 blur-[120px]" />

            <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto relative z-10 animate-fade-in" hover={false}>
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gradient mb-2">UniConn</h1>
                    <h2 className="text-xl font-semibold text-primary">{title}</h2>
                    {subtitle && <p className="text-secondary mt-1">{subtitle}</p>}
                </div>

                {children}
            </Card>
        </div>
    );
};
