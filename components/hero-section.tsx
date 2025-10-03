"use client"
import type React from "react"
import { useEffect, useRef } from "react"
import VideoText from "./VideoText"
import BackgroundStars from "@/components/BackgroundStars"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations } from "@react-three/drei"

function AstronautModel(props: any) {
  const { scene, animations } = useGLTF("/astronaut_3d.glb")
  const { actions } = useAnimations(animations, scene)
  const astronautRef = useRef<any>()
  const spotLightRef = useRef<any>()
  const groundRef = useRef<any>()
  const keysPressed = useRef<Set<string>>(new Set())

  useEffect(() => {
    Object.values(actions || {}).forEach((action) => action?.play())
  }, [actions])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key.toLowerCase())
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase())
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  useFrame((state, delta) => {
    if (astronautRef.current) {
      const speed = 2
      let moveX = 0
      let moveZ = 0

      if (keysPressed.current.has("w") || keysPressed.current.has("arrowup")) {
        moveZ -= 1
      }
      if (keysPressed.current.has("s") || keysPressed.current.has("arrowdown")) {
        moveZ += 1
      }
      if (keysPressed.current.has("a") || keysPressed.current.has("arrowleft")) {
        moveX -= 1
      }
      if (keysPressed.current.has("d") || keysPressed.current.has("arrowright")) {
        moveX += 1
      }

      if (moveX !== 0 || moveZ !== 0) {
        astronautRef.current.position.x += moveX * speed * delta
        astronautRef.current.position.z += moveZ * speed * delta

        const targetRotation = Math.atan2(moveX, moveZ)
        astronautRef.current.rotation.y = targetRotation
      }

      astronautRef.current.position.x = Math.max(-8, Math.min(8, astronautRef.current.position.x))
      astronautRef.current.position.z = Math.max(-5, Math.min(5, astronautRef.current.position.z))

      // Update spotlight to follow astronaut
      if (spotLightRef.current) {
        spotLightRef.current.position.x = astronautRef.current.position.x
        spotLightRef.current.position.z = astronautRef.current.position.z
        spotLightRef.current.target.position.set(
          astronautRef.current.position.x,
          -1.8,
          astronautRef.current.position.z
        )
        spotLightRef.current.target.updateMatrixWorld()
      }

      // Update ground plane to follow astronaut
      if (groundRef.current) {
        groundRef.current.position.x = astronautRef.current.position.x
        groundRef.current.position.z = astronautRef.current.position.z
      }
    }
  })

  return (
    <>
      {/* Main spotlight following astronaut */}
      <spotLight
        ref={spotLightRef}
        position={[0, 6, 0]}
        angle={0.35}
        penumbra={1}
        intensity={50}
        distance={12}
        decay={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      {/* Ground plane with subtle glow */}
      <mesh 
        ref={groundRef}
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -1.799, 0]} 
        receiveShadow
      >
        <circleGeometry args={[2.2, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.15}
          transparent
          opacity={0.25}
          roughness={1}
        />
      </mesh>

      <primitive ref={astronautRef} object={scene} {...props} />
    </>
  )
}

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden text-white">
      {/* Nama Jepang */}
      <div className="absolute top-[15%] left-[20%] z-20">
        <p className="text-3xl text-gray-400 tracking-[0.10em]">サティア アディル</p>
      </div>

      {/* VideoText */}
      <div className="absolute top-[10%] left-[20%] z-20">
        <VideoText />
      </div>

      {/* Canvas Astronot 3D */}
      <div className="absolute inset-0 z-10">
        <Canvas shadows camera={{ position: [0, 2, 8], fov: 50 }}>
          {/* Very low ambient light for dark space atmosphere */}
          <ambientLight intensity={0.08} />
          
          {/* Subtle fill light from front */}
          <directionalLight
            position={[0, 2, 4]}
            intensity={0.3}
            color="#ffffff"
          />

          {/* Astronaut with dynamic spotlight */}
          <AstronautModel scale={0.4} position={[0, -1.8, 0]} />

          {/* Very subtle rim lights */}
          <pointLight position={[4, 2, 3]} intensity={0.5} color="#4a9eff" distance={10} />
          <pointLight position={[-4, 2, 3]} intensity={0.5} color="#ff6b9d" distance={10} />
        </Canvas>
      </div>

      {/* Subtle center glow */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-radial from-white/10 via-white/5 to-transparent rounded-full blur-[60px]"></div>
      </div>

      {/* Background Stars */}
      <BackgroundStars />

      <div className="absolute top-6 right-6 z-20 text-sm text-gray-400">
        <p>Use WASD or Arrow Keys to move</p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 flex flex-col items-center gap-2 z-20">
        <div className="w-4 h-8 border-2 border-white rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
        </div>
        <p className="text-xs tracking-widest">Scroll Down</p>
      </div>
    </section>
  )
}

export default HeroSection