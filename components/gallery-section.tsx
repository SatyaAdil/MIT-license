"use client"

import { useState } from "react"

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const photos = [
    { src: "/portrait-photo-developer.jpg", alt: "Portrait" },
    { src: "/coding-workspace-setup.jpg", alt: "Workspace" },
    { src: "/tech-conference-speaking.jpg", alt: "Conference" },
    { src: "/team-collaboration.png", alt: "Team" },
    { src: "/hackathon-coding-event.jpg", alt: "Hackathon" },
    { src: "/outdoor-nature-hiking.jpg", alt: "Outdoor" },
  ]

  return (
    <section id="gallery" className="relative py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 text-balance">Life Gallery</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Moments captured from my journey as a developer and beyond
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => setSelectedImage(photo.src)}
            >
              <img
                src={photo.src || "/placeholder.svg"}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage || "/placeholder.svg"}
              alt="Selected"
              className="max-w-full max-h-full rounded-lg"
            />
          </div>
        )}
      </div>
    </section>
  )
}
