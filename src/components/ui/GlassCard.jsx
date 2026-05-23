import { useRef, useEffect } from 'react'

export default function GlassCard({ className = '', children, interactive, ...props }) {
  const cardRef = useRef(null)
  const rafRef = useRef(null)
  const stateRef = useRef({ tx: 0, ty: 0, cx: 0, cy: 0 })

  useEffect(() => {
    const card = cardRef.current
    if (!card || !interactive) return

    const onMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      stateRef.current.tx = (rect.height / 2 - y) / 20
      stateRef.current.ty = (x - rect.width / 2) / 20
      if (!rafRef.current) {
        const loop = () => {
          const s = stateRef.current
          s.cx += (s.tx - s.cx) * 0.1
          s.cy += (s.ty - s.cy) * 0.1
          card.style.transform = `perspective(1000px) rotateX(${s.cx}deg) rotateY(${s.cy}deg) scale3d(1.015, 1.015, 1.015)`
          rafRef.current = requestAnimationFrame(loop)
        }
        rafRef.current = requestAnimationFrame(loop)
      }
    }

    const onLeave = () => {
      stateRef.current.tx = 0
      stateRef.current.ty = 0
      setTimeout(() => {
        if (stateRef.current.tx === 0 && stateRef.current.ty === 0) {
          cancelAnimationFrame(rafRef.current)
          rafRef.current = null
          card.style.transform = ''
        }
      }, 400)
    }

    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [interactive])

  const interactiveClass = interactive ? 'interactive-card' : ''

  return (
    <div
      ref={cardRef}
      className={`glass-card ${interactiveClass} ${className}`}
      {...props}
    >
      <div className="shimmer-overlay" />
      {children}
    </div>
  )
}
