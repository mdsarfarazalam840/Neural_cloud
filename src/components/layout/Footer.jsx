import { useLiveStreams } from '../../hooks/useLiveStreams'

export default function Footer() {
  const streams = useLiveStreams()

  return (
    <footer className="relative z-10 border-t border-primary-fixed/20 bg-background/90 backdrop-blur-md">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-5 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="status-dot">
              <div className="core" />
              <div className="ring" />
            </div>
            <span className="font-label-sm text-label-sm text-secondary-fixed-dim uppercase tracking-widest">
              SYSTEM_ONLINE
            </span>
          </div>
          <div className="hidden md:flex gap-5 border-l border-white/10 pl-6">
            <span className="font-body-md text-body-md text-outline">TX: {streams.tx}</span>
            <span className="font-body-md text-body-md text-outline">MEM: {streams.mem}</span>
            <span className="font-body-md text-body-md text-outline">TEMP: {streams.temp}</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-3">
            <span className="font-label-sm text-label-sm text-primary-fixed">CORE_OS</span>
            <div className="w-24 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-primary-fixed w-[65%]" />
            </div>
          </div>
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest">
            &copy; 2026 SYSTEM_OS
          </span>
        </div>
      </div>
    </footer>
  )
}
