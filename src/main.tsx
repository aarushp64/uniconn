import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { UIProvider } from './context/UIContext.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { SettingsProvider } from './context/SettingsContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <SettingsProvider>
        <UIProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UIProvider>
      </SettingsProvider>
    </AuthProvider>
  </React.StrictMode>,
)
