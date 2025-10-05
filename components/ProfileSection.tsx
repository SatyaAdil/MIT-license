"use client"

import { motion } from "framer-motion"

export default function ProfileSection() {
  return (
   <section className="relative w-full min-h-screen bg-transparent text-white py-20 overflow-hidden">
      {/* HEADER / SUBTITLE */}
      <div className="relative px-30 mb-20 pt-12">
        <motion.h4
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-neutral-400 uppercase tracking-[0.4em] text-sm mb-4"
        >
          Introduction
        </motion.h4>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[6rem] md:text-[8rem] font-extrabold text-white leading-none"
        >
          PROFILE
        </motion.h1>
      </div>

      {/* KONTEN */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-16 max-w-6xl">
        {/* FOTO KIRI */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-[240px] h-[240px] md:w-[280px] md:h-[280px] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        >
          <img
            src="pp.jpg"
            alt="Satya Adil"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* TEKS KANAN */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-[600px]"
        >
          <h3 className="text-lg font-light mb-2">Hi there! 👋</h3>
          <p className="text-neutral-300 mb-4">
            My name is <span className="font-semibold text-white">Satya Adil</span>, and I'm a{" "}
            <span className="text-pink-400 font-semibold">Software Engineer</span>.
          </p>

          <p className="text-lg text-neutral-200 leading-relaxed mb-6">
            I blend artwork with cutting-edge technology, designing immersive visual and functional
            user interfaces and experiences. Focused on crafting aesthetic and performant web
            applications using <span className="text-pink-400">React</span> and{" "}
            <span className="text-pink-400">Next.js</span>.
          </p>

          <button className="px-6 py-3 border-2 border-white/30 text-sm uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
            Contact Me
          </button>
        </motion.div>
      </div>
    </section>
  )
}
