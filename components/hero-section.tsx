"use client";
import React, { useRef, useEffect } from "react";
import VideoText from "./VideoText";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function DinoMascot() {
  const { scene } = useGLTF("/models/oyen.glb"); // file GLB kucing
  const ref = useRef<any>();

  useEffect(() => {
    if (ref.current) {
      // Auto center + scale biar gak kepotong
      const box = new THREE.Box3().setFromObject(ref.current);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      ref.current.position.x += (ref.current.position.x - center.x);
      ref.current.position.y += (ref.current.position.y - center.y) + 0.5; // naikin dikit
      ref.current.position.z += (ref.current.position.z - center.z);

      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 5 / maxDim; // naikin scale biar lebih gede
      ref.current.scale.setScalar(scale);
    }
  }, []);

  return <primitive ref={ref} object={scene} />;
}

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Particles */}
      <div className="absolute inset-0 -z-10">
        <video
          src="/stars.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Teks Jepang di atas kiri */}
      <div className="absolute top-[15%] left-[20%]">
        <p className="text-sm text-gray-400 tracking-[0.3em]">
          サティア アディル
        </p>
      </div>

      {/* Nama besar dengan masking - di tengah */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <VideoText />
      </div>

      {/* Kucing 3D - di bawah teks, di atas scroll indicator */}
      <div className="absolute bottom-[18%] left-1/2 transform -translate-x-1/2 w-[120px] h-[120px]">
        <Canvas
          camera={{ position: [0, 0.5, 6], fov: 35 }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 5, 2]} intensity={1} />
          <DinoMascot />
        </Canvas>
      </div>

      {/* Scroll indicator - tetap di bawah */}
      <div className="absolute bottom-6 flex flex-col items-center gap-2">
        <div className="w-4 h-8 border-2 border-white rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
        </div>
        <p className="text-xs tracking-widest">Scroll</p>
      </div>
    </section>
  );
};

export default HeroSection;