"use client"

import { useState, useRef, useEffect } from "react"
import { Pause, Play, SkipForward, SkipBack, Volume2, VolumeX, X } from "lucide-react"

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const currentSong = {
    title: "Ambient Space",
    artist: "Unknown Artist",
    cover: "/abstract-soundscape.png",
    file: "/music/ambient.mp3",
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <>
      {/* Mini Badge */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-[70px] right-6 z-50 flex items-center gap-3 backdrop-blur-md border px-3 py-2 rounded-xl shadow-lg transition-all
          ${
            isPlaying
              ? "bg-white/25 border-white/30 shadow-white/30"
              : "bg-white/15 border-white/20 hover:bg-white/25"
          }
        `}
      >
        <img src={currentSong.cover} alt={currentSong.title} className="w-8 h-8 rounded-lg object-cover" />
        <div className="text-left">
          <p className="text-xs font-medium text-white truncate">{currentSong.title}</p>
          <p className="text-[10px] text-white/70 truncate">{currentSong.artist}</p>
        </div>
      </button>

      {/* Audio Element */}
      <audio ref={audioRef} src={currentSong.file} loop />

      {/* Panel Besar */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 bg-white/15 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-lg animate-slide-up z-50">
          <button
            onClick={() => {
              setIsOpen(false) // ✅ TUTUP PANEL SAJA
            }}
            className="absolute top-2 right-2 text-white/70 hover:text-white"
          >
            <X />
          </button>

          <div className="flex items-center gap-4">
            <img src={currentSong.cover} alt={currentSong.title} className="w-14 h-14 rounded-lg object-cover" />
            <div>
              <p className="text-sm font-medium text-white">{currentSong.title}</p>
              <p className="text-xs text-white/70">{currentSong.artist}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mt-4">
            <button className="p-2 hover:bg-white/10 rounded-full">
              <SkipBack className="text-white w-4 h-4" />
            </button>
            <button className="p-3 bg-white/20 hover:bg-white/30 rounded-full" onClick={togglePlay}>
              {isPlaying ? <Pause className="text-white w-5 h-5" /> : <Play className="text-white w-5 h-5" />}
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full">
              <SkipForward className="text-white w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <button onClick={() => setVolume(volume > 0 ? 0 : 0.5)}>
              {volume > 0 ? <Volume2 className="text-white" /> : <VolumeX className="text-white" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      )}
    </>
  )
}
