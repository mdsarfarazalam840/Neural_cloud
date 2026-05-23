import { useEffect, useRef } from 'react'
import { createSpring } from '../../hooks/useMouseSpring'

const codes = ['0', '1', '\u03A3', '\u03BB', '\u03C6', '\u0394', '[]', '{}', '->', ':=', '0x']

export default function CinematicScene() {
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const container = streamRef.current
    if (!container) return
    let streamInterval

    function createStream() {
      for (let i = 0; i < 40; i++) {
        const el = document.createElement('div')
        el.className = 'cinematic-stream'
        el.style.left = Math.random() * 100 + '%'
        el.style.top = '-20%'
        el.style.transition = `top ${15 + Math.random() * 20}s linear`
        el.textContent = codes[Math.floor(Math.random() * codes.length)]
        container.appendChild(el)
        setTimeout(() => { el.style.top = '120%' }, 100)
        el.addEventListener('transitionend', () => el.remove())
      }
    }
    createStream()
    streamInterval = setInterval(createStream, 3000)

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let particles = []
    let w, h

    function resize() {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    resize()

    class Particle {
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * w
        this.y = Math.random() * h
        this.vx = (Math.random() - 0.5) * 0.4
        this.vy = (Math.random() - 0.5) * 0.4
        this.size = Math.random() * 2 + 1
        this.alpha = Math.random() * 0.5 + 0.2
      }
      update(mx, my) {
        this.x += this.vx + mx * 0.03
        this.y += this.vy + my * 0.03
        if (this.x < 0 || this.x > w) this.vx *= -1
        if (this.y < 0 || this.y > h) this.vy *= -1
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 219, 231, ${this.alpha})`
        ctx.fill()
      }
    }

    function initParticles() {
      particles = []
      const count = Math.min(Math.floor(window.innerWidth / 15), 120)
      for (let i = 0; i < count; i++) particles.push(new Particle())
    }
    initParticles()

    const grid = gridRef.current
    const spring = createSpring(0.005, 0.92)

    let raf
    function draw() {
      ctx.clearRect(0, 0, w, h)

      spring.update(1)
      if (grid) {
        grid.style.transform = `translate3d(${spring.state.x * 30}px, ${spring.state.y * 30}px, 0)`
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.update(spring.state.x, spring.state.y)
        p.draw()
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 180) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0, 219, 231, ${(1 - dist / 180) * 0.12})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      clearInterval(streamInterval)
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      container.innerHTML = ''
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" style={{ perspective: '1000px', background: '#050505', willChange: 'transform' }}>
      <div ref={gridRef} className="absolute inset-[-200px] cinematic-grid" />
      <div className="absolute inset-0 cinematic-mesh" />
      <div ref={streamRef} className="absolute inset-0 z-[1] pointer-events-none" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ willChange: 'transform' }}
      />
      <div className="hero-vignette" style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }} />
    </div>
  )
}
