"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function TalkingDino() {
  const group = useRef<THREE.Group>(null);
  const mouthRef = useRef<THREE.Mesh | null>(null);

  const { scene } = useGLTF("/models/cute_dino.glb");

  useEffect(() => {
    if (scene) {
      scene.traverse((child: any) => {
        console.log("Node:", child.name); // cek nama node di console
        if (child.isMesh && child.name.toLowerCase().includes("mouth")) {
          mouthRef.current = child;
        }
      });

      scene.scale.set(2, 2, 2);
      scene.position.set(0, -1, 0);
      group.current?.add(scene);
    }
  }, [scene]);

  // Animasi mulut simple
  useFrame((state) => {
    if (mouthRef.current) {
      const scaleY = 0.5 + Math.abs(Math.sin(state.clock.elapsedTime * 5)) * 0.5;
      mouthRef.current.scale.y = scaleY;
    }
  });

  return <group ref={group} />;
}

export default function GameSection() {
  return (
    <div className="w-full h-[600px] bg-black">
      <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <TalkingDino />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
