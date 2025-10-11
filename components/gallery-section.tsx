"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import ParallaxImages from "../components/ParallaxImages"

export default function GallerySection() {
  const { scrollY } = useScroll()
  const yText = useTransform(scrollY, [0, 400], ["0%", "-20%"])

  return (
    <section className="relative w-full min-h-screen bg-transparent text-white overflow-hidden">
      <ParallaxImages />

      <motion.div
        style={{ y: yText }}
        className="absolute inset-0 flex flex-col justify-center items-center text-center px-6"
      >
        <motion.img
          src="/coder.png" 
          alt="StyDcode"
          initial={{ opacity: 1, scale: 1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-[300px] md:w-[500px] mb-6 drop-shadow-[0_5px_15px_rgba(255,255,255,0.3)]"
        />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-2xl text-gray-300 max-w-2xl"
        >
        </motion.p>
      </motion.div>
    </section>
  )
}
