"use client";
import React from "react";

const VideoText: React.FC = () => {
  return (
    <div className="relative flex justify-center items-center w-full h-[400px] md:h-screen overflow-hidden">
      <h1
        className="text-[200px] md:text-[15vw] uppercase text-transparent"
        style={{
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          backgroundImage: "url('/video.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          fontFamily: "'Impact', 'Arial Black', 'Helvetica Neue', sans-serif",
          fontWeight: 900,
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
        }}
      >
        Satya'Adil
      </h1>
    </div>
  );
};

export default VideoText;