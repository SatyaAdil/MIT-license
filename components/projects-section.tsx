"use client"

import { motion } from "framer-motion"

export default function ProjectsSection() {
  const projects = [
    {
      title: "AEROTALON",
      location: "2025 | MELBOURNE, AUSTRALIA",
      category: "FRONTEND DEV",
      description: "A Streamlined Aviation Operations And Management Platform",
      detail:
        "Assisted and contributed to the 1-to-1 migration of a legacy application to a modern React-based solution, while enhancing feature functionality and improving UI/UX.",
      image:
        "peache photo.png",
    },
    {
      title: "ARCADIA LABS",
      location: "2023 | JAKARTA, INDONESIA",
      category: "BACKEND DEV",
      description: "Secure API Platform For Fintech Applications",
      detail:
        "Developed and maintained robust RESTful APIs for fintech integrations, focusing on authentication, scalability, and data encryption using Node.js and PostgreSQL.",
      image:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80",
    },
    {
      title: "NOVUS AI",
      location: "2024 | SYDNEY, AUSTRALIA",
      category: "MACHINE LEARNING",
      description: "AI-Powered Document Classification Engine",
      detail:
        "Implemented advanced NLP pipelines for real-time document analysis using TensorFlow and OpenAI APIs, achieving over 93% accuracy in classification.",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80",
    },
    {
      title: "LUMINA STUDIO",
      location: "2023 | SINGAPORE",
      category: "UI/UX DESIGN",
      description: "Creative Agency Digital Experience",
      detail:
        "Collaborated in creating a high-end visual storytelling website with immersive animations using GSAP and Framer Motion for dynamic user engagement.",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80",
    },
    {
      title: "OMEGA SYSTEMS",
      location: "2022 | BANDUNG, INDONESIA",
      category: "FULLSTACK DEV",
      description: "Smart IoT Management Dashboard",
      detail:
        "Built a scalable IoT data dashboard integrating MQTT, React, and Laravel APIs to visualize and control connected devices in real-time.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
    },
  ]

  return (
    <section className="relative w-full min-h-screen bg-transparent text-white py-20 overflow-hidden">
      <div className="relative px-30 mb-20 pt-12">
        <p className="text-neutral-400 text-sm tracking-[0.3em] uppercase mb-2">
          FEATURED WORKS
        </p>
        <h1 className="text-[10rem] font-black tracking-tight leading-none text-white mb-16">
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
            <div className="relative w-[90%] mx-auto h-[720px] overflow-hidden shadow-[0_20px_100px_rgba(0,0,0,0.7)]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20"></div>

              <div className="absolute inset-0 flex items-center">
                <div className="pl-16 max-w-[580px]">
                  <div className="mb-8">
                    <h2 className="text-[3.5rem] font-black leading-[0.95] tracking-tight mb-3 text-white">
                      {project.title}
                      <span className="text-pink-500 ml-2">↗</span>
                    </h2>
                    <p className="text-[0.6rem] text-neutral-300 tracking-[0.35em] font-semibold uppercase">
                      {project.location}
                    </p>
                  </div>

                  <div className="border-l-[3px] border-pink-500 pl-7">
                    <p className="text-[0.6rem] text-neutral-300 tracking-[0.3em] font-bold uppercase mb-5">
                      {project.category}
                    </p>
                    <h3 className="text-[1.65rem] font-bold leading-[1.25] tracking-tight text-white mb-5">
                      {project.description}
                    </h3>
                    <p className="text-[0.9rem] text-neutral-300 leading-relaxed mb-8">
                      {project.detail}
                    </p>
                    <button className="px-5 py-2.5 border-2 border-white/40 text-white text-[0.65rem] font-bold tracking-[0.15em] uppercase hover:bg-white/10 transition-colors">
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
  )
}
