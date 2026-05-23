import StatusDot from '../ui/StatusDot'

export default function MetricsStrip() {
  return (
    <section className="relative z-10 border-y border-white/5 bg-surface-container-lowest/60 backdrop-blur-sm">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-5 flex flex-wrap justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <StatusDot />
          <span className="font-label-sm text-label-sm text-primary-fixed uppercase tracking-widest">SYSTEM_ONLINE</span>
        </div>
        <div className="flex items-center gap-2 font-body-md text-body-md text-on-surface-variant">
          <span className="text-outline text-label-sm">UPTIME</span>
          <span className="text-primary-fixed-dim font-bold">99.97%</span>
        </div>
        <div className="flex items-center gap-2 font-body-md text-body-md text-on-surface-variant">
          <span className="text-outline text-label-sm">NODES</span>
          <span className="text-primary-fixed-dim font-bold">128/128</span>
        </div>
        <div className="flex items-center gap-2 font-body-md text-body-md text-on-surface-variant">
          <span className="text-outline text-label-sm">THROUGHPUT</span>
          <span className="text-primary-fixed-dim font-bold">4.8 TB/S</span>
        </div>
        <div className="flex items-center gap-2 font-body-md text-body-md text-on-surface-variant">
          <span className="text-outline text-label-sm">SIGNAL</span>
          <span className="text-secondary-fixed-dim font-bold">CRYPT_LOCK</span>
        </div>
      </div>
    </section>
  )
}
