"use client";

import Image from "next/image";
import { useState } from "react";

export default function Navigation() {
  const [active, setActive] = useState<string | null>(null);

  const navItems = [
    { id: "projects", label: "Projects" },
    { id: "profile", label: "Profile" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Logo */}
      <div className="absolute top-6 left-6 pointer-events-auto">
        <Image
          src="/logo.png"
          alt="Logo"
          width={190}   // sebelumnya 120 → diperbesar
          height={55}   // sebelumnya 40 → diperbesar
          className="object-contain drop-shadow-[0_0_6px_rgba(0,200,255,0.6)]"
        />
      </div>

      {/* Tengah Atas - Nav Bubble */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-auto">
        <div
          className="flex items-center gap-8 px-12 py-4 rounded-2xl
          bg-black/60 backdrop-blur-xl border border-white/10
          shadow-lg"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setActive(item.id)}
              className={`relative text-sm font-medium transition ${
                active === item.id
                  ? "text-cyan-400"
                  : "text-white hover:text-cyan-400"
              }`}
            >
              {item.label}
              {active === item.id && (
                <span className="absolute -bottom-1 left-0 right-0 mx-auto h-0.5 w-full bg-cyan-400 rounded-full"></span>
              )}
            </a>
          ))}
        </div>
      </div>

      {/* Kanan Atas - Sosmed */}
      <div className="absolute top-6 right-6 flex items-center gap-5 pointer-events-auto text-white text-lg">
        <a
          href="https://instagram.com"
          target="_blank"
          className="hover:text-cyan-400 transition"
        >
          <i className="fi fi-brands-instagram"></i>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          className="hover:text-cyan-400 transition"
        >
          <i className="fi fi-brands-linkedin"></i>
        </a>
        <a
          href="https://github.com"
          target="_blank"
          className="hover:text-cyan-400 transition"
        >
          <i className="fi fi-brands-github"></i>
        </a>
        <a
          href="https://discord.com"
          target="_blank"
          className="hover:text-cyan-400 transition"
        >
          <i className="fi fi-brands-discord"></i>
        </a>
      </div>
    </nav>
  );
}
