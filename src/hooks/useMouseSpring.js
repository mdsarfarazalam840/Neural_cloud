let mouseX = 0
let mouseY = 0
let listening = false

export function createSpring(stiffness = 0.008, damping = 0.92) {
  if (!listening) {
    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1
    })
    listening = true
  }

  const state = { x: 0, y: 0, vx: 0, vy: 0 }

  function update(dt) {
    const dx = mouseX - state.x
    const dy = mouseY - state.y
    state.vx += dx * stiffness
    state.vy += dy * stiffness
    state.vx *= damping
    state.vy *= damping
    state.x += state.vx
    state.y += state.vy
  }

  return { state, update }
}
