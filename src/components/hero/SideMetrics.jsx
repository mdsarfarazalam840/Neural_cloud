export default function SideMetrics() {
  return (
    <>
      {/* Left */}
      <div className="hidden lg:block absolute left-margin-desktop top-1/2 -translate-y-1/2 space-y-12 z-10"
        style={{ animation: 'fadeLeft 0.8s 1.1s both ease-out' }}>
        <div className="flex flex-col gap-2 group">
          <div className="text-outline font-label-sm text-label-sm tracking-widest group-hover:text-primary-fixed transition-colors">
            LATENCY
          </div>
          <div className="text-primary-fixed-dim font-body-md text-headline-md font-bold">
            14<span className="text-body-md text-outline">ms</span>
          </div>
          <div className="w-32 h-[2px] bg-surface-container-highest relative overflow-hidden">
            <div className="absolute inset-0 bg-primary-fixed-dim w-3/4" style={{ animation: 'shimmer-bar 3s ease-in-out infinite' }} />
          </div>
        </div>
        <div className="flex flex-col gap-2 group">
          <div className="text-outline font-label-sm text-label-sm tracking-widest group-hover:text-primary-fixed transition-colors">
            NODE_COUNT
          </div>
          <div className="text-primary-fixed-dim font-body-md text-headline-md font-bold">1,024</div>
          <div className="w-32 h-[2px] bg-surface-container-highest relative overflow-hidden">
            <div className="absolute inset-0 bg-primary-fixed-dim w-1/2" style={{ animation: 'shimmer-bar 4s ease-in-out infinite' }} />
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="hidden lg:block absolute right-margin-desktop top-1/2 -translate-y-1/2 z-10"
        style={{ animation: 'fadeRight 0.8s 1.3s both ease-out' }}>
        <div className="glass-card p-5 rounded-xl border border-primary-fixed/20 hover:scale-105 transition-transform duration-500"
          style={{ backdropFilter: 'blur(12px) saturate(1.2)', background: 'rgba(19,19,19,0.4)', border: '1px solid rgba(0,219,231,0.2)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="status-dot">
              <div className="core" />
              <div className="ring" />
            </div>
            <span className="font-label-sm text-label-sm text-primary-fixed">CORE_LINK_STABLE</span>
          </div>
          <div className="w-44 h-28 bg-background/60 rounded border border-white/5 relative overflow-hidden">
            <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 100 40">
              <path d="M0 30 Q 25 5, 50 25 T 100 10" fill="none" stroke="#00dbe7" strokeWidth="1.5">
                <animate attributeName="d" dur="4s" repeatCount="indefinite"
                  values="M0 30 Q 25 5, 50 25 T 100 10; M0 30 Q 25 25, 50 5 T 100 10; M0 30 Q 25 5, 50 25 T 100 10" />
              </path>
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}
