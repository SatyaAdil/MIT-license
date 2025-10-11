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
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const songs = [
    {
      title: "Orange (オレンジ, Orenji)",
      artist: "7!!",
      cover: "https://tse1.mm.bing.net/th/id/OIP.7xyGA7XRPrY3rOewA5MkgwAAAA?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
      file: "/music/7!! - Orange.mp3",
    },
    {
      title: "WILDFLOWER",
      artist: "Billie Eilish",
      cover: "https://i.ytimg.com/vi/wKBYEhTgoHU/maxresdefault.jpg",
      file: "/music/Billie Eilish WILDFLOWER.mp3",
    },
    {
      title: "Rindunya Hatiku",
      artist: "Fira Cantika",
      cover: "https://tse2.mm.bing.net/th/id/OIP.CW4sBQbTmvDWFw0CnAjwBwHaJQ?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
      file: "/music/dangdut rinduku.mp3",
    },
    {
      title: "DJ Beda Agama",
      artist: "DJ Manikci",
      cover: "https://is3-ssl.mzstatic.com/image/thumb/Music116/v4/63/2a/fa/632afa23-95de-e2f8-e63f-7936f9beff4e/85bb0ef6-6319-4386-ac43-fa9a0ba4d324.jpg/1200x1200bf-60.jpg",
      file: "/music/DjTikotok.mp3",
    },
    {
      title: "Wali",
      artist: "DJ Emang Dasar",
      cover: "https://tse3.mm.bing.net/th/id/OIP.ZcpvwZnN0Co7F6W5rnk7MQHaFX?cb=12&w=610&h=442&rs=1&pid=ImgDetMain&o=7&rm=3",
      file: "/music/DjWali.mp3",
    },
  ];

  const currentSong = songs[currentSongIndex];

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
    const handleEnded = () => {
      playNext();
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSongIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    setCurrentTime(0);
    if (isPlaying && audioRef.current) {
      setTimeout(() => {
        audioRef.current?.play();
      }, 100);
    }
  };

  const playPrevious = () => {
    const prevIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(prevIndex);
    setCurrentTime(0);
    if (isPlaying && audioRef.current) {
      setTimeout(() => {
        audioRef.current?.play();
      }, 100);
    }
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
          className="fixed top-23 right-5 z-50"
        >
          <motion.button
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 backdrop-blur-xl bg-white/100 border border-gray-200 px-1 py-1 rounded-lg shadow-xl hover:shadow-2xl transition-all min-w-[200px]"
          >
            <img
              src={currentSong.cover}
              alt={currentSong.title}
              className="w-11 h-11 rounded-md object-cover flex-shrink-0"
            />
            <div className="text-left flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate leading-snug">
                {currentSong.artist}
              </p>
              <p className="text-xs text-gray-500 truncate leading-snug">{currentSong.title}</p>
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-32 right-5 w-[200px] bg-white/100 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Album Cover - FULL WIDTH NO PADDING */}
            <div className="relative">
              <img
                src={currentSong.cover}
                alt={currentSong.title}
                className="w-full h-[180px] object-cover"
              />
            </div>

            {/* Song Info & Controls - COMPACT PADDING */}
            <div className="px-4 pb-4 pt-3">
              {/* Song Info */}
              <div className="text-center mb-3">
                <h3 className="text-sm font-bold text-gray-900 mb-0.5">
                  {currentSong.artist}
                </h3>
                <p className="text-xs text-gray-500">{currentSong.title}</p>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-[10px] text-gray-400 mb-1.5">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  step="0.1"
                  value={currentTime}
                  onChange={handleProgressChange}
                  className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer"
                />
              </div>

              {/* Playback Controls - SMALLER BUTTONS */}
              <div className="flex items-center justify-center gap-2 mb-3">
                <button 
                  onClick={playPrevious}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <SkipBack className="text-gray-700 w-4 h-4" />
                </button>
                <button
                  className="p-3 bg-gray-900 hover:bg-gray-800 rounded-full transition-colors"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="text-white w-5 h-5" fill="white" />
                  ) : (
                    <Play className="text-white w-5 h-5 ml-0.5" fill="white" />
                  )}
                </button>
                <button 
                  onClick={playNext}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <SkipForward className="text-gray-700 w-4 h-4" />
                </button>
              </div>

              {/* Volume Control - COMPACT */}
              <div className="flex items-center">
                <button 
                  onClick={() => setVolume(volume > 0 ? 0 : 0.2)}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {volume > 0 ? (
                    <Volume2 className="w-4 h-3" />
                  ) : (
                    <VolumeX className="w-4 h-3" />
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
                    className="flex-1 h-1 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <span className="text-[10px] text-gray-500 font-medium w-7 text-right">
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