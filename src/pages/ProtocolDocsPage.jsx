import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
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

const layers = [
  {
    name: 'PHYSICAL',
    layer: 'LAYER_01',
    icon: 'cable',
    color: 'text-primary-fixed-dim',
    specs: [
      { label: 'MEDIUM', value: 'FIBER_OPTIC / RF' },
      { label: 'FREQUENCY', value: '190 THz / 2.4 GHz' },
      { label: 'BIT_RATE', value: '400 Gbps' },
      { label: 'ENCODING', value: 'QAM-256 / NRZ' },
    ],
  },
  {
    name: 'DATA_LINK',
    layer: 'LAYER_02',
    icon: 'lan',
    color: 'text-secondary-fixed-dim',
    specs: [
      { label: 'FRAME_SIZE', value: '1518 / 9000 MTU' },
      { label: 'MAC_PROTOCOL', value: 'IEEE 802.3' },
      { label: 'ERROR_CHECK', value: 'CRC-32 / FEC' },
      { label: 'FLOW_CTRL', value: '802.3x PAUSE' },
    ],
  },
  {
    name: 'NETWORK',
    layer: 'LAYER_03',
    icon: 'routing',
    color: 'text-primary-fixed-dim',
    specs: [
      { label: 'PROTOCOL', value: 'IPv6 / QUANTUM' },
      { label: 'ROUTING', value: 'OSPF / BGP-4' },
      { label: 'QOS', value: 'DSCP / CoS' },
      { label: 'FRAGMENT', value: 'PMTUDv6' },
    ],
  },
  {
    name: 'TRANSPORT',
    layer: 'LAYER_04',
    icon: 'swap_vert',
    color: 'text-secondary-fixed-dim',
    specs: [
      { label: 'PROTOCOL', value: 'QUIC / TCP' },
      { label: 'CONGESTION', value: 'BBR3 / CUBIC' },
      { label: 'HANDSHAKE', value: '0-RTT / 3-WAY' },
      { label: 'WINDOW_SIZE', value: '16 MB' },
    ],
  },
  {
    name: 'APPLICATION',
    layer: 'LAYER_05',
    icon: 'api',
    color: 'text-primary-fixed-dim',
    specs: [
      { label: 'API_STYLE', value: 'gRPC / REST' },
      { label: 'SERIALIZATION', value: 'Protobuf / JSON' },
      { label: 'AUTH', value: 'mTLS / JWT' },
      { label: 'RATE_LIMIT', value: '100K req/s' },
    ],
  },
]

const endpoints = [
  { method: 'GET', path: '/api/v4/nodes', description: 'List all active cluster nodes', auth: 'AUTH_REQUIRED' },
  { method: 'POST', path: '/api/v4/transmit', description: 'Transmit encrypted data payload', auth: 'AUTH_REQUIRED' },
  { method: 'GET', path: '/api/v4/status', description: 'Return system health metrics', auth: 'PUBLIC' },
  { method: 'PUT', path: '/api/v4/config', description: 'Update runtime configuration', auth: 'ADMIN_ONLY' },
]

export default function ProtocolDocsPage() {
  const navigate = useNavigate()

  return (
    <>
      <section id="protocol-docs" className="relative min-h-[55vh] flex items-center justify-center overflow-hidden pt-28">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="inline-flex items-center gap-3 glass-card px-5 py-2 mb-6 rounded-full border border-primary-fixed/20"
            style={{ animation: 'fadeUp 0.8s 0.3s both ease-out' }}>
            <StatusDot rings={2} />
            <span className="font-label-sm text-label-sm text-primary-fixed tracking-[0.3em] uppercase">
              PROTOCOL_DOCS v4.0 // TECHNICAL_SPECIFICATION
            </span>
          </div>
          <h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-primary-fixed mb-5 tracking-tighter leading-none"
            style={{ animation: 'fadeUp 0.8s 0.5s both ease-out' }}>
            PROTOCOL<span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] glow-pulse">_STACK</span>
            <br />
            <span className="text-headline-lg font-headline-lg text-on-surface-variant">LAYER_ARCHITECTURE &amp; API_REFERENCE</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-xl mx-auto"
            style={{ animation: 'fadeUp 0.8s 0.7s both ease-out' }}>
            Full protocol stack documentation with layer specifications and public API endpoint reference.
          </p>
          <div style={{ animation: 'fadeUp 0.8s 0.9s both ease-out' }}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/')}
              className="cyber-button px-8 py-3 border border-primary-fixed-dim/30 text-primary-fixed-dim font-body-md font-medium rounded backdrop-blur-md hover:bg-primary-fixed/10"
            >
              &larr; RETURN_TO_CONSOLE
            </motion.button>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest/20">
        <div className="max-w-container-max mx-auto">
          <RevealSection delay={0}>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 bg-primary-fixed-dim rounded-full" />
                <span className="font-label-sm text-label-sm text-primary-fixed tracking-[0.3em] uppercase">// PROTOCOL_LAYERS</span>
              </div>
              <h2 className="font-display-xl-mobile md:text-headline-lg text-headline-lg text-white">
                OSI_STACK_v4
              </h2>
              <p className="font-body-md text-on-surface-variant mt-4 max-w-2xl mx-auto">
                Five-layer protocol architecture optimized for low-latency quantum-routed communication.
              </p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {layers.map((layer, i) => (
              <RevealSection key={layer.name} delay={0.1 + i * 0.1}>
                <GlassCard className="rounded-xl p-8 relative overflow-hidden h-full" interactive>
                  <div className={`absolute top-0 right-0 p-6 opacity-[0.04] ${layer.color}`}>
                    <span className="material-symbols-outlined text-[6rem]">{layer.icon}</span>
                  </div>
                  <div className="relative z-10">
                    <div className={`font-label-sm mb-2 tracking-widest uppercase ${layer.color}`}>{layer.layer}</div>
                    <h3 className="font-headline-md text-headline-md text-white mb-6">{layer.name}</h3>
                    <div className="space-y-3">
                      {layer.specs.map((s) => (
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
                <span className="font-label-sm text-label-sm text-secondary-fixed-dim tracking-[0.3em] uppercase">// API_ENDPOINTS</span>
              </div>
              <h2 className="font-display-xl-mobile md:text-headline-lg text-headline-lg text-white">
                PUBLIC_API_REFERENCE
              </h2>
            </div>
          </RevealSection>

          <div className="space-y-gutter">
            {endpoints.map((ep, i) => (
              <RevealSection key={ep.path} delay={0.1 + i * 0.1}>
                <GlassCard className="rounded-xl p-6 relative overflow-hidden" interactive>
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <span className={`font-label-sm text-label-sm px-3 py-1 rounded font-bold uppercase tracking-wider ${
                      ep.method === 'GET' ? 'text-primary-fixed bg-primary-fixed/10 border border-primary-fixed/30' :
                      ep.method === 'POST' ? 'text-secondary-fixed-dim bg-secondary-fixed-dim/10 border border-secondary-fixed-dim/30' :
                      'text-tertiary-fixed bg-tertiary-fixed/10 border border-tertiary-fixed/30'
                    }`}>
                      {ep.method}
                    </span>
                    <code className="font-body-md text-body-md text-primary-fixed-dim font-mono flex-1">{ep.path}</code>
                    <span className="font-body-md text-body-md text-on-surface-variant flex-1">{ep.description}</span>
                    <span className={`font-label-sm text-label-sm px-2 py-0.5 rounded ${
                      ep.auth === 'PUBLIC' ? 'text-primary-fixed border border-primary-fixed/30' :
                      ep.auth === 'AUTH_REQUIRED' ? 'text-secondary-fixed-dim border border-secondary-fixed-dim/30' :
                      'text-tertiary-fixed border border-tertiary-fixed/30'
                    }`}>
                      {ep.auth}
                    </span>
                  </div>
                </GlassCard>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 px-margin-mobile md:px-margin-desktop border-t border-white/5 bg-background/40 backdrop-blur-sm">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <StatusDot rings={2} />
            <span className="font-label-sm text-label-sm text-primary-fixed tracking-[0.3em] uppercase">DOCS_ACTIVE // v4.0</span>
          </div>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/')}
              className="cyber-button px-8 py-3 border border-primary-fixed-dim/30 text-primary-fixed-dim font-body-md font-medium rounded backdrop-blur-md hover:bg-primary-fixed/10"
            >
              CONSOLE
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/core')}
              className="cyber-button px-8 py-3 bg-primary-fixed-dim text-on-primary font-body-md font-bold rounded uppercase tracking-widest"
            >
              ACCESS_CORE
            </motion.button>
          </div>
        </div>
      </section>
    </>
  )
}
