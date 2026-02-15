import React, { forwardRef, useId } from 'react';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    label,
    error,
    leftIcon,
    rightIcon,
    fullWidth = false,
    className = '',
    id,
    ...props
}, ref) => {
    const generatedId = useId();
    const inputId = id || props.name || generatedId;

    return (
        <div className={`input-wrapper ${fullWidth ? 'w-full' : ''} ${className}`}>
            {label && <label htmlFor={inputId} className="input-label">{label}</label>}

            <div className="input-container">
                {leftIcon && <span className="input-icon input-icon-left">{leftIcon}</span>}

                <input
                    id={inputId}
                    ref={ref}
                    className={`input-field ${error ? 'input-error' : ''} ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''}`}
                    {...props}
                />

                {rightIcon && <span className="input-icon input-icon-right">{rightIcon}</span>}
            </div>

            {error && <span className="input-error-msg">{error}</span>}
        </div>
    );
});

Input.displayName = 'Input';
