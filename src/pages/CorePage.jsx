import { useNavigate } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import GlassCard from '../components/ui/GlassCard'
import StatusDot from '../components/ui/StatusDot'
import SyncBar from '../components/ui/SyncBar'

function RevealSection({ delay, children, className = '' }) {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  )
}

const modules = [
  {
    name: 'PROCESS_SCHEDULER',
    type: 'KERNEL_MODULE_01',
    icon: 'processor_architecture',
    color: 'text-primary-fixed-dim',
    specs: [
      { label: 'ALGORITHM', value: 'O(1) / CFS' },
      { label: 'PRIORITY_RANGE', value: '0–139' },
      { label: 'CONTEXT_SWITCH', value: '0.8 µs' },
      { label: 'MAX_THREADS', value: '65,535' },
    ],
  },
  {
    name: 'MEMORY_MANAGER',
    type: 'KERNEL_MODULE_02',
    icon: 'memory',
    color: 'text-secondary-fixed-dim',
    specs: [
      { label: 'PAGING', value: '4-level / 5-level' },
      { label: 'ALLOCATOR', value: 'SLAB + BUDDY' },
      { label: 'VIRTUAL_MEM', value: '48-bit' },
      { label: 'CACHE_LINE', value: '64 B' },
    ],
  },
  {
    name: 'IPC_BUS',
    type: 'KERNEL_MODULE_03',
    icon: 'hub',
    color: 'text-primary-fixed-dim',
    specs: [
      { label: 'PROTOCOL', value: 'QUANTUM_GRPC' },
      { label: 'LATENCY', value: '1.2 µs' },
      { label: 'THROUGHPUT', value: '12 GB/s' },
      { label: 'BUFFER_DEPTH', value: '512 MSG' },
    ],
  },
  {
    name: 'FILE_SYSTEM',
    type: 'KERNEL_MODULE_04',
    icon: 'folder_data',
    color: 'text-secondary-fixed-dim',
    specs: [
      { label: 'FORMAT', value: 'EXT4 / BTRFS' },
      { label: 'ENCRYPTION', value: 'AES-256-XTS' },
      { label: 'MAX_VOLUME', value: '16 EB' },
      { label: 'JOURNAL', value: 'WRITE_AHEAD' },
    ],
  },
]

export default function CorePage() {
  const navigate = useNavigate()

  return (
    <>
      <section id="core" className="relative min-h-[55vh] flex items-center justify-center overflow-hidden pt-28">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="inline-flex items-center gap-3 glass-card px-5 py-2 mb-6 rounded-full border border-primary-fixed/20"
            style={{ animation: 'fadeUp 0.8s 0.3s both ease-out' }}>
            <StatusDot rings={2} />
            <span className="font-label-sm text-label-sm text-primary-fixed tracking-[0.3em] uppercase">
              CORE_SYSTEM v4.0 // KERNEL_ACCESS
            </span>
          </div>
          <h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-primary-fixed mb-5 tracking-tighter leading-none"
            style={{ animation: 'fadeUp 0.8s 0.5s both ease-out' }}>
            SYSTEM<span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] glow-pulse">_KERNEL</span>
            <br />
            <span className="text-headline-lg font-headline-lg text-on-surface-variant">CORE_MODULES &amp; SPECIFICATIONS</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-xl mx-auto"
            style={{ animation: 'fadeUp 0.8s 0.7s both ease-out' }}>
            Low-level kernel architecture with real-time module interaction and hardware abstraction layer.
          </p>
          <div style={{ animation: 'fadeUp 0.8s 0.9s both ease-out' }}>
            <button onClick={() => navigate('/')} className="cyber-button px-8 py-3 border border-primary-fixed-dim/30 text-primary-fixed-dim font-body-md font-medium rounded backdrop-blur-md hover:bg-primary-fixed/10">
              &larr; RETURN_TO_CONSOLE
            </button>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest/20">
        <div className="max-w-container-max mx-auto">
          <RevealSection delay={0}>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 bg-primary-fixed-dim rounded-full" />
                <span className="font-label-sm text-label-sm text-primary-fixed tracking-[0.3em] uppercase">// KERNEL_MODULES</span>
              </div>
              <h2 className="font-display-xl-mobile md:text-headline-lg text-headline-lg text-white">
                CORE_ARCHITECTURE
              </h2>
              <p className="font-body-md text-on-surface-variant mt-4 max-w-2xl mx-auto">
                Four primary kernel modules governing process scheduling, memory management, inter-process communication, and persistent storage.
              </p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {modules.map((mod, i) => (
              <RevealSection key={mod.name} delay={0.1 + i * 0.1}>
                <GlassCard className="rounded-xl p-8 relative overflow-hidden h-full" interactive>
                  <div className={`absolute top-0 right-0 p-6 opacity-[0.04] ${mod.color}`}>
                    <span className="material-symbols-outlined text-[6rem]">{mod.icon}</span>
                  </div>
                  <div className="relative z-10">
                    <div className={`font-label-sm mb-2 tracking-widest uppercase ${mod.color}`}>{mod.type}</div>
                    <h3 className="font-headline-md text-headline-md text-white mb-6">{mod.name}</h3>
                    <div className="space-y-3">
                      {mod.specs.map((s) => (
                        <div key={s.label} className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className="font-label-sm text-label-sm text-outline">{s.label}</span>
                          <span className="font-body-md text-body-md text-primary-fixed font-bold">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-24 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <RevealSection delay={0}>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 bg-secondary-fixed-dim rounded-full" />
                <span className="font-label-sm text-label-sm text-secondary-fixed-dim tracking-[0.3em] uppercase">// SYSTEM_SPECS</span>
              </div>
              <h2 className="font-display-xl-mobile md:text-headline-lg text-headline-lg text-white">
                TECHNICAL_SPECIFICATION
              </h2>
            </div>
          </RevealSection>

          <RevealSection delay={0.1}>
            <GlassCard className="rounded-xl p-8 md:p-10 relative overflow-hidden" interactive>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'WORD_SIZE', value: '64-bit', sub: 'ARMv9 / x86-64' },
                  { label: 'KERNEL_TYPE', value: 'HYBRID_MICRO', sub: 'Modular + Monolithic' },
                  { label: 'MAX_MEMORY', value: '256 TB', sub: '48-bit virtual address' },
                  { label: 'SMP_CPUS', value: '8192', sub: 'NUMA-aware topology' },
                ].map((spec) => (
                  <div key={spec.label} className="text-center p-4 border border-white/5 rounded-lg">
                    <div className="font-label-sm text-label-sm text-outline mb-1">{spec.label}</div>
                    <div className="font-headline-md text-headline-md text-primary-fixed-dim mb-1">{spec.value}</div>
                    <div className="font-body-md text-body-md text-on-surface-variant">{spec.sub}</div>
                  </div>
                ))}
              </div>
              <SyncBar className="mt-6" />
            </GlassCard>
          </RevealSection>
        </div>
      </section>

      <section className="relative z-10 py-16 px-margin-mobile md:px-margin-desktop border-t border-white/5 bg-background/40 backdrop-blur-sm">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <StatusDot rings={2} />
            <span className="font-label-sm text-label-sm text-primary-fixed tracking-[0.3em] uppercase">CORE_ACTIVE // v4.0</span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => navigate('/')} className="cyber-button px-8 py-3 border border-primary-fixed-dim/30 text-primary-fixed-dim font-body-md font-medium rounded backdrop-blur-md hover:bg-primary-fixed/10">
              CONSOLE
            </button>
            <button onClick={() => navigate('/protocol-docs')} className="cyber-button px-8 py-3 bg-primary-fixed-dim text-on-primary font-body-md font-bold rounded uppercase tracking-widest">
              PROTOCOL_DOCS
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
