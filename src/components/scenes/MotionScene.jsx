import { useEffect, useRef } from 'react'
import { createSpring } from '../../hooks/useMouseSpring'

export default function MotionScene() {
  const gridRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const grid = gridRef.current
    const canvas = canvasRef.current
    if (!grid || !canvas) return
    const ctx = canvas.getContext('2d')

    let w, h
    function resize() {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    resize()

    class Particle {
      constructor() {
        this.reset()
      }
      reset() {
        this.x = Math.random() * w
        this.y = Math.random() * h
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.size = Math.random() * 1.5 + 0.5
        this.alpha = Math.random() * 0.4 + 0.15
      }
      update(mx, my) {
        this.x += this.vx + mx * 0.02
        this.y += this.vy + my * 0.02
        if (this.x < 0 || this.x > w) this.vx *= -1
        if (this.y < 0 || this.y > h) this.vy *= -1
      }
    }

    const particles = []
    const count = Math.min(Math.floor(window.innerWidth / 20), 80)
    for (let i = 0; i < count; i++) particles.push(new Particle())

    const spring = createSpring(0.006, 0.91)

    let raf
    function draw() {
      ctx.clearRect(0, 0, w, h)

      spring.update(1)
      grid.style.transform = `translate3d(${spring.state.x * 30}px, ${spring.state.y * 30}px, 0)`

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.update(spring.state.x, spring.state.y)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 219, 231, ${p.alpha})`
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" style={{ background: '#050505', willChange: 'transform' }}>
      <div
        ref={gridRef}
        className="absolute inset-0"
        style={{
          backgroundSize: '60px 60px',
          backgroundImage: `linear-gradient(to right, rgba(0,219,231,0.06) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0,219,231,0.06) 1px, transparent 1px)`,
          willChange: 'transform',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0,219,231,0.1) 0%, transparent 70%)',
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ willChange: 'transform' }}
      />
      <div className="hero-vignette" style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }} />
    </div>
  )
}
