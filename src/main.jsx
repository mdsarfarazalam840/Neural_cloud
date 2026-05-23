import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SettingsProvider } from './context/SettingsContext'
import Layout from './components/layout/Layout'
import App from './App'
import SchematicsPage from './pages/SchematicsPage'
import CorePage from './pages/CorePage'
import ProtocolDocsPage from './pages/ProtocolDocsPage'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SettingsProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<App />} />
            <Route path="/schematics" element={<SchematicsPage />} />
            <Route path="/core" element={<CorePage />} />
            <Route path="/protocol-docs" element={<ProtocolDocsPage />} />
          </Route>
        </Routes>
      </SettingsProvider>
    </BrowserRouter>
  </StrictMode>,
)
