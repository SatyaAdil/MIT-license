"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// Helper functions
function clamp(v: number, a = -1, b = 1): number { 
  return Math.max(a, Math.min(b, v)); 
}

/* --- PlayableCharacter Component ---
   Loads the Cute Dino model and makes it yellow
   Rotates toward mouse pointer
   Moves with keyboard input
*/
function PlayableCharacter({ 
  pointerTarget, 
  moveVec 
}: {
  pointerTarget: React.MutableRefObject<THREE.Vector3>;
  moveVec: React.MutableRefObject<THREE.Vector3>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Placeholder chibi character (cute yellow box with head)
  useEffect(() => {
    if (groupRef.current && groupRef.current.children.length === 0) {
      const character = new THREE.Group();
      
      // Body (rounded box)
      const bodyGeo = new THREE.BoxGeometry(0.6, 0.8, 0.5);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: "#FFD700",
        metalness: 0.2,
        roughness: 0.6,
        emissive: "#FFAA00",
        emissiveIntensity: 0.15
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.y = 0.5;
      body.castShadow = true;
      character.add(body);
      
      // Head (larger sphere - chibi style)
      const headGeo = new THREE.SphereGeometry(0.45, 32, 32);
      const head = new THREE.Mesh(headGeo, bodyMat);
      head.position.y = 1.2;
      head.castShadow = true;
      character.add(head);
      
      // Eyes
      const eyeGeo = new THREE.SphereGeometry(0.08, 16, 16);
      const eyeMat = new THREE.MeshStandardMaterial({ color: "#000000" });
      
      const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
      leftEye.position.set(-0.15, 1.25, 0.38);
      character.add(leftEye);
      
      const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
      rightEye.position.set(0.15, 1.25, 0.38);
      character.add(rightEye);
      
      // Smile
      const smileCurve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-0.15, 1.05, 0.4),
        new THREE.Vector3(0, 0.95, 0.42),
        new THREE.Vector3(0.15, 1.05, 0.4)
      );
      const smileGeo = new THREE.TubeGeometry(smileCurve, 20, 0.03, 8, false);
      const smile = new THREE.Mesh(smileGeo, eyeMat);
      character.add(smile);
      
      groupRef.current.add(character);
    }
  }, []);

  // Movement and rotation
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Apply movement
    const speed = 3.5;
    velocity.current.lerp(moveVec.current.clone().multiplyScalar(speed), 0.2);
    groupRef.current.position.addScaledVector(velocity.current, delta);

    // Keep within bounds
    groupRef.current.position.x = clamp(groupRef.current.position.x, -7, 7);
    groupRef.current.position.z = clamp(groupRef.current.position.z, -7, 7);

    // Rotate toward pointer (smooth look-at)
    const target = pointerTarget.current.clone();
    target.y = groupRef.current.position.y;
    const dir = target.clone().sub(groupRef.current.position).normalize();
    const desiredRot = Math.atan2(dir.x, dir.z);
    const currentY = groupRef.current.rotation.y;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(currentY, desiredRot, 0.1) as number;
  });

  return <group ref={groupRef} position={[0, 0, 0]} />;
}

/* --- Ball Component ---
   Simple physics with velocity and friction
   Gets pushed by character when close
*/
function Ball({ posRef, charPosRef, onReset }: { 
  posRef: React.MutableRefObject<THREE.Vector3>; 
  charPosRef: React.MutableRefObject<THREE.Vector3>;
  onReset: () => void;
}) {
  const ballRef = useRef<THREE.Mesh>(null);
  const vel = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    if (!ballRef.current) return;

    // Apply friction
    vel.current.multiplyScalar(Math.max(0, 1 - delta * 2));
    ballRef.current.position.addScaledVector(vel.current, delta);

    // Character pushes ball
    const charPos = charPosRef.current || new THREE.Vector3();
    const dist = ballRef.current.position.distanceTo(charPos);
    
    if (dist < 1.3) {
      const pushDir = ballRef.current.position.clone().sub(charPos).normalize();
      vel.current.add(pushDir.multiplyScalar(4 * delta));
    }

    // Keep ball grounded
    ballRef.current.position.y = 0.35;

    // Update external reference
    posRef.current.copy(ballRef.current.position);

    // Reset if out of bounds
    if (Math.abs(ballRef.current.position.x) > 12 || Math.abs(ballRef.current.position.z) > 12) {
      onReset();
    }
  });

  return (
    <mesh ref={ballRef} position={[0, 0.35, 2]} castShadow receiveShadow>
      <sphereGeometry args={[0.35, 32, 32]} />
      <meshStandardMaterial 
        color="#ffffff" 
        metalness={0.1} 
        roughness={0.3}
        emissive="#ffffff"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

/* --- Goal Component ---
   Glows when ball enters goal zone
*/
function Goal({ position, scored }: { 
  position: [number, number, number]; 
  scored: boolean;
}) {
  return (
    <group position={position}>
      {/* Goal frame */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[5, 2.5, 0.15]} />
        <meshStandardMaterial 
          color={scored ? "#00ff88" : "#1a1a1a"}
          emissive={scored ? "#00ff88" : "#000000"}
          emissiveIntensity={scored ? 0.8 : 0}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Left post */}
      <mesh position={[-2.5, 0.5, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 2.5, 16]} />
        <meshStandardMaterial color="#cccccc" metalness={0.6} />
      </mesh>
      
      {/* Right post */}
      <mesh position={[2.5, 0.5, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 2.5, 16]} />
        <meshStandardMaterial color="#cccccc" metalness={0.6} />
      </mesh>
      
      {/* Crossbar */}
      <mesh position={[0, 2.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 5, 16]} />
        <meshStandardMaterial color="#cccccc" metalness={0.6} />
      </mesh>

      {/* Glow effect when scored */}
      {scored && (
        <pointLight 
          position={[0, 1.2, 0]} 
          color="#00ff88" 
          intensity={3} 
          distance={8} 
        />
      )}
    </group>
  );
}

/* --- Keyboard Hook ---
   Captures WASD and Arrow keys
*/
function useKeyboardMovement(moveVec: React.MutableRefObject<THREE.Vector3>) {
  useEffect(() => {
    const keys = { forward: 0, right: 0 };
    
    const onKeyDown = (e: KeyboardEvent) => {
      if (["w", "W", "ArrowUp"].includes(e.key)) keys.forward = -1;
      if (["s", "S", "ArrowDown"].includes(e.key)) keys.forward = 1;
      if (["a", "A", "ArrowLeft"].includes(e.key)) keys.right = -1;
      if (["d", "D", "ArrowRight"].includes(e.key)) keys.right = 1;
      updateVec();
    };
    
    const onKeyUp = (e: KeyboardEvent) => {
      if (["w", "W", "ArrowUp", "s", "S", "ArrowDown"].includes(e.key)) keys.forward = 0;
      if (["a", "A", "ArrowLeft", "d", "D", "ArrowRight"].includes(e.key)) keys.right = 0;
      updateVec();
    };
    
    const updateVec = () => {
      const vec = new THREE.Vector3(keys.right, 0, keys.forward);
      if (vec.length() > 0) vec.normalize();
      moveVec.current.copy(vec);
    };
    
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [moveVec]);
}

/* --- Main Game Scene --- */
function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const charPosRef = useRef(new THREE.Vector3(0, 0, 0));
  const ballPos = useRef(new THREE.Vector3(0, 0.35, 2));
  const moveVec = useRef(new THREE.Vector3(0, 0, 0));
  const pointerTarget = useRef(new THREE.Vector3(0, 0, 5));
  const [scored, setScored] = useState(false);
  const { camera, gl } = useThree();

  useKeyboardMovement(moveVec);

  // Mouse tracking for character head direction
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      
      const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
      const target = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, target);
      
      if (target) {
        pointerTarget.current.copy(target);
      }
    };
    
    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [camera, gl.domElement]);

  // Goal detection
  useFrame(() => {
    // Update character position reference for ball collision
    if (groupRef.current) {
      charPosRef.current.copy(groupRef.current.position);
    }
    
    // Check if ball is in goal zone
    if (ballPos.current.z < -8 && Math.abs(ballPos.current.x) < 2.5) {
      if (!scored) {
        setScored(true);
        setTimeout(() => {
          resetPositions();
        }, 1500);
      }
    }
  });

  const resetPositions = () => {
    ballPos.current.set(0, 0.35, 2);
    charPosRef.current.set(0, 0, 0);
    setScored(false);
  };

  return (
    <>
      {/* Lighting - spotlight style */}
      <ambientLight intensity={0.1} />
      <spotLight 
        position={[0, 15, 0]} 
        angle={0.6} 
        penumbra={0.5} 
        intensity={1.5} 
        castShadow 
      />
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#FFD700" />

      {/* Ground - minimal dark floor */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.8} />
      </mesh>

      {/* Center circle marking */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.01, 0]}>
        <ringGeometry args={[1.8, 2, 32]} />
        <meshBasicMaterial color="#222222" />
      </mesh>

      {/* Goal */}
      <Goal position={[0, 0, -9]} scored={scored} />

      {/* Character */}
      <Suspense fallback={null}>
        <PlayableCharacter 
          pointerTarget={pointerTarget} 
          moveVec={moveVec}
        />
      </Suspense>

      {/* Ball */}
      <Ball 
        posRef={ballPos} 
        charPosRef={charPosRef}
        onReset={resetPositions}
      />
    </>
  );
}

/* --- Main Component --- */
export default function GameSection() {
  return (
    <div className="relative w-full h-[700px] bg-black">
      <Canvas shadows camera={{ position: [0, 8, 14], fov: 50 }}>
        <Suspense fallback={null}>
          <Environment preset="night" />
          <Scene />
        </Suspense>
      </Canvas>

      {/* UI Instructions */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl">
          <p className="text-white/90 text-sm font-medium mb-1">
            ⚽ Chibi DinoCore Soccer
          </p>
          <p className="text-white/60 text-xs">
            WASD or Arrow Keys to move • Mouse to look • Score a goal! 🎯
          </p>
        </div>
      </div>
    </div>
  );
}