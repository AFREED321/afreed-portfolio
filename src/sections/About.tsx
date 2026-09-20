"use client";

import { motion } from "framer-motion";
import Button from "@/components/Button";

export default function About() {
  return (
    <section id="about" className="py-32 w-full relative z-10 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-7xl font-display font-bold uppercase tracking-tighter leading-[0.95]"
            >
              I don't just edit videos.<br />
              <span className="text-accent">I make people stop scrolling.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/70 text-lg md:text-xl font-light leading-relaxed max-w-xl"
            >
              <p className="mb-6">
                I'm K M Afreed, a video editor and visual creator specializing in high-impact, cinematic content.
                With a deep understanding of rhythm, pacing, and visual storytelling, I craft videos that don't just look good—they perform.
              </p>
              <p>
                From high-end commercial campaigns to fast-paced social media reels, I combine advanced editing techniques, motion graphics, and immersive sound design to elevate every frame.
              </p>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col items-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full aspect-[4/5] max-w-md mx-auto relative rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 cursor-hover group"
            >
              <img
                src="/profile.jpg"
                alt="K M Afreed Portrait"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button href="/resume.pdf" variant="outline" target="_blank">
                View Resume
              </Button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
