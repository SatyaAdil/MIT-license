"use client";
import { useRef, useEffect } from "react";

const StarBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: { x: number; y: number; size: number; dx: number; dy: number }[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 500 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 0.2 + 0.1,      // bintang super kecil
        dx: (Math.random() - 0.5) * 0.02,     // pergerakan horizontal lambat
        dy: (Math.random() - 0.5) * 0.02,     // pergerakan vertikal lambat
      }));
    };

    const draw = () => {
      // 🌌 Background gradient langit → dataran tipis
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#000000");      // atas hitam
      gradient.addColorStop(0.55, "#000000");   // sampai 55% atas tetap hitam
      gradient.addColorStop(0.7, "#1a1a1a");    // mulai abu tipis (kabut tipis)
      gradient.addColorStop(0.85, "#2a2a2a");   // dataran bawah mulai terlihat
      gradient.addColorStop(1, "#333333");      // bawah paling gelap

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ✨ Gambar bintang kecil
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.fill();

        // update posisi bintang
        star.x += star.dx;
        star.y += star.dy;

        // loop bintang ketika keluar layar
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
    />
  );
};

export default StarBackground;
