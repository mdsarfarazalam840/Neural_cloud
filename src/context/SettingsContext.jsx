import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'neural_settings'

const DEFAULTS = {
  scanline: true,
  noise: true,
  glitch: false,
  visualMode: 'hyper-spectral',
}

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return { ...DEFAULTS, ...parsed }
    }
  } catch {}
  return { ...DEFAULTS }
}

const SettingsContext = createContext(null)

export function SettingsProvider({ children }) {
  const [initial] = useState(loadSettings)
  const [scanline, setScanline] = useState(initial.scanline)
  const [noise, setNoise] = useState(initial.noise)
  const [glitch, setGlitch] = useState(initial.glitch)
  const [visualMode, setVisualMode] = useState(initial.visualMode)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ scanline, noise, glitch, visualMode }))
  }, [scanline, noise, glitch, visualMode])

  const toggle = useCallback((key) => {
    if (key === 'scanline') setScanline(v => !v)
    else if (key === 'noise') setNoise(v => !v)
    else if (key === 'glitch') setGlitch(v => !v)
  }, [])

  const value = {
    scanline, noise, glitch, visualMode, terminalOpen, panelOpen,
    setVisualMode, setTerminalOpen, setPanelOpen,
    toggle,
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider')
  return ctx
}
