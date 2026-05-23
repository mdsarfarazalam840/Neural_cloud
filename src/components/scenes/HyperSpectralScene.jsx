import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { createSpring } from '../../hooks/useMouseSpring'

function NeuralMesh() {
  const meshRef = useRef(null)
  const glowRef = useRef(null)
  const matRef = useRef(null)
  const glowMatRef = useRef(null)
  const timeRef = useRef(0)
  const hueRef = useRef(0.52)
  const spring = useRef(createSpring(0.008, 0.92))

  useFrame((_, delta) => {
    const s = spring.current
    s.update(delta * 60)

    timeRef.current += delta * 0.3
    hueRef.current += delta * 0.02
    if (hueRef.current > 0.82) hueRef.current = 0.52

    if (meshRef.current) {
      meshRef.current.rotation.x = s.state.y * 0.3 + timeRef.current * 0.1
      meshRef.current.rotation.y = s.state.x * 0.5 + timeRef.current * 0.15
    }
    if (glowRef.current) {
      glowRef.current.rotation.x = -s.state.y * 0.3 + timeRef.current * 0.08
      glowRef.current.rotation.y = -s.state.x * 0.5 + timeRef.current * 0.12
    }

    if (matRef.current) {
      matRef.current.color.setHSL(hueRef.current, 0.8, 0.55)
    }
    if (glowMatRef.current) {
      glowMatRef.current.color.setHSL(hueRef.current + 0.1, 0.7, 0.4)
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial ref={matRef} color="#00dbe7" wireframe transparent opacity={0.2} />
      </mesh>
      <mesh ref={glowRef}>
        <icosahedronGeometry args={[1.3, 0]} />
        <meshBasicMaterial ref={glowMatRef} color="#00dbe7" transparent opacity={0.06} />
      </mesh>
    </group>
  )
}

function CameraController() {
  const { camera } = useThree()
  const spring = useRef(createSpring(0.005, 0.9))
  const origin = useMemo(() => new THREE.Vector3(0, 0, 6), [])

  useFrame((_, delta) => {
    const s = spring.current
    s.update(delta * 60)
    camera.position.x = origin.x + s.state.x * 0.5
    camera.position.y = origin.y + s.state.y * 0.3
    camera.lookAt(0, 0, 0)
  })

  return null
}

function OrbitalRings() {
  const ringsRef = useRef([])
  const matRefs = useRef([])
  const hueOffset = useRef(0)
  const spring = useRef(createSpring(0.003, 0.94))

  const configs = useMemo(() => [
    { radius: 2.4, tube: 0.015, rotX: Math.PI / 3, speed: 0.3, hue: 0 },
    { radius: 3.0, tube: 0.012, rotX: Math.PI / 2, rotY: Math.PI / 4, speed: -0.2, hue: 0.2 },
    { radius: 1.9, tube: 0.01, rotX: Math.PI / 5, rotY: Math.PI / 3, speed: 0.4, hue: 0.35 },
  ], [])

  useFrame((_, delta) => {
    const s = spring.current
    s.update(delta * 60)

    hueOffset.current += delta * 0.02
    ringsRef.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.z += 0.002 * configs[i].speed
        ring.rotation.x += 0.001 * configs[i].speed
        ring.rotation.y += s.state.x * 0.002 * configs[i].speed
      }
    })
    matRefs.current.forEach((mat, i) => {
      if (mat) {
        const h = (0.52 + configs[i].hue + Math.sin(hueOffset.current) * 0.08) % 1
        mat.color.setHSL(h, 0.7, 0.5)
      }
    })
  })

  return (
    <group>
      {configs.map((cfg, i) => (
        <mesh
          key={i}
          ref={(el) => (ringsRef.current[i] = el)}
          rotation-x={cfg.rotX}
          rotation-y={cfg.rotY || 0}
        >
          <torusGeometry args={[cfg.radius, cfg.tube, 16, 80]} />
          <meshBasicMaterial
            ref={(el) => (matRefs.current[i] = el)}
            color="#00dbe7"
            transparent
            opacity={0.12}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

function DataStreamRing() {
  const ref = useRef(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.15
  })
  return (
    <mesh ref={ref} rotation-x={Math.PI / 4} rotation-y={Math.PI / 6}>
      <torusGeometry args={[2.7, 0.008, 8, 100]} />
      <meshBasicMaterial color="#00dbe7" transparent opacity={0.08} side={THREE.DoubleSide} />
    </mesh>
  )
}

function ConstellationParticles({ count = 1200 }) {
  const pointsRef = useRef(null)
  const hueRef = useRef(0)

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const rad = 3 + Math.random() * 5
      pos[i * 3] = rad * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = rad * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = rad * Math.cos(phi)
      const c = new THREE.Color().setHSL(0.52 + Math.random() * 0.15, 0.7, 0.5 + Math.random() * 0.3)
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return { positions: pos, colors: col }
  }, [count])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return g
  }, [positions, colors])

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02
    }
    const colorAttr = geo.attributes.color
    if (colorAttr) {
      hueRef.current += delta * 0.005
      const array = colorAttr.array
      for (let i = 0; i < count; i++) {
        const phase = (positions[i * 3] + positions[i * 3 + 1]) * 0.1
        const pulse = 0.5 + 0.5 * Math.sin(hueRef.current * 2 + phase)
        const h = (0.52 + pulse * 0.15) % 1
        const c = new THREE.Color().setHSL(h, 0.6, 0.4 + pulse * 0.3)
        array[i * 3] += (c.r - array[i * 3]) * 0.02
        array[i * 3 + 1] += (c.g - array[i * 3 + 1]) * 0.02
        array[i * 3 + 2] += (c.b - array[i * 3 + 2]) * 0.02
      }
      colorAttr.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef} geometry={geo}>
      <pointsMaterial
        size={0.03}
        transparent
        opacity={0.6}
        vertexColors
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

export default function HyperSpectralScene() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#050505']} />
        <CameraController />
        <NeuralMesh />
        <OrbitalRings />
        <DataStreamRing />
        <ConstellationParticles />
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={0.4} />
        </EffectComposer>
      </Canvas>
      <div className="hero-vignette" />
    </div>
  )
}
