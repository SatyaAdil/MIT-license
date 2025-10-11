"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const bios = {
  en: `Hi there! I'm Satya Adil Faishal, a passionate Software Engineer and Web Developer. 
I specialize in creating aesthetic and high-performance web applications, blending cutting-edge technology with engaging visual designs. 
From crafting responsive dashboards to interactive user interfaces, I focus on delivering experiences that are both functional and delightful. 
I primarily work with React, Next.js, Laravel, and Livewire, bringing full-stack projects to life with precision and creativity.`,

  jp: `こんにちは！サティア・アディル・ファイシャルです。情熱的なソフトウェアエンジニア兼ウェブ開発者です。
最先端の技術と魅力的なデザインを組み合わせ、美しく高性能なウェブアプリケーションを作ることを得意としています。
レスポンシブなダッシュボードからインタラクティブなユーザーインターフェースまで、機能的で心地よい体験を提供することに注力しています。
主にReact、Next.js、Laravel、Livewireを使い、フルスタックプロジェクトを正確かつ創造的に実現します。`
}

function TypingBio() {
  const [text, setText] = useState("")
  const [lang, setLang] = useState<keyof typeof bios>("en")
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const currentBio = bios[lang]
    if (index < currentBio.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + currentBio[index])
        setIndex(index + 1)
      }, 20) // kecepatan typing
      return () => clearTimeout(timeout)
    } else {
      const switchTimeout = setTimeout(() => {
        setLang(lang === "en" ? "jp" : "en")
        setText("")
        setIndex(0)
      }, 2000) // delay sebelum ganti bahasa
      return () => clearTimeout(switchTimeout)
    }
  }, [index, lang])

  return (
    <p className="text-lg text-neutral-200 leading-relaxed mb-6 whitespace-pre-wrap">
      {text}
      <span className="animate-pulse">|</span>
    </p>
  )
}

export default function ProfileSection() {
  return (
    <section id="profile" className="relative w-full min-h-screen bg-transparent text-white py-20 overflow-hidden">
      <div className="relative px-30 mb-20 pt-12">
        <motion.h4
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          animate={{
            color: ["#0096FF", "#A0D8EF", "#87CEFA", "#0096FF"], 
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeOut"
          }}
          className="uppercase tracking-[0.4em] text-xl mb-2 font-bold"
        >
          はじめに
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

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-16 max-w-6xl mx-auto text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
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

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-[600px]"
        >
          <h3 className="text-lg font-light mb-2">Hi there!</h3>

          {/* Ganti teks bio statis dengan TypingBio */}
          <TypingBio />
        </motion.div>
      </div>
    </section>
  )
}
