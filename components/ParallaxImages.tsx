"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function ParallaxImages() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [-100, 100])
  const y2 = useTransform(scrollYProgress, [0, 1], [-140, 140])
  const y3 = useTransform(scrollYProgress, [0, 1], [-180, 180])

  const size = "w-[220px] h-[220px] md:w-[260px] md:h-[260px]"

  const fadeInFromTop = {
    hidden: { opacity: 0, y: -100 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, delay, ease: [0.25, 0.1, 0.25, 1] }
    })
  }

  const fadeInFromBottom = {
    hidden: { opacity: 0, y: 100 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, delay, ease: [0.25, 0.1, 0.25, 1] }
    })
  }

  const fadeInFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: (delay: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 1.2, delay, ease: [0.25, 0.1, 0.25, 1] }
    })
  }

  const fadeInFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: (delay: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 1.2, delay, ease: [0.25, 0.1, 0.25, 1] }
    })
  }

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none select-none">
{/* IMG 1 - kiri atas */}
<motion.img
  src="/1.jpg"
  alt=""
  variants={fadeInFromLeft}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  custom={0.1}
  style={{ y: y1 }}
  animate={{ 
    y: [-25, 25, -25] 
  }}
  transition={{
    y: {
      duration: 4.5,
      repeat: Infinity,
      ease: [0.45, 0.05, 0.55, 0.95],
      repeatType: "mirror"
    }
  }}
  className={`absolute top-[12%] left-[6%] ${size} object-cover rounded-2xl shadow-lg`}
/>

{/* IMG 2 - overlap kanan bawah dari 1 */}
<motion.img
  src="/2.jpg"
  alt=""
  variants={fadeInFromLeft}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  custom={0.2}
  style={{ y: y2 }}
  animate={{ 
    y: [28, -28, 28] 
  }}
  transition={{
    y: {
      duration: 5,
      repeat: Infinity,
      ease: [0.45, 0.05, 0.55, 0.95],
      repeatType: "mirror"
    }
  }}
  className={`absolute top-[24%] left-[12%] ${size} object-cover rounded-2xl shadow-lg`}
/>

{/* IMG 3 - tengah kiri atas */}
<motion.img
  src="/3.jpg"
  alt=""
  variants={fadeInFromTop}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  custom={0.3}
  style={{ y: y3 }}
  animate={{ 
    y: [-30, 30, -30] 
  }}
  transition={{
    y: {
      duration: 5.5,
      repeat: Infinity,
      ease: [0.45, 0.05, 0.55, 0.95],
      repeatType: "mirror"
    }
  }}
  className={`absolute top-[8%] left-[32%] ${size} object-cover rounded-2xl shadow-lg`}
/>

{/* IMG 4 - tengah kanan atas */}
<motion.img
  src="/4.jpg"
  alt=""
  variants={fadeInFromTop}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  custom={0.4}
  style={{ y: y1 }}
  animate={{ 
    y: [-27, 27, -27] 
  }}
  transition={{
    y: {
      duration: 4.8,
      repeat: Infinity,
      ease: [0.45, 0.05, 0.55, 0.95],
      repeatType: "mirror"
    }
  }}
  className={`absolute top-[8%] left-[52%] ${size} object-cover rounded-2xl shadow-lg`}
/>

{/* IMG 5 - kanan atas */}
<motion.img
  src="/5.png"
  alt=""
  variants={fadeInFromRight}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  custom={0.5}
  style={{ y: y2 }}
  animate={{ 
    y: [-27, 27, -27] 
  }}
  transition={{
    y: {
      duration: 5.2,
      repeat: Infinity,
      ease: [0.45, 0.05, 0.55, 0.95],
      repeatType: "mirror"
    }
  }}
  className={`absolute top-[12%] right-[12%] ${size} object-cover rounded-2xl shadow-lg`}
/>

{/* IMG 6 - overlap kiri bawah dari 5 */}
<motion.img
  src="/6.jpg"
  alt=""
  variants={fadeInFromRight}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  custom={0.6}
  style={{ y: y3 }}
  animate={{ 
    y: [29, -29, 29] 
  }}
  transition={{
    y: {
      duration: 5.8,
      repeat: Infinity,
      ease: [0.45, 0.05, 0.55, 0.95],
      repeatType: "mirror"
    }
  }}
  className={`absolute top-[24%] right-[6%] ${size} object-cover rounded-2xl shadow-lg`}
/>

{/* IMG 7 - tengah bawah */}
<motion.img
  src="/7.png"
  alt=""
  variants={fadeInFromBottom}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  custom={0.7}
  style={{ y: y1 }}
  animate={{ 
    y: [-24, 24, -24] 
  }}
  transition={{
    y: {
      duration: 4.6,
      repeat: Infinity,
      ease: [0.45, 0.05, 0.55, 0.95],
      repeatType: "mirror"
    }
  }}
  className={`absolute top-[42%] left-[42%] ${size} object-cover rounded-2xl shadow-lg`}
/>
    </div>
  )
}