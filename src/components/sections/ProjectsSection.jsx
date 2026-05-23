import { useNavigate } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import GlassCard from '../ui/GlassCard'
import SyncBar from '../ui/SyncBar'

function RevealSection({ delay, children, className = '' }) {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  )
}

export default function ProjectsSection() {
  const navigate = useNavigate()
  return (
    <section id="projects" className="relative z-10 py-28 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest/30">
      <div className="max-w-container-max mx-auto">
        <RevealSection delay={0}>
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 bg-primary-fixed-dim rounded-full animate-pulse" />
              <span className="font-label-sm text-label-sm text-primary-fixed tracking-[0.3em]">DIRECTORY_V4.0</span>
            </div>
            <h2 className="font-display-xl-mobile md:text-headline-lg text-headline-lg text-white glitch-hover inline-block">
              OPERATIONAL SYSTEMS
            </h2>
          </div>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Project 1 */}
          <RevealSection delay={0.1} className="md:col-span-7">
            <GlassCard className="rounded-xl overflow-hidden h-full flex flex-col" interactive>
              <div className="relative overflow-hidden aspect-video">
                <img
                  alt="Neural network circuitry"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
                  src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-primary-container/20 text-primary-fixed font-label-sm text-label-sm px-3 py-1 rounded border border-primary-fixed/30 backdrop-blur-md">
                    ACTIVE_CORE
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-headline-lg text-headline-lg text-primary-fixed-dim uppercase glitch-hover">Aether_Nexus Node</h3>
                  <span className="font-body-md text-label-sm text-primary-fixed/50">DATA_SYNC</span>
                </div>
                <SyncBar className="mb-4" />
                <p className="font-body-md text-on-surface-variant mb-6">
                  Centralized neural processing for decentralized edge intelligence. Sub-millisecond latency across planetary-scale architectures.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-surface-container-highest border border-outline-variant text-primary-fixed font-label-sm text-label-sm">
                    TECH: RUST_WASM
                  </span>
                  <span className="px-3 py-1 bg-surface-container-highest border border-outline-variant text-secondary-fixed-dim font-label-sm text-label-sm">
                    CLOUD: HYBRID_MESH
                  </span>
                  <span className="px-3 py-1 bg-surface-container-highest border border-outline-variant text-tertiary-fixed font-label-sm text-label-sm">
                    STATUS: STABLE
                  </span>
                </div>
              </div>
            </GlassCard>
          </RevealSection>

          {/* Project 2 */}
          <RevealSection delay={0.2} className="md:col-span-5">
            <GlassCard className="rounded-xl overflow-hidden h-full flex flex-col" interactive>
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  alt="Blockchain network"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-50"
                  src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              </div>
              <div className="p-8 mt-auto">
                <h3 className="font-headline-md text-headline-md text-secondary-fixed-dim mb-2 uppercase glitch-hover inline-block">
                  CRYPT_SHELL_V1
                </h3>
                <SyncBar className="mb-4" />
                <p className="font-body-md text-on-surface-variant mb-4">
                  Encrypted kernel for secure environment operations with quantum-resistant protocols.
                </p>
                <div className="space-y-2">
                  <div className="h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-secondary-container w-[88%]" style={{ animation: 'shimmer-bar 2s infinite' }} />
                  </div>
                  <div className="flex justify-between font-label-sm text-label-sm text-outline">
                    <span>ENCRYPTION_STRENGTH</span>
                    <span>88%</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </RevealSection>

          {/* Project 3 */}
          <RevealSection delay={0.3} className="md:col-span-5">
            <GlassCard className="rounded-xl p-8 h-full relative overflow-hidden" interactive>
              <div className="flex items-start justify-between mb-6">
                <span className="material-symbols-outlined text-4xl text-primary-fixed-dim">monitoring</span>
                <div className="flex flex-col items-end">
                  <span className="font-label-sm text-label-sm text-outline">LATENCY</span>
                  <span className="text-primary-fixed font-bold">2.4ms</span>
                </div>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary-fixed mb-2 uppercase glitch-hover inline-block">
                SYNC_ENGINE
              </h3>
              <SyncBar className="mb-4" />
              <p className="font-body-md text-on-surface-variant mb-6">
                Real-time state synchronization across distributed clusters with conflict-free resolution.
              </p>
              <div className="border-t border-outline-variant/50 pt-4 flex gap-4">
                <span className="material-symbols-outlined text-outline">cloud_done</span>
                <span className="material-symbols-outlined text-outline">hub</span>
                <span className="material-symbols-outlined text-outline">dns</span>
              </div>
            </GlassCard>
          </RevealSection>

          {/* Project 4 */}
          <RevealSection delay={0.4} className="md:col-span-7">
            <GlassCard className="rounded-xl overflow-hidden flex flex-col md:flex-row relative" interactive>
              <div className="md:w-2/5 relative overflow-hidden min-h-[200px]">
                <img
                  alt="Orbital satellite view"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&q=80"
                />
                <div className="absolute inset-0 bg-primary-container/10" />
              </div>
              <div className="md:w-3/5 p-8 flex flex-col justify-center">
                <div className="font-label-sm text-label-sm text-tertiary-fixed mb-2 uppercase tracking-widest">
                  SUB_SYSTEM_ACTIVE
                </div>
                <h3 className="font-headline-lg text-headline-lg text-white mb-2 uppercase glitch-hover inline-block">
                  ORBITAL_FRAME
                </h3>
                <SyncBar className="mb-5" />
                <p className="font-body-md text-on-surface-variant mb-5">
                  Micro-satellite telemetry management and high-frequency orbital communication framework.
                </p>
                <div className="flex gap-3">
                  <button onClick={() => navigate('/core')} className="bg-primary-fixed-dim text-on-primary px-5 py-2 font-bold uppercase tracking-widest font-label-sm text-label-sm hover:shadow-[0_0_20px_rgba(0,219,231,0.5)] transition-all rounded">
                    ACCESS_CORE
                  </button>
                  <button onClick={() => navigate('/protocol-docs')} className="border border-primary-fixed text-primary-fixed px-5 py-2 font-bold uppercase tracking-widest font-label-sm text-label-sm hover:bg-primary-fixed/10 transition-all rounded">
                    PROTOCOL_DOCS
                  </button>
                </div>
              </div>
            </GlassCard>
          </RevealSection>
        </div>
      </div>
    </section>
  )
}
