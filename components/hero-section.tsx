"use client"
import type React from "react"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import VideoText from "./VideoText"
import BackgroundStars from "@/components/BackgroundStars"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations } from "@react-three/drei"

function AstronautModel(props: any) {
  const { scene, animations } = useGLTF("/astronaut_optimized.glb")
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
      const speed = 0.1
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

      if (groundRef.current) {
        groundRef.current.position.x = astronautRef.current.position.x
        groundRef.current.position.z = astronautRef.current.position.z
      }
    }
  })

  return (
    <>
      <spotLight
        ref={spotLightRef}
        position={[0, 0.1, 0]}
        angle={0.6}
        penumbra={1}
        intensity={10000}
        distance={3}
        decay={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      <mesh 
        ref={groundRef}
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -1.799, 0]} 
        receiveShadow
      >
        <circleGeometry args={[1.2, 64]} />
        <meshStandardMaterial
          color="#66666"
          emissive="#ffffff"
          emissiveIntensity={0.100}
          transparent
          opacity={0.01}
          roughness={2}
        />
      </mesh>

      <primitive ref={astronautRef} object={scene} {...props} />
    </>
  )
}

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden text-white">
     <div className="absolute top-[15%] left-[20%] z-20">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{
            opacity: [1, 0.4, 1], 
            color: ["#A0D8EF", "#ffffff", "#A0D8EF"], 
            textShadow: [
              "0 0 10px rgba(160,216,239,0.8), 0 0 20px rgba(160,216,239,0.6)",
              "0 0 15px rgba(255,255,255,0.9), 0 0 25px rgba(255,255,255,0.7)",
              "0 0 10px rgba(160,216,239,0.8), 0 0 20px rgba(160,216,239,0.6)",
            ],
          }}
          transition={{
            duration: 0.8, 
            repeat: Infinity, 
            ease: "easeInOut",
          }}
          className="text-3xl font-light tracking-tight"

        >
          ようこそ、私のポートフォリオへ
        </motion.p>
      </div>
      <div className="absolute top-[10%] left-[20%] z-20">
        <VideoText />
      </div>

      <div className="absolute inset-0 z-10">
        <Canvas shadows camera={{ position: [0, 2, 8], fov: 50 }}>
          <ambientLight intensity={0.08} />
          
          <directionalLight
            position={[0, 2, 3]}
            intensity={0.6}
            color="#ffffff"
          />

          <AstronautModel scale={0.3} position={[0, -2, 0]} />

          <pointLight position={[2, 0.5, 1]} intensity={0.4} color="#aaaaaa" distance={6} />
          <pointLight position={[-2, 0.5, 1]} intensity={0.4} color="#aaaaaa" distance={6} />
        </Canvas>
      </div>

      <div className="absolute inset-0 z-[5] pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-gradient-radial from-white/8 via-white/3 to-transparent rounded-full blur-[60px]"></div>
      </div>

      <BackgroundStars />

      <div className="absolute bottom-6 flex flex-col items-center gap-2 z-20">
        <div className="w-5 h-8 border-2 border-white rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
        </div>
        <p className="text-xs tracking-widest">Explore</p>
      </div>
    </section>
  )
}

export default HeroSection