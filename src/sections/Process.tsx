"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { processSteps } from "@/data/process";

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section id="process" className="py-32 w-full relative z-10 bg-[#0a0a0a] overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 mb-16">
        <SectionHeading title="From Raw To Final" subtitle="My systematic approach to crafting visual stories." />
      </div>

      <div className="h-[50vh] flex items-center relative">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 z-0" />
        
        <motion.div style={{ x }} className="flex gap-16 md:gap-32 px-6 md:px-24 absolute z-10">
          {processSteps.map((step, index) => (
            <div key={step.id} className="flex flex-col w-[300px] shrink-0 group cursor-hover relative">
              
              {/* Point on line */}
              <div className="absolute top-1/2 left-0 w-4 h-4 rounded-full bg-white/20 group-hover:bg-accent -translate-y-1/2 transition-colors duration-500" />
              <div className="absolute top-1/2 left-2 w-0 h-[1px] bg-accent -translate-y-1/2 group-hover:w-full transition-all duration-700 ease-out z-[-1]" />

              <div className="pb-12 h-1/2 flex flex-col justify-end">
                <span className="text-accent font-display text-2xl md:text-3xl font-bold mb-2 block transition-transform duration-300 group-hover:-translate-y-2">
                  {step.id}
                </span>
                <h3 className="text-3xl md:text-4xl font-display font-bold uppercase transition-transform duration-300 group-hover:-translate-y-2">
                  {step.title}
                </h3>
              </div>
              
              <div className="pt-12 h-1/2">
                <p className="text-white/60 font-light text-lg leading-relaxed transition-opacity duration-300 group-hover:text-white/90">
                  {step.description}
                </p>
              </div>

            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
