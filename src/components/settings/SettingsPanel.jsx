import { useSettings } from '../../context/SettingsContext'
import ToggleSwitch from '../ui/ToggleSwitch'

const modes = [
  { id: 'hyper-spectral', label: 'HYPER\nSPECTRAL' },
  { id: 'cinematic', label: 'CINEMATIC' },
  { id: 'motion', label: '60FPS\nMOTION' },
]

export default function SettingsPanel({ panelRef }) {
  const { scanline, noise, glitch, visualMode, panelOpen, toggle, setVisualMode } = useSettings()

  const toggles = [
    { key: 'scanline', label: 'SCANLINE_OVERLAY', active: scanline },
    { key: 'noise', label: 'NEURAL_NOISE', active: noise },
    { key: 'glitch', label: 'GLITCH_FX', active: glitch },
  ]

  return (
    <div ref={panelRef} className={`settings-panel ${panelOpen ? 'open' : ''}`}>
      <div className="panel-header">// DISPLAY_CONTROLS</div>
      <div className="panel-row" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 8 }}>
        <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider" style={{ fontSize: 10 }}>
          VISUAL_MODE
        </span>
        <div className="mode-select">
          {modes.map((m) => (
            <button
              key={m.id}
              className={`mode-option ${visualMode === m.id ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); setVisualMode(m.id) }}
            >
              {m.label.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
            </button>
          ))}
        </div>
      </div>
      {toggles.map((t) => (
        <div key={t.key} className="panel-row">
          <span>{t.label}</span>
          <ToggleSwitch
            active={t.active}
            onClick={(e) => { e.stopPropagation(); toggle(t.key) }}
          />
        </div>
      ))}
    </div>
  )
}
