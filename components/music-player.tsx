"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, SkipForward, SkipBack, Volume2, VolumeX, X } from "lucide-react";

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSong = {
    title: "Tying Knots",
    artist: "Aviino, Jared Janzen",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      {/* AUDIO ELEMENT */}
      <audio ref={audioRef} src={currentSong.file} />

      {/* MINI BUBBLE (collapsed state) */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-20 right-6 z-50"
        >
          <motion.button
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 backdrop-blur-xl bg-white/100 border border-gray-200 px-4 py-2.5 rounded-xl shadow-xl hover:shadow-2xl transition-all"
          >
            <img
              src={currentSong.cover}
              alt={currentSong.title}
              className="w-9 h-9 rounded-lg object-cover"
            />
            <div className="text-left pr-1">
              <p className="text-sm font-semibold text-gray-900 truncate max-w-[140px]">
                {currentSong.artist}
              </p>
              <p className="text-xs text-gray-500 truncate max-w-[140px]">{currentSong.title}</p>
            </div>
          </motion.button>
          
          {/* Arrow indicator - triangle shape with animation */}
          <div className="flex justify-center mt-2">
            <motion.div 
              animate={{ y: [0, 4, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-gray-400"
            />
          </div>
        </motion.div>
      )}

      {/* EXPANDED PLAYER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-32 right-6 w-[280px] bg-white/100 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Album Cover */}
            <div className="relative">
              <img
                src={currentSong.cover}
                alt={currentSong.title}
                className="w-full h-[280px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Song Info & Controls */}
            <div className="p-5">
              {/* Song Info */}
              <div className="text-center mb-4">
                <h3 className="text-base font-bold text-gray-900 mb-0.5">
                  {currentSong.artist}
                </h3>
                <p className="text-sm text-gray-500">{currentSong.title}</p>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  step="0.1"
                  value={currentTime}
                  onChange={handleProgressChange}
                  className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1.5">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <button className="p-2.5 hover:bg-gray-100 rounded-full transition-colors">
                  <SkipBack className="text-gray-700 w-5 h-5" />
                </button>
                <button
                  className="p-4 bg-gray-900 hover:bg-gray-800 rounded-full transition-colors"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="text-white w-6 h-6" fill="white" />
                  ) : (
                    <Play className="text-white w-6 h-6 ml-0.5" fill="white" />
                  )}
                </button>
                <button className="p-2.5 hover:bg-gray-100 rounded-full transition-colors">
                  <SkipForward className="text-gray-700 w-5 h-5" />
                </button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-3 px-2">
                <button 
                  onClick={() => setVolume(volume > 0 ? 0 : 0.2)}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {volume > 0 ? (
                    <Volume2 className="w-5 h-5" />
                  ) : (
                    <VolumeX className="w-5 h-5" />
                  )}
                </button>
                <div className="flex-1 flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="flex-1 h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <span className="text-xs text-gray-500 font-medium w-8 text-right">
                    {Math.round(volume * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}