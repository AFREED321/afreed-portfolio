"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

export default function Showreel() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="showreel" className="py-24 md:py-32 w-full relative z-10 bg-black">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Showreel 2026" 
          subtitle="A collection of my favorite edits, motion graphics, transitions, sound design and visual experiments."
        />

        <motion.div
          data-cursor={!isPlaying ? "play" : undefined}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative aspect-video w-full rounded-2xl overflow-hidden bg-neutral-900 border border-white/5"
        >
          {isPlaying ? (
            <video 
              src="/showreel.mp4" 
              controls 
              autoPlay 
              loop
              className="absolute inset-0 w-full h-full object-cover outline-none" 
            />
          ) : (
            <div className="w-full h-full group cursor-hover" onClick={() => setIsPlaying(true)}>
              <img
                src="/showreel-cover.jpg"
                alt="Showreel Thumbnail"
                className="absolute inset-0 w-full h-full object-cover opacity-80 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
              />
              
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

              {/* Custom Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex items-center justify-center h-24 w-24 md:h-32 md:w-32 rounded-full backdrop-blur-md bg-white/10 border border-white/20 group-hover:bg-white group-hover:scale-110 transition-all duration-500 ease-out">
                  <Play className="h-10 w-10 md:h-12 md:w-12 fill-white group-hover:fill-black text-transparent ml-2 transition-colors duration-500" />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
