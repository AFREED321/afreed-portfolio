"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/context/AudioContext";

export default function MusicControl() {
  const { isPlaying, isFading, toggleSound } = useAudio();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-40 select-none pointer-events-auto"
    >
      <button
        onClick={toggleSound}
        aria-label={isPlaying ? "Mute background music" : "Play background music"}
        className={`group cursor-hover flex items-center gap-3 px-4 py-2.5 rounded-full border text-xs font-semibold tracking-wider uppercase backdrop-blur-md transition-all duration-300 shadow-2xl ${
          isPlaying
            ? "bg-neutral-900/90 border-accent/40 text-white shadow-accent/10 hover:border-accent/80 hover:shadow-accent/20"
            : "bg-neutral-950/80 border-white/10 text-white/70 hover:text-white hover:border-white/25 hover:bg-neutral-900/80"
        }`}
      >
        {/* Equalizer Waveform / Icon */}
        <div className="relative flex items-center justify-center w-4 h-4">
          {isPlaying ? (
            <div className="flex items-end justify-center gap-[2px] h-3.5 w-3.5">
              <motion.span
                animate={{ height: ["20%", "100%", "40%", "80%", "20%"] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-[2px] bg-accent rounded-full"
              />
              <motion.span
                animate={{ height: ["60%", "30%", "100%", "30%", "60%"] }}
                transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                className="w-[2px] bg-accent rounded-full"
              />
              <motion.span
                animate={{ height: ["40%", "90%", "20%", "100%", "40%"] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="w-[2px] bg-accent rounded-full"
              />
              <motion.span
                animate={{ height: ["80%", "20%", "70%", "40%", "80%"] }}
                transition={{ duration: 0.75, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
                className="w-[2px] bg-accent rounded-full"
              />
            </div>
          ) : (
            <VolumeX className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
          )}
        </div>

        {/* Text Status */}
        <div className="flex items-center gap-1.5 font-display">
          <span>{isPlaying ? "SOUND ON" : "SOUND OFF"}</span>
          {isFading && (
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-[9px] text-accent/80 font-normal lowercase tracking-normal"
            >
              (fading...)
            </motion.span>
          )}
        </div>

        {/* Ambient subtle glow when active */}
        {isPlaying && (
          <span className="absolute -inset-0.5 rounded-full bg-accent/20 blur-sm -z-10 animate-pulse pointer-events-none" />
        )}
      </button>
    </motion.div>
  );
}
