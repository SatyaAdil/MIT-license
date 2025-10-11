"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// 🔹 Komponen TypingText
function TypingText({ texts, speed = 80, pause = 1500 }: { texts: string[]; speed?: number; pause?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < texts[textIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + texts[textIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedText("");
        setCharIndex(0);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }, pause);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, textIndex, texts, speed, pause]);

  return (
    <p className="text-white text-base font-mono min-h-[2em]">
      {displayedText}
      <span className="animate-pulse">|</span>
    </p>
  );
}

const FloatingButtons = () => {
  const [visible, setVisible] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClosePopup = () => {
    console.log("Closing popup...");
    setPopupOpen(false);
  };

  return (
    <>
      {/* Last Updated - Sebelah Kiri */}
      <div className="fixed left-6 bottom-6 flex flex-col items-center gap-6 z-[100]">
        <div className="w-px h-20 bg-white/30"></div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-5 h-5">
          <path
            d="M7 10l5-5 5 5M12 15V5"
            strokeWidth="2"
            stroke="white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div>
          <p
            className="text-white text-xs font-medium whitespace-nowrap"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              letterSpacing: "0.05em",
              transform: "rotate(180deg)",
            }}
          >
            Last Updated - 21 August 2025
          </p>
        </div>
        <div className="w-px h-20 bg-white/30"></div>
      </div>

      {/* Scroll Top dan Gamepad - Sebelah Kanan */}
      <div className="fixed right-6 bottom-6 flex flex-col gap-4 z-[100] pointer-events-auto">
        {/* Scroll Top Button */}
        <button
          onClick={scrollToTop}
          className={`flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 ${
            visible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <img src="/scroll top.png" alt="Scroll Top" className="w-6 h-8" />
          <span className="text-xs mt-1 text-white">Scroll Top</span>
        </button>

        {/* Gamepad Icon */}
        <button
          onClick={() => setPopupOpen(true)}
          className="flex flex-col items-center justify-center transition-all duration-300 hover:scale-150"
        >
          <img src="/stik.png" alt="Gamepad" className="w-18 h-8" />
        </button>
      </div>

      {/* Popup */}
      <AnimatePresence>
        {popupOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-[200]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setPopupOpen(false)}
          >
            <motion.div
              className="relative bg-gray-900/30 backdrop-blur-xl rounded-xl shadow-lg p-6 w-72 text-center border border-white/30"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setPopupOpen(false)}
                className="absolute top-3 right-3 text-white hover:text-red-400 hover:bg-white/20 rounded-full p-1.5 transition-all z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Typing Text */}
              <div className="mt-4">
                <TypingText
                  texts={[
                    "「ロケットが壊れてしまった…」 😅",
                    "My rocket is broken… 😅",
                    "Roketku rusak… 😅",
                  ]}
                />
              </div>

              {/* Instruksi WASD */}
              <div className="mt-6 flex flex-col items-center gap-2">
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-gray-800 rounded-md text-white text-sm font-bold">W</span>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-gray-800 rounded-md text-white text-sm font-bold">A</span>
                  <span className="px-3 py-1 bg-gray-800 rounded-md text-white text-sm font-bold">S</span>
                  <span className="px-3 py-1 bg-gray-800 rounded-md text-white text-sm font-bold">D</span>
                </div>
                <p className="text-xs text-white mt-2">Use the WASD keys to move</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingButtons;