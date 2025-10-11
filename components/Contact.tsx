"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const StayInTouch = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const contacts = [
    {
      id: 1,
      image: "https://cdn-icons-png.flaticon.com/512/732/732200.png", // Email
      title: "Email",
      description:
        "I always check up on my email daily, this is my primary contact method",
      link: "mailto:your.email@example.com",
    },
    {
      id: 2,
      image: "https://cdn-icons-png.flaticon.com/512/2111/2111370.png", // Discord
      title: "Discord",
      description:
        "I use this daily for multi purposes, add me if you need real-time conversation",
      link: "https://discord.com",
    },
    {
      id: 3,
      image: "https://cdn-icons-png.flaticon.com/512/174/174855.png", // Instagram
      title: "Instagram",
      description:
        "My daily basis SNS (Social Networking Service), follow me to see my daily life!",
      link: "https://instagram.com",
    },
    {
      id: 4,
      image: "https://cdn-icons-png.flaticon.com/512/2111/2111646.png", // Telegram pesawat biru
      title: "Telegram",
      description:
        "I rarely use Telegram, but feel free to send me text on this platform anytime",
      link: "https://telegram.org",
    },
    {
      id: 5,
      image: "https://cdn-icons-png.flaticon.com/512/174/174857.png", // LinkedIn
      title: "Linkedin",
      description:
        "Learn more about my professional career background on Linkedin",
      link: "https://linkedin.com",
    },
    {
      id: 6,
      image: "https://cdn-icons-png.flaticon.com/512/25/25231.png", // GitHub
      title: "Github",
      description:
        "Find all my personal public project source code and contributions here",
      link: "https://github.com",
    },
    {
      id: 7,
      image: "https://cdn-icons-png.flaticon.com/512/733/733635.png", // X / Twitter
      title: "X",
      description:
        "Follow me on X (Twitter) for short updates, news, and insights",
      link: "https://twitter.com",
    },
    {
      id: 8,
      image: "https://cdn-icons-png.flaticon.com/512/3046/3046123.png", // TikTok
      title: "TikTok",
      description:
        "Check out my TikTok videos for fun and creative content",
      link: "https://www.tiktok.com",
    },
  ];

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen bg-transparent text-white py-20 overflow-hidden"
    >
      <div className="relative px-30 mb-20 pt-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          animate={{
            color: ["#0096FF", "#A0D8EF", "#87CEFA", "#0096FF"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="text-xl tracking-[0.5em] uppercase mb-2 font-bold"
        >
          連絡
        </motion.p>
        <h1 className="text-[8rem] font-black tracking-tight leading-none text-white mb-16">
          CONTACT
        </h1>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-slate-800 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-slate-800 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-lg md:text-4xl font-light text-white mb-8 tracking-wide">
            Stay In Touch
          </h1>

          <div className="flex justify-center gap-3 mb-1">
            {[{ delay: 0.2 }, { delay: 0 }, { delay: 0.4 }].map(
              (dot, index) => (
                <motion.div
                  key={index}
                  className="w-4 h-4 bg-white rounded-none"
                  animate={{
                    y: [0, -12, 0],
                    backgroundColor: ["#ffffff", "#60a5fa", "#ffffff"],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: dot.delay,
                  }}
                />
              )
            )}
          </div>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            If you're interested in hiring me or collaborating, feel free to
            reach out for recruitment, partnership or follow to stay in touch
          </p>
        </div>

        <div className="space-y-12">
          {[0, 1].map((row) => (
            <div
              key={row}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {contacts.slice(row * 4, row * 4 + 4).map((contact, index) => {
                const actualIndex = row * 4 + index;
                const isHovered = hoveredIndex === actualIndex;

                return (
                  <a
                    key={contact.id}
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredIndex(actualIndex)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="group flex gap-4"
                  >
                    <div className="flex-shrink-0">
                      <div
                        className={`w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center transition-all duration-300 ${
                          isHovered ? "bg-white/20" : ""
                        }`}
                      >
                        <img
                          src={contact.image}
                          alt={contact.title}
                          className="w-6 h-6"
                        />
                      </div>
                    </div>

                    <div className="flex-grow">
                      <h3
                        className={`text-lg font-semibold mb-2 flex items-center gap-2 transition-all duration-300 ${
                          isHovered ? "text-white" : "text-gray-200"
                        }`}
                      >
                        {contact.title}
                        <svg
                          className={`w-4 h-4 transition-all duration-300 ${
                            isHovered
                              ? "translate-x-1 -translate-y-1 opacity-100"
                              : "opacity-0"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 7h10v10M7 17L17 7"
                          />
                        </svg>
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {contact.description}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StayInTouch;
