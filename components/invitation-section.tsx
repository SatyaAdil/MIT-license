import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Loader2 } from "lucide-react"
import * as THREE from "three"

// Three.js Character Component
function Character3D() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!mountRef.current) return

    // Three.js setup
    // Use imported THREE instead of window.THREE
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    
    const width = 300
    const height = 400
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 10, 5)
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0x00d9ff, 1, 100)
    pointLight.position.set(-5, 5, 5)
    scene.add(pointLight)

    // Create character
    const character = new THREE.Group()

    // Body (cyan/tech color)
    const bodyGeometry = new THREE.BoxGeometry(1, 1.5, 0.5)
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x00d9ff,
      shininess: 100
    })
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    body.position.y = 0
    character.add(body)

    // Head
    const headGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8)
    const headMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x00e5ff,
      shininess: 100
    })
    const head = new THREE.Mesh(headGeometry, headMaterial)
    head.position.y = 1.15
    character.add(head)

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.1, 16, 16)
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 })
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    leftEye.position.set(-0.2, 1.2, 0.35)
    character.add(leftEye)
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    rightEye.position.set(0.2, 1.2, 0.35)
    character.add(rightEye)

    // Arms
    const armGeometry = new THREE.BoxGeometry(0.25, 1.2, 0.25)
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0x00c4e5 })
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial)
    leftArm.position.set(-0.65, 0, 0)
    character.add(leftArm)
    
    const rightArm = new THREE.Mesh(armGeometry, armMaterial)
    rightArm.position.set(0.65, 0, 0)
    character.add(rightArm)

    // Legs
    const legGeometry = new THREE.BoxGeometry(0.3, 1, 0.3)
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0x0099cc })
    
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial)
    leftLeg.position.set(-0.3, -1.25, 0)
    character.add(leftLeg)
    
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial)
    rightLeg.position.set(0.3, -1.25, 0)
    character.add(rightLeg)

    scene.add(character)
    camera.position.z = 5
    camera.position.y = 0.5

    setIsLoaded(true)

    // Animation
    let time = 0
    const animate = () => {
      requestAnimationFrame(animate)
      time += 0.01

      // Floating animation
      character.position.y = Math.sin(time * 2) * 0.1

      // Wave animation - right arm
      rightArm.rotation.z = Math.sin(time * 3) * 0.5 - 0.3
      rightArm.rotation.x = Math.sin(time * 3) * 0.3

      // Slight body rotation
      character.rotation.y = Math.sin(time * 0.5) * 0.1

      // Eyes blink
      const blinkTime = Math.floor(time * 2) % 10
      if (blinkTime === 0) {
        leftEye.scale.y = 0.1
        rightEye.scale.y = 0.1
      } else {
        leftEye.scale.y = 1
        rightEye.scale.y = 1
      }

      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div className="relative">
      <div ref={mountRef} className="mx-auto" />
      {isLoaded && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-cyan-500/10 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30 whitespace-nowrap">
          <p className="text-sm font-medium text-cyan-400 animate-pulse">
            Haii! Ayo main ke room aku! 👋
          </p>
        </div>
      )}
    </div>
  )
}

export default function InvitationSection() {
  const [roomData, setRoomData] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchRoomData = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://roomstydcode.netlify.app/api/data")
      const data = await response.json()
      setRoomData(data)
    } catch (error) {
      console.error("[v0] Failed to fetch room data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRoomData()
  }, [])

  return (
    <section className="relative py-32 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 3D Character */}
          <div className="hidden md:block">
            <Character3D />
          </div>

          {/* Content */}
          <div className="text-center md:text-left">
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-gray-800">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Want to Know More About Me?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Come play in my room and explore my world
              </p>

              {/* Mobile character (simplified) */}
              <div className="md:hidden mb-6">
                <Character3D />
              </div>

              {loading ? (
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 mb-8">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Loading room data...</span>
                </div>
              ) : roomData ? (
                <div className="mb-8 p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-sm">
                  <p className="text-cyan-400">Room Status: Connected ✓</p>
                </div>
              ) : null}

              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all duration-300"
                onClick={() => window.open("https://roomstydcode.netlify.app", "_blank")}
              >
                Enter My Room
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <footer className="mt-20 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">© 2025 Satya Adil Faishal. Built with Next.js and love.</p>
        </footer>
      </div>
    </section>
  )
}