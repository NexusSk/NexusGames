import { useRef, useMemo, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 80
const TRAIL_LENGTH = 60

function TrailParticles() {
  const meshRef = useRef()
  const mouse = useRef(new THREE.Vector2(0, 0))
  const prevMouse = useRef(new THREE.Vector2(0, 0))
  const trail = useRef([])
  const { viewport } = useThree()

  const dummy = useMemo(() => new THREE.Object3D(), [])

  const particles = useMemo(() => {
    const arr = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * viewport.width * 2,
          (Math.random() - 0.5) * viewport.height * 2,
          (Math.random() - 0.5) * 3
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          0
        ),
        scale: Math.random() * 0.5 + 0.1,
        baseScale: Math.random() * 0.5 + 0.1,
        life: Math.random(),
        speed: Math.random() * 0.002 + 0.001,
      })
    }
    return arr
  }, [viewport])

  const trailParticles = useMemo(() => {
    const arr = []
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      arr.push({
        position: new THREE.Vector3(0, 0, 0),
        scale: 0,
        opacity: 0,
        active: false,
      })
    }
    return arr
  }, [])

  const handlePointerMove = useCallback((e) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
  }, [])

  useMemo(() => {
    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [handlePointerMove])

  useFrame((state, delta) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime
    const mouseWorld = new THREE.Vector3(
      mouse.current.x * viewport.width / 2,
      mouse.current.y * viewport.height / 2,
      0
    )

    // Calculate mouse velocity
    const mouseVel = mouse.current.clone().sub(prevMouse.current)
    const mouseSpeed = mouseVel.length()
    prevMouse.current.copy(mouse.current)

    // Update trail
    if (mouseSpeed > 0.001) {
      trail.current.unshift({
        x: mouseWorld.x,
        y: mouseWorld.y,
        time: time
      })
      if (trail.current.length > TRAIL_LENGTH) {
        trail.current.pop()
      }
    }

    // Update trail particles
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const tp = trailParticles[i]
      if (i < trail.current.length) {
        const t = trail.current[i]
        const age = time - t.time
        const fadeOut = Math.max(0, 1 - age * 2)
        tp.position.set(
          t.x + Math.sin(time * 3 + i * 0.3) * 0.05 * fadeOut,
          t.y + Math.cos(time * 3 + i * 0.3) * 0.05 * fadeOut,
          0.1
        )
        tp.scale = fadeOut * (1 - i / trail.current.length) * 0.12
        tp.active = fadeOut > 0.01
      } else {
        tp.scale = 0
        tp.active = false
      }
    }

    // Update ambient floating particles
    const totalCount = PARTICLE_COUNT + TRAIL_LENGTH
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles[i]
      
      // Gentle floating motion
      p.position.x += Math.sin(time * p.speed * 100 + i) * 0.003
      p.position.y += Math.cos(time * p.speed * 100 + i * 0.5) * 0.003
      
      // Mouse attraction
      const dx = mouseWorld.x - p.position.x
      const dy = mouseWorld.y - p.position.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (dist < 3) {
        const force = (1 - dist / 3) * 0.02
        p.position.x += dx * force
        p.position.y += dy * force
        p.scale = p.baseScale * (1 + (1 - dist / 3) * 2)
      } else {
        p.scale += (p.baseScale - p.scale) * 0.05
      }

      // Wrap around
      if (p.position.x > viewport.width) p.position.x = -viewport.width
      if (p.position.x < -viewport.width) p.position.x = viewport.width
      if (p.position.y > viewport.height) p.position.y = -viewport.height
      if (p.position.y < -viewport.height) p.position.y = viewport.height

      dummy.position.copy(p.position)
      const pulse = Math.sin(time * 2 + i) * 0.3 + 0.7
      dummy.scale.setScalar(p.scale * pulse * 0.06)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }

    // Set trail particle matrices
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const tp = trailParticles[i]
      dummy.position.copy(tp.position)
      dummy.scale.setScalar(tp.scale)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(PARTICLE_COUNT + i, dummy.matrix)
    }

    meshRef.current.instanceMatrix.needsUpdate = true
  })

  const totalCount = PARTICLE_COUNT + TRAIL_LENGTH

  return (
    <instancedMesh ref={meshRef} args={[null, null, totalCount]}>
      <circleGeometry args={[1, 16]} />
      <meshBasicMaterial
        color="#00f0ff"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  )
}

function FloatingRing() {
  const ringRef = useRef()
  const mouse = useRef(new THREE.Vector2(0, 0))

  useMemo(() => {
    const handler = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('pointermove', handler)
    return () => window.removeEventListener('pointermove', handler)
  }, [])

  useFrame((state) => {
    if (!ringRef.current) return
    const time = state.clock.elapsedTime
    ringRef.current.rotation.x = Math.sin(time * 0.3) * 0.2 + mouse.current.y * 0.3
    ringRef.current.rotation.y = Math.cos(time * 0.2) * 0.2 + mouse.current.x * 0.3
    ringRef.current.rotation.z = time * 0.1
  })

  return (
    <mesh ref={ringRef} position={[3, 0, -2]}>
      <torusGeometry args={[2, 0.02, 16, 100]} />
      <meshBasicMaterial
        color="#7b2ff7"
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

function SecondRing() {
  const ringRef = useRef()

  useFrame((state) => {
    if (!ringRef.current) return
    const time = state.clock.elapsedTime
    ringRef.current.rotation.x = Math.cos(time * 0.2) * 0.3
    ringRef.current.rotation.y = Math.sin(time * 0.15) * 0.3
    ringRef.current.rotation.z = -time * 0.08
  })

  return (
    <mesh ref={ringRef} position={[-3, 1, -3]}>
      <torusGeometry args={[1.5, 0.015, 16, 80]} />
      <meshBasicMaterial
        color="#ff2d75"
        transparent
        opacity={0.2}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

export default function ParticleTrail() {
  return (
    <div className="cursor-glow">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: false }}
      >
        <TrailParticles />
        <FloatingRing />
        <SecondRing />
      </Canvas>
    </div>
  )
}
