import dynamic from "next/dynamic"

// Komponen ringan
import HeroSection from "@/components/hero-section"
import ProjectsSection from "@/components/projects-section"
import GallerySection from "@/components/gallery-section"
import DiarySection from "@/components/diary-section"
import SkillsSection from "@/components/skills-section"
import InvitationSection from "@/components/invitation-section"
import Navigation from "@/components/navigation"

// Ganti Starfield ke BackgroundStars (tidak pakai dynamic, karena ringan)
import BackgroundStars from "@/components/BackgroundStars"

// Komponen berat
const MusicPlayer = dynamic(() => import("@/components/music-player"), { ssr: false })
const GameSection = dynamic(() => import("@/components/game-section"), { ssr: false })

export const metadata = {
  title: "Satya Adil – Portfolio",
  description: "Landing page interaktif dengan game mini, musik, dan 3D background.",
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Background & Navigation */}
      <BackgroundStars />
      <Navigation />

      {/* Music */}
      <MusicPlayer />

      {/* Sections */}
      <HeroSection />
      <ProjectsSection />
      <GallerySection />
      <DiarySection />
      <SkillsSection />
      <InvitationSection />
    </main>
  )
}
