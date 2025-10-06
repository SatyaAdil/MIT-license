"use client"

import { 
  SiHtml5, 
  SiCss3, 
  SiJavascript, 
  SiReact, 
  SiTailwindcss, 
} from "react-icons/si"

export default function SkillsSection() {
  return (
    <section className="flex flex-wrap gap-6 justify-center mt-10">
      <SiHtml5 className="text-5xl text-orange-500" />
      <SiCss3 className="text-5xl text-blue-500" />
      <SiJavascript className="text-5xl text-yellow-400" />
      <SiReact className="text-5xl text-cyan-400" />
      <SiTailwindcss className="text-5xl text-sky-400" />
    </section>
  )
}
