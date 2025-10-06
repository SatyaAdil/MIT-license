"use client"

import { useState } from "react"
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiLaravel,
  SiPhp,
  SiGit,
  SiGithub,
  SiVite,
  SiDocker,
  SiPostman,
  SiComposer,
} from "react-icons/si"
import type { IconType } from "react-icons"

// 🔹 Custom Icon: Visual Studio Code (karena tidak ada di react-icons)
const VsCodeIcon: IconType = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4 text-blue-400"
  >
    <path d="M23.498 2.235a.75.75 0 0 0-.852-.13l-4.881 2.437-7.001 4.843L6.24 6.41a.75.75 0 0 0-.932.046l-4.5 4a.75.75 0 0 0 0 1.088l4.5 4a.75.75 0 0 0 .932.046l4.524-3.075 7.001 4.843 4.88 2.437a.75.75 0 0 0 1.084-.67V2.915a.75.75 0 0 0-.631-.68Zm-5.733 4.58v10.37l-5.9-3.972 5.9-3.972Z" />
  </svg>
)

// 🔹 Type definition for skills
interface Skill {
  icon: IconType
  name: string
  color: string
}

interface SkillSection {
  description: string
  skills: Skill[]
}

const skillSections: Record<string, SkillSection> = {
  FRONTEND: {
    description:
      "I blend artwork with cutting-edge technology, designing immersive visual and functional user interface and experiences",
    skills: [
      { icon: SiReact, name: "React", color: "text-cyan-400" },
      { icon: SiNextdotjs, name: "Next.js", color: "text-white" },
      { icon: SiJavascript, name: "JavaScript", color: "text-yellow-400" },
      { icon: SiTypescript, name: "TypeScript", color: "text-blue-500" },
      { icon: SiTailwindcss, name: "Tailwind", color: "text-sky-400" },
      { icon: SiHtml5, name: "HTML5", color: "text-orange-500" },
      { icon: SiCss3, name: "CSS3", color: "text-blue-500" },
    ],
  },
  BACKEND: {
    description:
      "While backend development is not my primary expertise, I have foundational knowledge and minimal experience in developing APIs",
    skills: [
      { icon: SiLaravel, name: "Laravel", color: "text-red-500" },
      { icon: SiPhp, name: "PHP", color: "text-indigo-400" },
      { icon: SiNodedotjs, name: "Node.js", color: "text-green-500" },
      { icon: SiExpress, name: "Express", color: "text-gray-400" },
      { icon: SiMysql, name: "MySQL", color: "text-blue-400" },
      { icon: SiMongodb, name: "MongoDB", color: "text-green-400" },
    ],
  },
  UTILITIES: {
    description:
      "Version control, deployment, and development tools that power an efficient workflow",
    skills: [
      { icon: SiGit, name: "Git", color: "text-orange-600" },
      { icon: SiGithub, name: "GitHub", color: "text-gray-300" },
      { icon: SiDocker, name: "Docker", color: "text-blue-500" },
      { icon: SiPostman, name: "Postman", color: "text-orange-400" },
      { icon: SiComposer, name: "Composer", color: "text-yellow-600" },
      { icon: SiVite, name: "Vite", color: "text-yellow-300" },
      { icon: VsCodeIcon, name: "VS Code", color: "text-blue-400" },
    ],
  },
}

const categories = ["ALL", "FRONTEND", "BACKEND", "UTILITIES"]

export default function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState("ALL")

  const filteredSections =
    activeFilter === "ALL"
      ? skillSections
      : { [activeFilter]: skillSections[activeFilter] }

  const totalSkills = Object.values(skillSections).reduce(
    (acc, section) => acc + section.skills.length,
    0
  )

  return (
    <section className="relative w-full min-h-screen bg-transparent text-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
      {/* 🔹 Header */}
      <div className="text-center mt-12">
          <p className="text-pink-400 text-sm font-bold tracking-[0.4em] mb-2 uppercase">
            OVERVIEW
          </p>
          <p className="text-neutral-500 text-xs tracking-[0.15em] uppercase">
            List of featured portfolio
          </p>
        <p className="text-gray-500 text-xs">
          {totalSkills} skills across {Object.keys(skillSections).length} categories
        </p>
      </div>

      {/* 🔹 Filter Tabs */}
      <div className="flex justify-center gap-2 mb-12 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-5 py-2 rounded-md text-xs font-medium uppercase tracking-wider transition-all duration-200 ${
              activeFilter === category
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 🔹 Skills Sections */}
      <div className="space-y-12">
        {Object.entries(filteredSections).map(([sectionName, section]) => (
          <div key={sectionName} className="py-6">
            <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider text-center">
              {sectionName}
            </h3>

            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {section.skills.map((skill: Skill) => {
                const Icon = skill.icon
                return (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2.5 bg-gray-900/40 hover:bg-gray-800/60 border border-gray-700/50 rounded-lg px-4 py-2.5 transition-all duration-200 hover:border-gray-600/70 backdrop-blur-sm"
                  >
                    <Icon className={`text-base ${skill.color}`} />
                    <span className="text-white text-sm font-medium">
                      {skill.name}
                    </span>
                  </div>
                )
              })}
            </div>

            <p className="text-gray-400 text-sm text-center max-w-4xl mx-auto leading-relaxed">
              {section.description}
            </p>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}