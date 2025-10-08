// invitation-section.tsx
"use client";
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function InvitationSection() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  // Lazy load: hanya load saat section terlihat
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

    if (mountRef.current) {
      observer.observe(mountRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mountRef.current || !shouldLoad) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 8);

    // Renderer dengan alpha dan clearColor transparan
    const renderer = new THREE.WebGLRenderer({ 
      antialias: window.devicePixelRatio < 2,
      alpha: true,
      powerPreference: "high-performance"
    });
    
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = false;
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    // Load GLB
    const loader = new GLTFLoader();
    const glbPath = '/invit.glb';
    let model: THREE.Object3D | undefined;

    loader.load(
      glbPath,
      (gltf) => {
        model = gltf.scene;
        model.position.set(0, 0, 0);
        model.scale.set(2, 2, 2);
        
        // Debug: Print semua nama mesh
        console.log('=== GLB Meshes ===');
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            console.log(`Mesh: "${child.name}" | Type: ${child.type}`);
          }
        });
        
        // Hapus background/sky/unwanted objects dari GLB
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const name = child.name.toLowerCase();
            
            // Filter berbagai nama yang biasa dipakai untuk background/blocking objects
            if (
              name.includes('sky') || 
              name.includes('background') || 
              name.includes('plane') || 
              name.includes('floor') ||
              name.includes('ambiente') ||
              name.includes('sphere') ||
              name.includes('cube') ||
              name.includes('box') ||
              name.includes('quad')
            ) {
              console.log(`🗑️ Hiding: ${child.name}`);
              child.visible = false;
            }
            
            // Hapus mesh yang terlalu besar (kemungkinan skybox/background)
            if (mesh.geometry) {
              mesh.geometry.computeBoundingSphere();
              const radius = mesh.geometry.boundingSphere?.radius || 0;
              
              if (radius > 50) {
                console.log(`🗑️ Hiding large mesh: ${child.name} (radius: ${radius.toFixed(2)})`);
                child.visible = false;
              }
            }
            
            // Nonaktifkan shadow untuk performa
            child.castShadow = false;
            child.receiveShadow = false;
          }
        });
        
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error('Error loading GLB:', error);
      }
    );

    // Animation loop dengan throttling
    let lastTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;
    
    const animate = (currentTime: number) => {
      requestAnimationFrame(animate);
      
      const deltaTime = currentTime - lastTime;
      if (deltaTime < frameInterval) return;
      
      lastTime = currentTime - (deltaTime % frameInterval);
      
      if (model) {
        model.rotation.y += 0.001;
      }
      renderer.render(scene, camera);
    };
    animate(0);

    // Resize handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement.parentNode) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      
      scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
          const mesh = object as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach(material => material.dispose());
          } else {
            mesh.material?.dispose();
          }
        }
      });
    };
  }, [shouldLoad]);

  return (
    <div className="relative w-full h-screen">
      <div 
        ref={mountRef} 
        className="absolute inset-0"
        style={{ background: 'transparent' }}
      />
    </div>
  );
}