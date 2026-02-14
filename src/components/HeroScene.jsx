import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function GridFloor() {
  const gridRef = useRef()

  useFrame((state) => {
    if (!gridRef.current) return
    gridRef.current.position.z = (state.clock.elapsedTime * 0.5) % 2
  })

  return (
    <group ref={gridRef} position={[0, -2, 0]} rotation={[-Math.PI / 2.5, 0, 0]}>
      <gridHelper
        args={[40, 40, '#1a1a3e', '#1a1a3e']}
      />
    </group>
  )
}

function StarField() {
  const starsRef = useRef()
  const count = 2000

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    return pos
  }, [])

  const sizes = useMemo(() => {
    const s = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      s[i] = Math.random() * 2
    }
    return s
  }, [])

  useFrame((state) => {
    if (!starsRef.current) return
    starsRef.current.rotation.y = state.clock.elapsedTime * 0.02
    starsRef.current.rotation.x = state.clock.elapsedTime * 0.01
  })

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.05}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function GlowingSphere() {
  const sphereRef = useRef()
  const glowRef = useRef()
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
    const time = state.clock.elapsedTime
    if (sphereRef.current) {
      sphereRef.current.position.x = 3 + Math.sin(time * 0.5) * 0.5 + mouse.current.x * 0.5
      sphereRef.current.position.y = 0.5 + Math.cos(time * 0.3) * 0.3 + mouse.current.y * 0.3
      sphereRef.current.rotation.y = time * 0.3
      sphereRef.current.rotation.x = time * 0.2
    }
    if (glowRef.current) {
      glowRef.current.position.copy(sphereRef.current.position)
      const pulse = Math.sin(time * 2) * 0.1 + 1
      glowRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <>
      <mesh ref={sphereRef} position={[3, 0.5, -2]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      <mesh ref={glowRef} position={[3, 0.5, -2]}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial
          color="#7b2ff7"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>
    </>
  )
}

function NebulaClouds() {
  const cloudsRef = useRef()
  const count = 50

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = -5 - Math.random() * 15
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!cloudsRef.current) return
    cloudsRef.current.rotation.z = state.clock.elapsedTime * 0.02
  })

  return (
    <points ref={cloudsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#7b2ff7"
        size={0.8}
        transparent
        opacity={0.15}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.2} />
      <StarField />
      <GridFloor />
      <GlowingSphere />
      <NebulaClouds />
    </Canvas>
  )
}
