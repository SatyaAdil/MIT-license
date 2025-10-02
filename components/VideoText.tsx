"use client";
import React from "react";

const VideoText: React.FC = () => {
  return (
    <div className="relative flex justify-center items-center w-full px-4">
      <h1
        className="text-[400px] md:text-[17vw] uppercase text-transparent"
        style={{
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          backgroundImage: "url('/video.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          fontFamily: "'Helvetica Neue', sans-serif",
          fontWeight: "1000",
          letterSpacing: "-0.1em", // Bisa adjust antara -0.08em sampai -0.12em
          textTransform: "uppercase",
        }}
      >
        SATYA_
      </h1>
    </div>
  );
};

export default VideoText;