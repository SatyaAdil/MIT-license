"use client";

import Image from "next/image";
import { Github, Instagram, Linkedin } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* KIRI ATAS - LOGO + NAMA */}
      <div className="absolute top-6 left-6 pointer-events-auto">
        <Image
          src="/logo.png"
          alt="Logo"
          width={160} // Sesuaikan biar proporsional
          height={60}
          className="object-contain drop-shadow-[0_0_6px_rgba(0,200,255,0.6)]"

        />
      </div>


      {/* TENGAH ATAS - NAV BUBBLE */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-auto">
        <div className="flex items-center gap-6 px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
          <a href="#projects" className="text-white hover:text-blue-400 transition">Projects</a>
          <a href="#profile" className="text-white hover:text-blue-400 transition">Profile</a>
          <a href="#contact" className="text-white hover:text-blue-400 transition">Contact</a>
        </div>
      </div>

      {/* KANAN ATAS - SOSMED */}
      {/* KANAN ATAS - SOSMED */}
      <div className="absolute top-6 right-6 flex items-center gap-4 pointer-events-auto">
        <a href="https://github.com" target="_blank" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
          <Github className="w-4 h-4 text-white" />
        </a>
        <a href="https://instagram.com" target="_blank" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
          <Instagram className="w-4 h-4 text-white" />
        </a>
        <a href="https://linkedin.com" target="_blank" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
          <Linkedin className="w-4 h-4 text-white" />
        </a>
      </div>

    </nav>
  );
}
