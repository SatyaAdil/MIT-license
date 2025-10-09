"use client";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

// ✅ Tambahkan deklarasi supaya TypeScript nggak error
declare module "three/examples/jsm/loaders/GLTFLoader" {
  interface GLTFLoader {
    setDRACOLoader?: (dracoLoader: any) => void;
    setMeshoptDecoder?: (decoder: any) => void;
  }
}

export default function InvitationSection() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (mountRef.current) observer.observe(mountRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mountRef.current || !shouldLoad) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 8);

    const renderer = new THREE.WebGLRenderer({
      antialias: window.devicePixelRatio < 2,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    loader.setDRACOLoader?.(dracoLoader);
    loader.setMeshoptDecoder?.(MeshoptDecoder);

    const glbPath = "/invit_optimized.glb";
    let model: THREE.Object3D | undefined;

    loader.load(
      glbPath,
      (gltf) => {
        model = gltf.scene;
        model.position.set(0, 0, 0);
        model.scale.set(2, 2, 2);

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const name = child.name.toLowerCase();

            if (
              name.includes("sky") ||
              name.includes("background") ||
              name.includes("plane") ||
              name.includes("floor") ||
              name.includes("sphere") ||
              name.includes("cube") ||
              name.includes("box")
            ) {
              child.visible = false;
            }

            mesh.castShadow = false;
            mesh.receiveShadow = false;
          }
        });

        scene.add(model);
      },
      undefined,
      (error) => console.error("Error loading GLB:", error)
    );

    const animate = () => {
      requestAnimationFrame(animate);
      if (model) model.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement.parentNode) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [shouldLoad]);

  return (
    <div className="relative w-full h-screen">
      <div ref={mountRef} className="absolute inset-0" style={{ background: "transparent" }} />

      {/* Footer */}
      <div
        className="absolute bottom-10 left-0 right-0 text-center z-10 select-none animate-fadeIn"
        style={{
          fontFamily: "'Josefin Sans', sans-serif",
          textShadow: "0 0 10px rgba(255,255,255,0.25)",
        }}
      >
        <h1 className="text-1xl font-light tracking-widest mb-2 italic">Sty'Dcode</h1>
        <p className="text-sm opacity-80">Software Developer</p>
        <p className="text-xs opacity-60 mt-1">
          Copyright © 2023 - 2025 by Satya Adil
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 2s ease-in-out;
        }
      `}</style>
    </div>
  );
}
