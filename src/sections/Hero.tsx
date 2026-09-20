"use client";

import { motion } from "framer-motion";
import Button from "@/components/Button";
import { useEffect, useRef } from "react";
import NoirVigilante from "@/components/NoirVigilante";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const storiesRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6; // Slow down the video for a more cinematic feel
    }
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden pt-20 pb-32">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-20 blur-[2px]"
          src="https://www.w3schools.com/html/mov_bbb.mp4"
        />
        {/* Dark overlay with slight gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/40 to-[#050505]" />
        {/* Additional radial gradient for atmospheric lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(122,137,156,0.05)_0%,rgba(0,0,0,0)_80%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center text-center justify-center flex-1">
        
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} // smooth easeOut
          className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold tracking-tighter uppercase leading-[0.95] text-balance max-w-6xl"
        >
          I turn raw footage<br />
          <span ref={storiesRef} className="text-white/60 relative inline-block">
            into visual stories.
            <NoirVigilante targetRef={storiesRef} />
          </span>
        </motion.h1>

        {/* Identity & Hierarchy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 mb-16 flex flex-col items-center gap-4"
        >
          <p className="text-lg md:text-xl font-bold tracking-[0.3em] text-accent uppercase">
            K M Afreed
          </p>
          <div className="h-[1px] w-12 bg-white/20" />
          <p className="text-white/50 tracking-[0.2em] text-xs md:text-sm uppercase font-light">
            Video Editor & Visual Creator
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-6 z-20"
        >
          <Button href="#showreel" showArrow>Watch Showreel</Button>
          <Button href="#work" variant="outline">View My Work</Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
      >
        <span className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-16 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>

      {/* Location Block */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1.5 }}
        className="absolute bottom-12 right-6 md:right-12 flex flex-col items-end gap-1 z-10 text-right"
      >
        <span className="text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase">Located In</span>
        <span className="text-xs text-white/70 font-light tracking-[0.1em] uppercase">Kulshekar, Mangaluru, India</span>
      </motion.div>
    </section>
  );
}
