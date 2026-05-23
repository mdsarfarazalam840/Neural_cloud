import { useScrollReveal } from '../../hooks/useScrollReveal'
import GlassCard from '../ui/GlassCard'

function RevealSection({ delay, children, className = '' }) {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  )
}

export default function AboutSection() {
  return (
    <section id="about" className="relative z-10 py-28 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <RevealSection delay={0}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-secondary-fixed-dim rounded-full" />
              <span className="font-label-sm text-label-sm text-secondary-fixed-dim tracking-[0.3em] uppercase">
                // SYSTEM_ARCHITECTURE
              </span>
            </div>
            <h2 className="font-display-xl-mobile md:text-headline-lg text-headline-lg text-white">
              CORE_INFRASTRUCTURE
            </h2>
          </div>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <RevealSection delay={0.1} className="md:col-span-2">
            <GlassCard className="rounded-xl p-10 relative overflow-hidden" interactive>
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <span className="material-symbols-outlined text-[8rem]">cloud_done</span>
              </div>
              <div className="relative z-10">
                <div className="text-primary-fixed-dim font-label-sm mb-3 tracking-widest">ARCHITECTURE_01</div>
                <h3 className="font-headline-lg text-headline-lg mb-4 text-white">NEURAL MESH INFRASTRUCTURE</h3>
                <p className="font-body-md text-on-surface-variant max-w-lg">
                  Proprietary cloud fabric engineered for sub-millisecond response across 128 global nodes.
                  Quantum-resistant encryption with real-time data synchronization.
                </p>
                <div className="flex flex-wrap gap-3 mt-8">
                  <span className="px-3 py-1 bg-primary-fixed/10 border border-primary-fixed/20 text-primary-fixed font-label-sm text-label-sm rounded">
                    LATENCY: 14ms
                  </span>
                  <span className="px-3 py-1 bg-secondary-fixed/10 border border-secondary-fixed/20 text-secondary-fixed-dim font-label-sm text-label-sm rounded">
                    ENCRYPTION: AES-512
                  </span>
                  <span className="px-3 py-1 bg-tertiary-fixed/10 border border-tertiary-fixed/20 text-tertiary-fixed font-label-sm text-label-sm rounded">
                    STATUS: STABLE
                  </span>
                </div>
              </div>
            </GlassCard>
          </RevealSection>

          <RevealSection delay={0.2}>
            <GlassCard className="rounded-xl p-10 relative overflow-hidden h-full" interactive>
              <div className="text-secondary-fixed-dim font-label-sm mb-3 tracking-widest">QUANTUM_SECURE</div>
              <h3 className="font-headline-md text-headline-md mb-4 text-white">ENCRYPTED PROTOCOLS</h3>
              <p className="font-body-md text-on-surface-variant mb-8">
                Military-grade encryption with zero-trust architecture and automated threat response.
              </p>
              <div className="flex justify-center">
                <span className="material-symbols-outlined text-secondary-fixed-dim text-6xl">lock_open</span>
              </div>
            </GlassCard>
          </RevealSection>

          <RevealSection delay={0.3}>
            <GlassCard className="rounded-xl p-10 relative overflow-hidden h-full" interactive>
              <div className="text-primary-fixed-dim font-label-sm mb-3 tracking-widest">HUD_VISUALIZATION</div>
              <h3 className="font-headline-md text-headline-md mb-4 text-white">INTERFACE LAYER</h3>
              <p className="font-body-md text-on-surface-variant mb-6">
                Hyper-spectral rendering with real-time telemetry overlay and gesture-based navigation.
              </p>
              <div className="space-y-3">
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-fixed-dim w-full" style={{ animation: 'shimmer-bar 2s infinite' }} />
                </div>
                <div className="h-1.5 w-3/4 bg-white/5 rounded-full" />
                <div className="h-1.5 w-1/2 bg-white/5 rounded-full" />
              </div>
            </GlassCard>
          </RevealSection>

          <RevealSection delay={0.4} className="md:col-span-2">
            <GlassCard className="rounded-xl p-10 relative overflow-hidden" interactive>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="text-primary-fixed-dim font-label-sm mb-3 tracking-widest">INTEGRATION_SYNC</div>
                  <h3 className="font-headline-md text-headline-md mb-4 text-white">SYSTEM_OS INTEGRITY</h3>
                  <p className="font-body-md text-on-surface-variant">
                    Bridging raw hardware performance with hyper-spectral aesthetic clarity through real-time neural processing.
                  </p>
                </div>
                <div className="relative h-44 bg-background/80 rounded-xl border border-white/5 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,219,231,0.1),transparent)]" />
                  <div className="w-24 h-24 border-2 border-dashed border-primary-fixed/30 rounded-full" style={{ animation: 'spin 12s linear infinite' }} />
                  <span className="absolute material-symbols-outlined text-primary-fixed text-4xl">dynamic_form</span>
                </div>
              </div>
            </GlassCard>
          </RevealSection>
        </div>
      </div>
    </section>
  )
}
