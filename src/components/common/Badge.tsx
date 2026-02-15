import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import './Badge.css';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral' | 'outline';
    verified?: boolean;
    className?: string;
    onClick?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'neutral',
    verified = false,
    className = '',
    onClick,
}) => {
    return (
        <span
            className={`badge badge-${variant} ${className}`}
            onClick={onClick}
        >
            {verified && <CheckCircle2 size={12} className="badge-verify-icon" />}
            {children}
        </span>
    );
};
