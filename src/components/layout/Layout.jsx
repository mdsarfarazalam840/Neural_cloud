import { useSettings } from '../../context/SettingsContext'
import { useEffect, useCallback } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Cursor from './Cursor'
import ShellTerminal from './ShellTerminal'
import HyperSpectralScene from '../scenes/HyperSpectralScene'
import CinematicScene from '../scenes/CinematicScene'
import MotionScene from '../scenes/MotionScene'

function BackgroundScene({ mode }) {
  switch (mode) {
    case 'cinematic': return <CinematicScene />
    case 'motion': return <MotionScene />
    default: return <HyperSpectralScene />
  }
}

function SectionNavWatcher() {
  const updateActiveLink = useCallback(() => {
    const links = document.querySelectorAll('.nav-link')
    const sections = document.querySelectorAll('section[id]')
    let current = ''
    sections.forEach((s) => {
      const top = s.offsetTop - 200
      if (window.scrollY >= top) current = s.id
    })
    links.forEach((link) => {
      link.classList.toggle('active', link.dataset.target === current)
    })
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', updateActiveLink, { passive: true })
    updateActiveLink()
    return () => window.removeEventListener('scroll', updateActiveLink)
  }, [updateActiveLink])

  return null
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function Layout() {
  const { scanline, noise, glitch, visualMode } = useSettings()

  return (
    <div className={glitch ? 'glitch-active' : ''}>
      <ScrollToTop />
      <Cursor />
      <BackgroundScene mode={visualMode} />
      {scanline && <div className="scanline-overlay" />}
      {noise && <div className="neural-noise" />}
      <Navbar />
      <Outlet />
      <Footer />
      <ShellTerminal />
      <SectionNavWatcher />
    </div>
  )
}
