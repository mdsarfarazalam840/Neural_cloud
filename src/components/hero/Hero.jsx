import { useNavigate } from 'react-router-dom'
import SideMetrics from './SideMetrics'
import StatusDot from '../ui/StatusDot'

export default function Hero() {
  const navigate = useNavigate()
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="relative z-10 text-center max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="inline-flex items-center gap-3 glass-card px-5 py-2 mb-8 rounded-full border border-primary-fixed/20"
          style={{ animation: 'fadeUp 0.8s 0.3s both ease-out' }}>
          <StatusDot rings={2} />
          <span className="font-label-sm text-label-sm text-primary-fixed tracking-[0.3em] uppercase">
            SYSTEM_OS v4.0 // OPTIMIZED
          </span>
        </div>

        <h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-primary-fixed mb-6 tracking-tighter leading-none"
          style={{ animation: 'fadeUp 0.8s 0.5s both ease-out' }}>
          ARCHITECTING THE<br />
          <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] glow-pulse">
            NEURAL CLOUD
          </span>
        </h1>

        <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto"
          style={{ animation: 'fadeUp 0.8s 0.7s both ease-out' }}>
          High-performance cloud infrastructure &amp; hyper-spectral interface design for next-generation digital ecosystems.
        </p>

        <div className="flex flex-col md:flex-row gap-5 justify-center items-center"
          style={{ animation: 'fadeUp 0.8s 0.9s both ease-out' }}>
          <button onClick={() => document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' })} className="cyber-button px-10 py-4 bg-primary-fixed-dim text-on-primary font-body-md font-bold rounded">
            INITIATE_CONNECT
          </button>
          <button onClick={() => navigate('/schematics')} className="cyber-button px-10 py-4 border border-primary-fixed-dim/30 text-primary-fixed-dim font-body-md font-medium rounded backdrop-blur-md hover:bg-primary-fixed/10">
            VIEW_SCHEMATICS
          </button>
        </div>
      </div>

      <SideMetrics />

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <span className="material-symbols-outlined text-primary-fixed-dim/40 text-3xl">expand_circle_down</span>
      </div>
    </section>
  )
}
