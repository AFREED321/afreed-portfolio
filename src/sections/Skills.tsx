"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { mainSkills, additionalSkills } from "@/data/skills";

export default function Skills() {
  return (
    <section className="py-24 md:py-32 w-full relative z-10 bg-black overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeading title="Arsenal" subtitle="The tools and techniques I use to bring ideas to life." />

        <div className="flex flex-col md:flex-row gap-16 lg:gap-32">
          
          <div className="flex-1">
            <h3 className="text-sm font-bold tracking-[0.2em] text-white/50 mb-8 uppercase">Core Software</h3>
            <div className="flex flex-col gap-6">
              {mainSkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group flex items-center gap-6 cursor-hover"
                >
                  <span className="text-2xl md:text-4xl font-display font-bold uppercase tracking-wide group-hover:text-accent transition-colors duration-300">
                    {skill}
                  </span>
                  <div className="h-[1px] flex-1 bg-white/10 group-hover:bg-accent/50 transition-colors duration-300" />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-bold tracking-[0.2em] text-white/50 mb-8 uppercase">Techniques & Focus</h3>
            <div className="flex flex-wrap gap-4">
              {additionalSkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="px-6 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-hover font-bold text-sm tracking-widest uppercase"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
