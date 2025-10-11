"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!progressRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      progressRef.current.style.width = `${scrolled}%`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[1px] z-50 bg-white/5">
      <div
        ref={progressRef}
        className="h-[1px] bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400"
        style={{
          transition: "width 0s", // langsung update, tanpa delay
        }}
      />
    </div>
  );
}
