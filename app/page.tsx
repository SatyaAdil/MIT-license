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
import BackgroundStars from "@/components/BackgroundStars";

// Komponen berat
const MusicPlayer = dynamic(() => import("@/components/music-player"), { ssr: false });

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Langsung switch begitu scroll lebih dari 100px
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Background & Navigation */}
      <BackgroundStars />
      <Navigation />
      {/* Music */}
      <MusicPlayer />

      {/* Hero Landing Page - Fixed, hilang setelah scroll */}
      {!isScrolled && (
        <div className="fixed inset-0 z-10">
          <HeroSection />
        </div>
      )}

      {/* Hero Background Blur - Fixed di belakang setelah scroll */}
      {isScrolled && (
        <div className="fixed inset-0 z-0">
          {/* Overlay gelap */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
          {/* Hero sebagai background blur */}
          <div className="fixed inset-0 opacity-40 blur-sm">
            <HeroSection />
          </div>
        </div>
      )}

      {/* Content Wrapper - Sections lainnya */}
      <div className="relative z-20">
        {/* Spacer untuk hero section agar tidak overlap */}
        <div className="h-screen" />
        
        {/* Sections */}
        <div className="relative">
          <ProjectsSection />
          <GallerySection />
          <DiarySection />
          <SkillsSection />
          <InvitationSection />
        </div>
      </div>
    </main>
  );
}