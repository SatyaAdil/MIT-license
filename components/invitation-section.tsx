"use client";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

declare module "three/examples/jsm/loaders/GLTFLoader" {
  interface GLTFLoader {
    setDRACOLoader?: (dracoLoader: any) => void;
    setMeshoptDecoder?: (decoder: any) => void;
  }
}

export default function InvitationSection() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  // 💬 STATE UNTUK TYPING EFFECT
  const [typedText, setTypedText] = useState("");

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

  // ✅ Efek Three.js (tidak diubah)
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

  // 💫 Efek Typing Loop
  useEffect(() => {
    const dialogues = [
      "Hey there!",
      "Thank you so much for stopping by",
      "Wanna explore a bit more?",
      `Come visit my <a href="https://roomstydcode.netlify.app/" target="_blank">Room</a>`,
    ];


    let dialogIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = "";
    const typingSpeed = 45;
    const pauseBetween = 1500;

    const type = () => {
      const fullText = dialogues[dialogIndex];

      if (!isDeleting) {
        currentText = fullText.substring(0, charIndex + 1);
        charIndex++;
        setTypedText(currentText + '<span class="cursor"></span>');

        if (charIndex === fullText.length) {
          isDeleting = true;
          setTimeout(type, pauseBetween);
          return;
        }
      } else {
        currentText = fullText.substring(0, charIndex - 1);
        charIndex--;
        setTypedText(currentText + '<span class="cursor"></span>');

        if (charIndex === 0) {
          isDeleting = false;
          dialogIndex = (dialogIndex + 1) % dialogues.length;
        }
      }

      const delay = isDeleting ? 30 : typingSpeed;
      setTimeout(type, delay);
    };

    type();
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div ref={mountRef} className="absolute inset-0" style={{ background: "transparent" }} />

      {/* 💬 Speech Bubble */}
     <div className="speech-bubble centered">
        <p dangerouslySetInnerHTML={{ __html: typedText }} />
        <button className="visit-btn">
          <a href="https://roomstydcode.netlify.app/" target="_blank" rel="noopener noreferrer">
            Lest Go!
          </a>
        </button>
      </div>

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
        .speech-bubble {
          position: absolute;
          bottom: 350px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 12px 18px;
          max-width: 260px;
          font-size: 14px;
          text-align: center;
          backdrop-filter: blur(6px);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
          animation: floatUp 3s ease-in-out infinite;
        }

        .speech-bubble::after {
          content: "";
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          border-width: 10px 10px 0;
          border-style: solid;
          border-color: rgba(255, 255, 255, 0.1) transparent transparent transparent;
        }

        .speech-bubble a {
          color: #4fc3f7;
          text-decoration: none;
          font-weight: 600;
        }
        .visit-btn {
          margin-top: 10px;
          background: rgba(79, 195, 247, 0.2);
          border: 1px solid rgba(79, 195, 247, 0.4);
          color: #4fc3f7;
          font-size: 13px;
          padding: 6px 14px;
          border-radius: 8px;
          cursor: pointer;
          backdrop-filter: blur(4px);
          transition: all 0.3s ease;
        }

        .visit-btn:hover {
          background: rgba(79, 195, 247, 0.4);
          transform: translateY(-2px);
        }

        .visit-btn a {
          text-decoration: none;
          color: inherit;
        }

        @keyframes floatUp {
          0%, 100% {
            transform: translate(-50%, 0);
          }
          50% {
            transform: translate(-50%, -6px);
          }
        }

        .cursor {
          display: inline-block;
          width: 8px;
          background-color: #4fc3f7;
          margin-left: 2px;
          animation: blink 0.8s infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
