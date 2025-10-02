"use client";
import React, { useRef, useEffect } from "react";
import VideoText from "./VideoText";

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden text-white">

      {/* Nama Jepang */}
      <div className="absolute top-[15%] left-[20.1%] z-10">
        <p className="text-3xl text-gray-400 tracking-[0.10em]">
          サティア アディル
        </p>
      </div>

      {/* VideoText */}
      <div className="absolute top-[10%] left-[20%] z-10">
        <VideoText />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 flex flex-col items-center gap-2 z-10">
        <div className="w-4 h-8 border-2 border-white rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
        </div>
        <p className="text-xs tracking-widest">Scroll</p>
      </div>
    </section>
  );
};

export default HeroSection;
