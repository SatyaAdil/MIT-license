"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import ScrollToTop from "@/components/ScrollToTop";

export default function Navigation() {
  const [active, setActive] = useState<string | null>(null);
  const [currentLang, setCurrentLang] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const languages = [
    {
      code: "jp",
      navItems: [
        { id: "projects", label: "プロジェクト", colors: ["text-blue-600", "text-blue-500", "bg-blue-500"] },
        { id: "profile", label: "プロフィール", colors: ["text-blue-500", "text-blue-400", "bg-blue-400"] },
        { id: "contact", label: "お問い合わせ", colors: ["text-blue-400", "text-blue-300", "bg-blue-300"] },
      ]
    },
    {
      code: "en",
      navItems: [
        { id: "projects", label: "Projects", colors: ["text-slate-700", "text-slate-600", "bg-slate-600"] },
        { id: "profile", label: "Profile", colors: ["text-slate-600", "text-slate-500", "bg-slate-500"] },
        { id: "contact", label: "Contact", colors: ["text-slate-500", "text-slate-400", "bg-slate-400"] },
      ]
    }
  ];

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentLang((prev) => (prev + 1) % languages.length);
        setIsTransitioning(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, languages.length]);

  const currentNavItems = languages[currentLang].navItems;

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["profile", "projects", "contact"];
      const scrollPos = window.scrollY + window.innerHeight / 2;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActive(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="absolute top-6 left-6 pointer-events-auto">
        <a href="#"> 
          <Image
            src="/logo.png"
            alt="Logo"
            width={150}
            height={55}
            className="object-contain drop-shadow-[0_0_6px_rgba(0,200,255,0.6)]"
          />
        </a>
      </div>
      <div 
        className="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex items-center gap-10 px-12 py-5 rounded-2xl bg-neutral-900/100 backdrop-blur-xl border border-white/10 shadow-lg">
          {currentNavItems.map((item) => {
            const isActive = active === item.id;
            const [baseColor, activeColor] = item.colors;
            return (
              <a
                key={item.id}
                href={`#${item.id}`} // LINK KE SECTION
                onClick={() => setActive(item.id)}
                className={`relative text-sm font-medium transition-all duration-300 hover:scale-105 animate-pulse ${
                  isActive ? activeColor : baseColor
                }`}
                style={{ textDecoration: "none", transition: "opacity 300ms, transform 300ms" }}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>

      <div className="absolute top-6 right-6 flex items-center gap-5 pointer-events-auto text-white text-[1.35rem]">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors duration-300 hover:scale-110 transform">
          <i className="fi fi-brands-instagram"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors duration-300 hover:scale-110 transform">
          <i className="fi fi-brands-linkedin"></i>
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors duration-300 hover:scale-110 transform">
          <i className="fi fi-brands-github"></i>
        </a>
        <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors duration-300 hover:scale-110 transform">
          <i className="fi fi-brands-discord"></i>
        </a>
      </div>

      <ScrollToTop />
    </nav>
  );
}
