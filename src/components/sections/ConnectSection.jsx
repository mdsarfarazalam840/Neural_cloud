import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function ConnectSection() {
  const ref = useScrollReveal()

  return (
    <section id="connect" className="relative z-10 py-28 px-margin-mobile md:px-margin-desktop bg-background/20 backdrop-blur-[8px]">
      <div ref={ref} className="max-w-2xl mx-auto text-center reveal">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 bg-primary-fixed-dim rounded-full" />
          <span className="font-label-sm text-label-sm text-primary-fixed tracking-[0.3em] uppercase">
            // TRANSMIT_SIGNAL
          </span>
        </div>
        <h2 className="font-display-xl-mobile md:text-headline-lg text-headline-lg text-white mb-6">
          ESTABLISH_CONNECTION
        </h2>
        <p className="font-body-md text-on-surface-variant mb-12">
          Drop a signal. Our systems will decrypt and respond within one quantum cycle.
        </p>

        <form className="space-y-8 text-left" onSubmit={(e) => e.preventDefault()}>
          <div className="scan-input-wrap">
            <input type="text" className="scan-input" placeholder="SIGNAL_IDENTIFIER" autoComplete="off" />
            <div className="scan-line" />
          </div>
          <div className="scan-input-wrap">
            <input type="email" className="scan-input" placeholder="TRANSMIT_FREQUENCY (encrypted)" autoComplete="off" />
            <div className="scan-line" />
          </div>
          <div className="scan-input-wrap">
            <textarea className="scan-input resize-none" rows={3} placeholder="MESSAGE_PAYLOAD..." />
            <div className="scan-line" />
          </div>
          <button type="submit" className="cyber-button w-full py-4 bg-primary-fixed-dim text-on-primary font-body-md font-bold rounded uppercase tracking-widest">
            TRANSMIT_SIGNAL
          </button>
        </form>
      </div>
    </section>
  )
}
