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

function FlowArrow() {
  return (
    <div className="flex items-center justify-center py-4 md:py-0">
      <div className="flex flex-col items-center gap-1">
        <div className="h-8 w-0.5 bg-gradient-to-b from-primary-fixed-dim/60 to-primary-fixed-dim/20" />
        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-primary-fixed-dim/60" />
      </div>
    </div>
  )
}

function PipelineStage({ title, subtitle, metrics, icon, delay }) {
  return (
    <RevealSection delay={delay} className="flex-1">
      <GlassCard className="rounded-xl p-8 h-full relative overflow-hidden" interactive>
        <div className="absolute top-0 right-0 p-6 opacity-[0.04]">
          <span className="material-symbols-outlined text-[6rem]">{icon}</span>
        </div>
        <div className="relative z-10">
          <div className="text-primary-fixed-dim font-label-sm mb-2 tracking-widest uppercase">{subtitle}</div>
          <h3 className="font-headline-md text-headline-md text-white mb-5">{title}</h3>
          <div className="space-y-3">
            {metrics.map((m, i) => (
              <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="font-label-sm text-label-sm text-outline">{m.label}</span>
                <span className="font-body-md text-body-md text-primary-fixed font-bold">{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </RevealSection>
  )
}

function RouteCard({ name, status, hops, latency, path, delay }) {
  return (
    <RevealSection delay={delay} className="md:col-span-6 lg:col-span-4">
      <GlassCard className="rounded-xl p-6 h-full relative overflow-hidden" interactive>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-headline-md text-headline-md text-primary-fixed-dim uppercase tracking-tight">{name}</h3>
          <span className={`font-label-sm text-label-sm px-2 py-0.5 border rounded ${status === 'ACTIVE' ? 'text-primary-fixed border-primary-fixed/40 bg-primary-fixed/10' : 'text-outline border-outline/40'}`}>
            {status}
          </span>
        </div>
        <div className="flex items-center gap-2 mb-4 overflow-hidden">
          {path.map((node, i) => (
            <span key={i} className="flex items-center gap-1 text-xs">
              <span className="w-2 h-2 rounded-full bg-primary-fixed-dim/60 shrink-0" />
              <span className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">{node}</span>
              {i < path.length - 1 && <span className="text-outline/40 mx-0.5">&rarr;</span>}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5">
          <div>
            <div className="font-label-sm text-label-sm text-outline">HOPS</div>
            <div className="font-body-md text-body-md text-white font-bold">{hops}</div>
          </div>
          <div>
            <div className="font-label-sm text-label-sm text-outline">LATENCY</div>
            <div className="font-body-md text-body-md text-primary-fixed-dim font-bold">{latency}</div>
          </div>
        </div>
      </GlassCard>
    </RevealSection>
  )
}

function StateCard({ name, transitions, active, delay }) {
  return (
    <RevealSection delay={delay} className="md:col-span-4">
      <GlassCard className="rounded-xl p-6 h-full relative overflow-hidden" interactive>
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-2.5 h-2.5 rounded-full ${active ? 'bg-primary-fixed-dim' : 'bg-outline/40'}`} />
          <h3 className="font-headline-md text-headline-md text-white">{name}</h3>
        </div>
        <div className="space-y-2">
          {transitions.map((t, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span className="font-label-sm text-label-sm text-outline w-16 shrink-0">{t.event}</span>
              <span className="text-outline/40">&rarr;</span>
              <span className="font-body-md text-body-md text-primary-fixed">{t.target}</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant ml-auto">{t.condition}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </RevealSection>
  )
}

export default function SchematicsPage() {
  const navigate = useNavigate()

  return (
    <>
      <section id="schematics" className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-28">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="inline-flex items-center gap-3 glass-card px-5 py-2 mb-6 rounded-full border border-primary-fixed/20"
            style={{ animation: 'fadeUp 0.8s 0.3s both ease-out' }}>
            <StatusDot rings={2} />
            <span className="font-label-sm text-label-sm text-primary-fixed tracking-[0.3em] uppercase">
              SYSTEM_SCHEMATICS v4.0 // PIPELINE_VISUALIZATION
            </span>
          </div>
          <h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-primary-fixed mb-5 tracking-tighter leading-none"
            style={{ animation: 'fadeUp 0.8s 0.5s both ease-out' }}>
            PROCESS<span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] glow-pulse">_FLOW</span>
            <br />
            <span className="text-headline-lg font-headline-lg text-on-surface-variant">ARCHITECTURE &amp; ROUTING</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-xl mx-auto"
            style={{ animation: 'fadeUp 0.8s 0.7s both ease-out' }}>
            End-to-end pipeline visualization with real-time signal routing and protocol state transitions.
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
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 bg-primary-fixed-dim rounded-full" />
                <span className="font-label-sm text-label-sm text-primary-fixed tracking-[0.3em] uppercase">// DATA_PIPELINES</span>
              </div>
              <h2 className="font-display-xl-mobile md:text-headline-lg text-headline-lg text-white">
                INGRESS &rarr; PROCESS &rarr; EGRESS
              </h2>
              <p className="font-body-md text-on-surface-variant mt-4 max-w-2xl mx-auto">
                Three-stage data pipeline showing throughput, compression, and routing metrics at each phase.
              </p>
            </div>
          </RevealSection>

          <div className="flex flex-col md:flex-row items-stretch gap-0 md:gap-4">
            <PipelineStage
              title="INGESTION_NODE"
              subtitle="STAGE_01 // ENTRY"
              icon="input"
              delay={0.1}
              metrics={[
                { label: 'THROUGHPUT', value: '4.8 TB/S' },
                { label: 'PROTOCOL', value: 'QUANTUM_GRPC' },
                { label: 'VALIDATION', value: 'HASH_CHECK' },
                { label: 'BUFFER', value: '256 GB' },
              ]}
            />
            <FlowArrow />
            <PipelineStage
              title="PROCESSING_CORE"
              subtitle="STAGE_02 // TRANSFORM"
              icon="memory"
              delay={0.2}
              metrics={[
                { label: 'COMPRESSION', value: '62% RATIO' },
                { label: 'ENCRYPTION', value: 'AES-512' },
                { label: 'LATENCY', value: '14ms AVG' },
                { label: 'PARALLEL', value: '128 THREADS' },
              ]}
            />
            <FlowArrow />
            <PipelineStage
              title="EGRESS_ROUTER"
              subtitle="STAGE_03 // DELIVERY"
              icon="output"
              delay={0.3}
              metrics={[
                { label: 'BANDWIDTH', value: '12.4 TB/S' },
                { label: 'ROUTES', value: '16 ACTIVE' },
                { label: 'RETRANSMIT', value: '0.02%' },
                { label: 'JITTER', value: '&lt;1ms' },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="relative z-10 py-24 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <RevealSection delay={0}>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 bg-secondary-fixed-dim rounded-full" />
                <span className="font-label-sm text-label-sm text-secondary-fixed-dim tracking-[0.3em] uppercase">// SIGNAL_ROUTING</span>
              </div>
              <h2 className="font-display-xl-mobile md:text-headline-lg text-headline-lg text-white">
                PATH_OPTIMIZATION
              </h2>
              <p className="font-body-md text-on-surface-variant mt-4 max-w-2xl mx-auto">
                Real-time signal routing across the distributed mesh with latency-optimized path selection.
              </p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <RouteCard
              name="PRIMARY_MESH"
              status="ACTIVE"
              delay={0.1}
              hops={3}
              latency="4ms"
              path={['NODE_01', 'NODE_04', 'NODE_12', 'NODE_07']}
            />
            <RouteCard
              name="BACKUP_CHANNEL"
              status="STANDBY"
              delay={0.15}
              hops={5}
              latency="11ms"
              path={['NODE_01', 'NODE_03', 'NODE_08', 'NODE_14', 'NODE_09', 'NODE_07']}
            />
            <RouteCard
              name="PEER_LINK_ALPHA"
              status="ACTIVE"
              delay={0.2}
              hops={2}
              latency="2ms"
              path={['NODE_01', 'NODE_06', 'NODE_07']}
            />
            <RouteCard
              name="GEO_RELAY_ASIA"
              status="ACTIVE"
              delay={0.25}
              hops={4}
              latency="22ms"
              path={['NODE_01', 'NODE_11', 'NODE_22', 'NODE_31', 'NODE_45']}
            />
            <RouteCard
              name="GEO_RELAY_EUROPE"
              status="STANDBY"
              delay={0.3}
              hops={4}
              latency="18ms"
              path={['NODE_01', 'NODE_05', 'NODE_15', 'NODE_23', 'NODE_33']}
            />
            <RouteCard
              name="DIRECT_SATELLITE"
              status="ACTIVE"
              delay={0.35}
              hops={1}
              latency="120ms"
              path={['NODE_01', 'SAT_ORBIT', 'NODE_07']}
            />
          </div>
        </div>
      </section>

      <section className="relative z-10 py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest/20">
        <div className="max-w-container-max mx-auto">
          <RevealSection delay={0}>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 bg-tertiary-fixed rounded-full" />
                <span className="font-label-sm text-label-sm text-tertiary-fixed tracking-[0.3em] uppercase">// PROTOCOL_STATE_MACHINES</span>
              </div>
              <h2 className="font-display-xl-mobile md:text-headline-lg text-headline-lg text-white">
                STATE_TRANSITION
              </h2>
              <p className="font-body-md text-on-surface-variant mt-4 max-w-2xl mx-auto">
                Protocol-level state machines governing connection lifecycle and data integrity verification.
              </p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <StateCard
              name="CONNECTION"
              active
              delay={0.1}
              transitions={[
                { event: 'SYN_SENT', target: 'ESTABLISHED', condition: 'ACK_RCVD' },
                { event: 'TIMEOUT', target: 'RETRY_BACKOFF', condition: '3_ATTEMPTS' },
                { event: 'RST_RCVD', target: 'CLOSED', condition: 'IMMEDIATE' },
              ]}
            />
            <StateCard
              name="AUTHENTICATION"
              active
              delay={0.2}
              transitions={[
                { event: 'TOKEN_VALID', target: 'AUTHORIZED', condition: 'JWT_VERIFIED' },
                { event: 'TOKEN_EXPIRED', target: 'REFRESH', condition: 'RENEWAL' },
                { event: 'INVALID', target: 'BLOCKED', condition: 'LOG_ALERT' },
              ]}
            />
            <StateCard
              name="DATA_SYNC"
              active={false}
              delay={0.3}
              transitions={[
                { event: 'CHECKSUM_OK', target: 'COMMITTED', condition: 'CONSENSUS' },
                { event: 'CHECKSUM_ERR', target: 'ROLLBACK', condition: 'SNAPSHOT' },
                { event: 'NODE_OFFLINE', target: 'QUEUED', condition: 'RETRY_TTL' },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="relative z-10 py-24 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <RevealSection delay={0}>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 bg-primary-fixed-dim rounded-full" />
                <span className="font-label-sm text-label-sm text-primary-fixed tracking-[0.3em] uppercase">// PIPELINE_OVERVIEW</span>
              </div>
              <h2 className="font-display-xl-mobile md:text-headline-lg text-headline-lg text-white">
                END_TO_END_SCHEMATIC
              </h2>
            </div>
          </RevealSection>

          <RevealSection delay={0.1}>
            <GlassCard className="rounded-xl p-8 md:p-12 relative overflow-hidden" interactive>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 items-center">
                {[
                  { label: 'INGEST', icon: 'download', color: 'text-primary-fixed-dim' },
                  { label: 'VALIDATE', icon: 'fact_check', color: 'text-secondary-fixed-dim' },
                  { label: 'PROCESS', icon: 'memory', color: 'text-primary-fixed-dim' },
                  { label: 'ROUTE', icon: 'hub', color: 'text-secondary-fixed-dim' },
                  { label: 'DELIVER', icon: 'cloud_done', color: 'text-primary-fixed-dim' },
                ].map((step, i) => (
                  <span key={i} className="flex flex-col items-center gap-3 text-center relative">
                    <span className={`material-symbols-outlined text-4xl ${step.color}`}>{step.icon}</span>
                    <span className={`font-label-sm text-label-sm ${step.color} uppercase tracking-widest`}>{step.label}</span>
                    {i < 4 && (
                      <span className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-primary-fixed-dim/40 text-lg">&rarr;</span>
                    )}
                  </span>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/5">
                <div className="flex flex-wrap justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <StatusDot />
                    <span className="font-label-sm text-label-sm text-primary-fixed uppercase">PIPELINE_HEALTH: OPTIMAL</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="font-body-md text-body-md text-outline">TOTAL_LATENCY: <span className="text-primary-fixed-dim font-bold">14ms</span></span>
                    <span className="font-body-md text-body-md text-outline">THROUGHPUT: <span className="text-primary-fixed-dim font-bold">12.4 TB/S</span></span>
                  </div>
                </div>
                <SyncBar className="mt-4" />
              </div>
            </GlassCard>
          </RevealSection>
        </div>
      </section>

      <section className="relative z-10 py-16 px-margin-mobile md:px-margin-desktop border-t border-white/5 bg-background/40 backdrop-blur-sm">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <StatusDot rings={2} />
            <span className="font-label-sm text-label-sm text-primary-fixed tracking-[0.3em] uppercase">SCHEMATICS_ACTIVE // v4.0</span>
          </div>
          <button onClick={() => navigate('/')} className="cyber-button px-8 py-3 bg-primary-fixed-dim text-on-primary font-body-md font-bold rounded uppercase tracking-widest">
            RETURN_TO_CONSOLE
          </button>
        </div>
      </section>
    </>
  )
}
