"use client";
import React from "react";
import VideoText from "./VideoText";

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Nama dengan video masking */}
      <VideoText />

      {/* Sub title Jepang */}
      <p className="mt-4 text-lg text-gray-300">サティア アディル</p>

      {/* Avatar / mascot */}
      <div className="mt-12">
        <img src="/robot.png" alt="avatar" className="w-32 h-32 mx-auto" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 text-white text-sm animate-bounce">
        Scroll Down
      </div>
    </section>
  );
};

export default HeroSection;
