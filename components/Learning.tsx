"use client"

import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"

export default function LearningJourney() {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const journey = [
    {
      year: "2020",
      phase: "FOUNDATION",
      skills: ["HTML", "CSS", "JavaScript"],
    },
    {
      year: "2021",
      phase: "FRONTEND DEV",
      skills: ["React", "Tailwind", "Git"],
    },
    {
      year: "2022",
      phase: "FULL STACK",
      skills: ["Next.js", "Node.js", "MongoDB"],
    },
    {
      year: "2023",
      phase: "BACKEND & DB",
      skills: ["Laravel", "PostgreSQL", "Docker"],
    },
    {
      year: "2024",
      phase: "ADVANCED",
      skills: ["TypeScript", "AWS", "CI/CD"],
    },
  ]

  return (
    <section className="relative w-full min-h-screen bg-transparent text-white py-24 overflow-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        .journey-section {
          font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `}</style>

      <div className="relative max-w-[1200px] mx-auto px-8 journey-section">
        {/* Header */}
        <div className="mb-20 text-center">
          <p className="text-pink-400 text-xl font-bold tracking-[0.4em] mb-2 uppercase">
            LEARNING PATH
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          {/* Static Background Line (Center) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-neutral-800"></div>
          
          {/* Animated Line (follows scroll) */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-pink-500 to-purple-500 origin-top"
            style={{
              scaleY: smoothProgress,
            }}
          />

          {/* Animated Moving Dot */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-pink-500 shadow-lg shadow-pink-500/50 z-20"
            style={{
              top: useTransform(smoothProgress, [0, 1], ["0%", "100%"])
            }}
          />

          {/* Journey Items - Zigzag */}
          {journey.map((item, index) => {
            const isLeft = index % 2 === 0

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`relative flex items-start mb-20 last:mb-0 ${
                  isLeft ? "justify-start" : "justify-end"
                }`}
              >
                {/* Content */}
                <div className={`w-[45%] ${isLeft ? "pr-12 text-right" : "pl-12 text-left"}`}>
                  {/* Year */}
                  <div className="mb-2">
                    <span className="text-3xl font-black text-neutral-600">{item.year}</span>
                  </div>

                  {/* Phase */}
                  <h3 className="text-xl font-bold tracking-tight text-white mb-3">
                    {item.phase}
                  </h3>

                  {/* Skills */}
                  <div className={`flex flex-wrap gap-2 ${isLeft ? "justify-end" : "justify-start"}`}>
                    {item.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs text-neutral-400 border border-white/20 tracking-wide hover:border-pink-500/50 hover:text-white transition-all"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Static Dot at Center */}
                <div className="absolute left-1/2 -translate-x-1/2 top-2 w-3 h-3 rounded-full border-2 border-neutral-600 bg-black z-10"></div>

                {/* Connector Line */}
                <div
                  className={`absolute top-3 w-10 h-[1px] bg-white/20 ${
                    isLeft ? "right-1/2 mr-[6px]" : "left-1/2 ml-[6px]"
                  }`}
                ></div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}