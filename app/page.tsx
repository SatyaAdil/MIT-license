"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Komponen ringan
import HeroSection from "@/components/hero-section";
import ProjectsSection from "@/components/projects-section";
import GallerySection from "@/components/gallery-section";
import DiarySection from "@/components/diary-section";
import SkillsSection from "@/components/skills-section";
import InvitationSection from "@/components/invitation-section";
import Navigation from "@/components/navigation";
import ProfileSection from "@/components/ProfileSection"; // sudah ada ParallaxImages di dalamnya

// Komponen berat
const MusicPlayer = dynamic(() => import("@/components/music-player"), { ssr: false });

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Navigasi & Music Player */}
      <Navigation />
      <MusicPlayer />

      {/* Hero Section (tetap fixed di awal, blur setelah scroll) */}
      {!isScrolled && (
        <div className="fixed inset-0 z-10">
          <HeroSection />
        </div>
      )}

      {isScrolled && (
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
          <div className="fixed inset-0 opacity-40 blur-sm">
            <HeroSection />
          </div>
        </div>
      )}

      {/* Konten utama */}
      <div className="relative z-20">
        {/* Spacer agar HeroSection tidak menutupi konten */}
        <div className="h-screen" />

        {/* Sections */}
        <div className="relative">
          <ProjectsSection />

          {/* 🔥 Parallax aktif di sini */}
          <div className="relative z-10">
            <ProfileSection />
          </div>

          <GallerySection />
          <DiarySection />
          <SkillsSection />
          <InvitationSection />
        </div>
      </div>
    </main>
  );
}
