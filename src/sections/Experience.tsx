"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 w-full relative z-10 bg-[#050505]">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Experience" 
          subtitle="My professional journey in video editing and post-production." 
        />

        <div className="relative max-w-4xl mx-auto mt-12">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 md:-translate-x-1/2" />

          <div className="flex flex-col gap-16 md:gap-24">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-start ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[11px] md:left-1/2 top-2 w-[9px] h-[9px] rounded-full bg-accent md:-translate-x-1/2 shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10" />

                {/* Date / Location (Left or Right side depending on index) */}
                <div className={`hidden md:block w-1/2 pt-1 ${index % 2 === 0 ? "text-right pr-16" : "text-left pl-16"}`}>
                  <h4 className="text-xl font-display font-bold text-white mb-2">{exp.company}</h4>
                  <p className="text-accent text-sm font-bold tracking-widest uppercase mb-1">{exp.period}</p>
                  <p className="text-white/40 text-xs tracking-widest uppercase">{exp.location}</p>
                </div>

                {/* Mobile Header (Hidden on Desktop) */}
                <div className="md:hidden pl-12 pt-0.5">
                  <h4 className="text-xl font-display font-bold text-white mb-1">{exp.company}</h4>
                  <p className="text-accent text-xs font-bold tracking-widest uppercase mb-1">{exp.period}</p>
                  <p className="text-white/40 text-xs tracking-widest uppercase">{exp.location}</p>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-16">
                  <h3 className="text-2xl font-bold uppercase tracking-wide text-white mb-6">
                    {exp.role}
                  </h3>
                  
                  <ul className="flex flex-col gap-4">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="text-white/60 font-light leading-relaxed flex items-start gap-3">
                        <span className="text-white/20 mt-2 text-xs">◆</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
