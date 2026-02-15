import React, { createContext, useContext, useState } from 'react';

interface UIContextType {
    isProfileOpen: boolean;
    openProfile: () => void;
    closeProfile: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
    const [isProfileOpen, setProfileOpen] = useState(false);

    const openProfile = () => setProfileOpen(true);
    const closeProfile = () => setProfileOpen(false);

    return (
        <UIContext.Provider value={{ isProfileOpen, openProfile, closeProfile }}>
            {children}
        </UIContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUI() {
    const context = useContext(UIContext);
    if (context === undefined) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
}
