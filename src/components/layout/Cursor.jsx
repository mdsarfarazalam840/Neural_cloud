import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cyanRef = useRef(null)
  const violetRef = useRef(null)
  const stateRef = useRef({ mx: 0, my: 0, cx: 0, cy: 0, vx: 0, vy: 0 })

  useEffect(() => {
    const cyan = cyanRef.current
    const violet = violetRef.current
    if (!cyan) return

    const s = stateRef.current
    s.cx = window.innerWidth / 2
    s.cy = window.innerHeight / 2
    s.vx = s.cx
    s.vy = s.cy
    s.mx = s.cx
    s.my = s.cy

    const onMouse = (e) => { s.mx = e.clientX; s.my = e.clientY }
    document.addEventListener('mousemove', onMouse)

    document.addEventListener('mousedown', () => {
      cyan.style.width = '22px'
      cyan.style.height = '22px'
      cyan.style.backgroundColor = 'rgba(0,219,231,0.2)'
    })
    document.addEventListener('mouseup', () => {
      cyan.style.width = '32px'
      cyan.style.height = '32px'
      cyan.style.backgroundColor = 'transparent'
    })

    const interactables = document.querySelectorAll('button, a, .glass-card, .interactive-card, .scan-input')
    const onEnter = () => {
      cyan.style.width = '64px'
      cyan.style.height = '64px'
      cyan.style.borderColor = '#ecb2ff'
      cyan.querySelectorAll('.cursor-corner').forEach(c => c.style.borderColor = '#ecb2ff')
    }
    const onLeave = () => {
      cyan.style.width = '32px'
      cyan.style.height = '32px'
      cyan.style.borderColor = 'rgba(0,219,231,0.6)'
      cyan.querySelectorAll('.cursor-corner').forEach(c => c.style.borderColor = '#00dbe7')
    }
    interactables.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    let raf
    const animate = () => {
      s.cx += (s.mx - s.cx) * 0.4
      s.cy += (s.my - s.cy) * 0.4
      s.vx += (s.mx - s.vx) * 0.08
      s.vy += (s.my - s.vy) * 0.08
      cyan.style.left = s.cx + 'px'
      cyan.style.top = s.cy + 'px'
      if (violet) {
        violet.style.left = s.vx + 'px'
        violet.style.top = s.vy + 'px'
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMouse)
      cancelAnimationFrame(raf)
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div id="cursor-cyan" ref={cyanRef}>
        <div className="cursor-corner corner-tl" />
        <div className="cursor-corner corner-tr" />
        <div className="cursor-corner corner-bl" />
        <div className="cursor-corner corner-br" />
        <div className="dot" />
      </div>
      <div id="cursor-violet" ref={violetRef} />
    </>
  )
}
