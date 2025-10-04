"use client";
import React, { useEffect, useRef } from "react";

const SpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    class Star {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      twinkleSpeed: number;
      twinklePhase: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = Math.random() * (canvas?.height || window.innerHeight);
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.05;
        this.opacity = Math.random();
        this.twinkleSpeed = Math.random() * 0.015 + 0.005;
        this.twinklePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (canvas) {
          if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
          if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        this.twinklePhase += this.twinkleSpeed;
        this.opacity = (Math.sin(this.twinklePhase) + 1) / 2;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const stars: Star[] = [];
    const starCount = 200;
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }

    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.update();
        star.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10 flex flex-col">
      {/* 65% atas hitam pekat */}
      <div className="h-[55.2%] w-full bg-black" />

      {/* Gradasi tipis transisi */}
      <div
        className="h-[75px] w-full"
        style={{
          background: "linear-gradient(to bottom, #000000, #1a1a1a)",
        }}
      />

      {/* 35% bawah abu-abu gelap mendekati hitam */}
      <div className="flex-1 w-full" style={{ backgroundColor: "#1a1a1a" }} />

      {/* Canvas untuk partikel bintang */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)"
        }}
      />
    </div>
  );
};

export default SpaceBackground;