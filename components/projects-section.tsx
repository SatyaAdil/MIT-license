"use client"

import { motion } from "framer-motion"

export default function ProjectsSection() {
const projects = [
  {
    title: "PC STUDIO",
    location: "2025 | TEGAL, INDONESIA",
    category: "FRONTEND DEV",
    description: "A professional photography booking website with automated scheduling system",
    detail:
      "As a member of the team representing PC Studio, I was fully responsible for developing the frontend app, completing all the work myself except for the mock-up design. Built with React and Firebase to deliver an intuitive, fast, and elegant photography service booking experience.",
    mockup: "peache photo.png",
    background: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=3000&q=95",
  },
  {
    title: "JURUMUDI PRO",
    location: "2023 | SLAWI, INDONESIA",
    category: "BACKEND DEV",
    description: "A decision support system for ship helmsman selection",
    detail:
      "As the sole developer of this project, I implemented the SAW (Simple Additive Weighting) method using Laravel to help determine the most suitable ship helmsman based on specified criteria. Features include an admin dashboard for managing criteria data and selection results.",
    mockup: "kapal.png",
    background: "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?w=3000&q=95",
  },
  {
    title: "ANTI DROWSY",
    location: "2024 | TEGAL, INDONESIA",
    category: "MACHINE LEARNING",
    description: "An AI-powered drowsiness and phone usage detection for drivers",
    detail:
      "Working independently, I developed this system using Flask, YOLO, and MediaPipe to detect closed eyes, yawning, and phone usage in real-time. The system provides audio and visual alerts to enhance driver safety on the road.",
    mockup: "Anti Drowsy.png",
    background: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=3000&q=95",
  },
  {
    title: "AJ SEMPRONG",
    location: "2023 | ADIWERNA, INDONESIA",
    category: "CULINARY PLATFORM",
    description: "A digital platform for promoting traditional Indonesian culinary",
    detail:
      "As a member of the development team, I was responsible for building this platform using Laravel and Tailwind to help culinary SMEs expand their market reach. Features include product catalogs, online ordering systems, and appetizing visual displays.",
    mockup: "semprong.png",
    background: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=3000&q=95",
  },
  {
    title: "OMEGA SYSTEMS",
    location: "2022 | BANDUNG, INDONESIA",
    category: "FULLSTACK DEV",
    description: "A smart dashboard for IoT device management",
    detail:
      "Working as a fullstack developer, I combined Laravel, React, and MQTT to display IoT device data in real-time. The interactive dashboard allows users to monitor, control, and analyze device performance from a single location.",
    mockup: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    background: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=3000&q=95",
  },
]


  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        .project-text {
          font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `}</style>
    <section className="relative w-full min-h-screen bg-transparent text-white py-20 overflow-hidden">
      <div className="relative px-30 mb-20 pt-12">
        <p className="text-neutral-400 text-sm tracking-[0.3em] uppercase mb-2">
          FEATURED WORKS
        </p>
        <h1 className="text-[8rem] font-black tracking-tight leading-none text-white mb-16">
          PROJECTS
        </h1>
        <div className="text-center mt-12">
          <p className="text-pink-400 text-sm font-bold tracking-[0.4em] mb-2 uppercase">
            OVERVIEW
          </p>
          <p className="text-neutral-500 text-xs tracking-[0.15em] uppercase">
            List of featured portfolio
          </p>
        </div>
      </div>

      {/* Container dengan max-width dan padding untuk layout yang rapi */}
      <div className="relative max-w-[1600px] mx-auto px-12 mt-16">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative mb-40"
          >
            {/* Container gambar dengan overflow hidden biar mockup ga keluar */}
            <div className="relative w-[87%] mx-auto h-[700px] overflow-hidden shadow-[0_20px_100px_rgba(0,0,0,0.7)]">
              {/* Background image */}
              <img
                src={project.background}
                alt={project.title}
                className="w-full h-full object-cover"
                style={{ 
                  imageRendering: '-webkit-optimize-contrast',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  willChange: 'transform'
                }}
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20"></div>

              {/* Mockup di tengah-kanan, ukuran besar */}
              <div className="absolute top-1/2 -translate-y-1/2 right-8 w-[780px] h-auto z-20">
                <img
                  src={project.mockup}
                  alt={`${project.title} mockup`}
                  className="w-full h-auto object-contain"
                  style={{ 
                    filter: 'drop-shadow(-15px 25px 50px rgba(0,0,0,0.75))',
                    imageRendering: '-webkit-optimize-contrast',
                  }}
                  loading="eager"
                />
              </div>

              <div className="absolute inset-0 flex items-start pt-14">
                <div className="pl-16 max-w-[500px] z-30 project-text">
                  <div className="mb-12">
                    <h2 className="text-[1.7rem] font-black leading-[0.9] tracking-tight mb-3 text-white">
                      {project.title}
                      <span className="text-white ml-2">↗</span>
                    </h2>
                    <p className="text-[0.75rem] text-neutral-400 tracking-[0.25 em] font-semibold uppercase mb-46">
                      {project.location}
                    </p>
                  </div>

                  <div className="">
                    <p className="text-[0.75rem] text-neutral-400 tracking-[0.2em] font-semibold uppercase mb-1">
                      {project.category}
                    </p>
                    <h3 className="text-[1.7rem] font-extrabold leading-[1.15] tracking-tight text-white mb-8">
                      {project.description}
                    </h3>
                    <p className="text-[0.95rem] text-neutral-300 leading-[1.7] mb-10">
                      {project.detail}
                    </p>
                    <button className="px-6 py-3 border-2 border-white/50 text-white text-[0.75rem] font-bold tracking-[0.12em] uppercase hover:bg-white/10 transition-colors">
                      UNDER NDA - NO CASE STUDY
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
    </>
  )
}