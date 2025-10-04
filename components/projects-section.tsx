"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

export default function ProjectsSection() {
  const projects = [
    {
      title: "Project Alpha",
      description: "A revolutionary web application built with Next.js and TypeScript",
      image: "/modern-web-app-dashboard.jpg",
      tags: ["Next.js", "TypeScript", "Tailwind"],
      link: "#",
    },
    {
      title: "Project Beta",
      description: "Interactive 3D experience using Three.js and React",
      image: "/3d-graphics-visualization.jpg",
      tags: ["React", "Three.js", "WebGL"],
      link: "#",
    },
    {
      title: "Project Gamma",
      description: "Full-stack e-commerce platform with real-time features",
      image: "/ecommerce-shopping-website.png",
      tags: ["Node.js", "PostgreSQL", "Redis"],
      link: "#",
    },
  ]

  const tagColors: Record<string, string> = {
    "Next.js": "bg-black text-white",
    "TypeScript": "bg-blue-600 text-white",
    "Tailwind": "bg-cyan-500 text-white",
    "React": "bg-sky-500 text-white",
    "Three.js": "bg-purple-600 text-white",
    "WebGL": "bg-green-600 text-white",
    "Node.js": "bg-green-700 text-white",
    "PostgreSQL": "bg-indigo-600 text-white",
    "Redis": "bg-red-600 text-white",
  }

  return (
    <section id="projects" className="relative py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-4">Featured Projects</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          A collection of my best work showcasing creativity and technical expertise
        </p>
        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="glass-effect group hover:border-primary/50 hover:shadow-lg hover:shadow-primary/30 transition-all overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image Section - Full Height */}
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden h-full min-h-[300px]">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <a
                        href={project.link}
                        className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </CardHeader>
                  
                  {/* Content Section - Side */}
                  <CardContent className="p-6 flex flex-col justify-center">
                    <CardTitle className="mb-2 text-2xl">{project.title}</CardTitle>
                    <CardDescription className="mb-4 text-base">{project.description}</CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs px-3 py-1 rounded-full ${tagColors[tag] || "bg-primary/20 text-primary"}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}