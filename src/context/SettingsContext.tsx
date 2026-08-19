import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AppSettings {
  // Appearance & Theme
  theme: 'light' | 'dark' | 'system';
  compactMode: boolean;
  accentColor: 'sky' | 'indigo' | 'emerald' | 'violet' | 'rose';

  // Notifications
  emailAlerts: boolean;
  pushNotifications: boolean;
  eventReminders: boolean;
  defaultReminderTiming: '10m' | '30m' | '1h' | '1d';
  weeklyDigest: boolean;

  // Privacy & Security
  publicProfile: boolean;
  showOnlineStatus: boolean;
  showEmailToPeers: boolean;
  allowPeerMessages: 'everyone' | 'verified_only' | 'nobody';

  // Academic & Campus Details
  department: string;
  academicYear: string;
  campusLocation: string;
}

export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'light',
  compactMode: false,
  accentColor: 'sky',

  emailAlerts: true,
  pushNotifications: true,
  eventReminders: true,
  defaultReminderTiming: '30m',
  weeklyDigest: true,

  publicProfile: true,
  showOnlineStatus: true,
  showEmailToPeers: false,
  allowPeerMessages: 'verified_only',

  department: 'School of Engineering (SOE) - Computer Science & AI',
  academicYear: 'Third Year (TY - Batch of 2027)',
  campusLocation: 'Loni Kalbhor Main Campus, Pune',
};

interface SettingsContextType {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  resetSettings: () => void;
}

const SETTINGS_STORAGE_KEY = 'uniconn_app_settings';

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
      return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch {}

    // Apply Real Theme Effect to DOM
    const isDark =
      settings.theme === 'dark' ||
      (settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply Real Compact Mode Effect to Body
    if (settings.compactMode) {
      document.body.classList.add('compact-mode');
    } else {
      document.body.classList.remove('compact-mode');
    }
  }, [settings]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
