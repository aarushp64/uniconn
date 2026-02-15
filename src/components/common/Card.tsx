import React from 'react';
import './Card.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    glass?: boolean;
    hover?: boolean;
    border?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    glass = true,
    hover = false,
    border = true,
    className = '',
    ...props
}) => {
    return (
        <div
            className={`
        card 
        ${glass ? 'card-glass' : 'card-opaque'} 
        ${hover ? 'card-hover' : ''} 
        ${border ? 'card-border' : ''}
        ${className}
      `}
            {...props}
        >
            {children}
        </div>
    );
};
