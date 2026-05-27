import { useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import { useSettings } from '../../context/SettingsContext'
import SettingsPanel from '../settings/SettingsPanel'

const sections = [
  { id: 'hero', label: 'HOME' },
  { id: 'about', label: 'SYSTEMS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'connect', label: 'CONNECT' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { setPanelOpen, setTerminalOpen, panelOpen } = useSettings()
  const panelRef = useRef(null)
  const btnRef = useRef(null)

  useEffect(() => {
    const onDocClick = (e) => {
      if (
        panelOpen &&
        !panelRef.current?.contains(e.target) &&
        !btnRef.current?.contains(e.target)
      ) {
        setPanelOpen(false)
      }
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [panelOpen, setPanelOpen])

  const handleNavClick = (id) => {
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  return (
    <nav
      className="fixed top-0 w-full z-[100] flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 bg-surface/40 backdrop-blur-xl border-b border-white/10"
      style={{ animation: 'fadeDown 0.6s 0.1s both ease-out' }}
    >
      <a
        href="#"
        className="font-display text-headline-md font-extrabold text-primary-fixed-dim tracking-tighter hover:scale-105 transition-transform duration-500"
        onClick={(e) => { e.preventDefault(); handleNavClick('hero') }}
      >
        NEURAL_ARCHITECT
      </a>
      <div className="hidden md:flex items-center gap-10">
        {sections.map((s) => (
          <motion.a
            key={s.id}
            href={`#${s.id}`}
            data-target={s.id}
            className="nav-link text-body-md uppercase tracking-widest text-on-surface-variant"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.preventDefault(); handleNavClick(s.id) }}
          >
            {s.label}
          </motion.a>
        ))}
      </div>
      <div className="flex items-center gap-3 relative" id="settings-container">
        <motion.button
          ref={btnRef}
          className="p-2 transition-all duration-500 hover:scale-110 hover:bg-primary-fixed/10 hover:shadow-[0_0_15px_rgba(0,219,231,0.3)] rounded-full group"
          whileTap={{ scale: 0.9 }}
          onClick={(e) => { e.stopPropagation(); setPanelOpen(!panelOpen) }}
        >
          <span className="material-symbols-outlined text-primary-fixed-dim group-hover:rotate-180 transition-transform duration-700">
            settings_input_component
          </span>
        </motion.button>
        <SettingsPanel panelRef={panelRef} />
        <motion.button
          className="p-2 transition-all duration-500 hover:scale-110 hover:bg-primary-fixed/10 hover:shadow-[0_0_15px_rgba(0,219,231,0.3)] rounded-full group"
          whileTap={{ scale: 0.9 }}
          onClick={() => setTerminalOpen(true)}
        >
          <span className="material-symbols-outlined text-primary-fixed-dim group-hover:translate-x-1 transition-transform">
            terminal
          </span>
        </motion.button>
      </div>
    </nav>
  )
}
