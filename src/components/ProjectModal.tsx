"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/data/projects";
import { X, ArrowRight } from "lucide-react";
import { useEffect } from "react";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
  onNext?: () => void;
};

export default function ProjectModal({ project, onClose, onNext }: ProjectModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-12 overflow-y-auto"
        >
          <div className="absolute top-8 right-8 z-50">
            <button
              onClick={onClose}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-hover text-white"
            >
              <X size={24} />
            </button>
          </div>

          <motion.div
            layoutId={`project-container-${project.id}`}
            className={`w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 pt-16 lg:pt-0 ${
              project.orientation === "portrait" ? "items-center justify-center lg:justify-start" : ""
            }`}
          >
            <div
              className={`relative rounded-xl overflow-hidden bg-neutral-900 flex-shrink-0 ${
                project.orientation === "portrait"
                  ? "h-[60vh] lg:h-[85vh] aspect-[9/16] mx-auto lg:mx-0"
                  : "w-full lg:w-2/3 h-[40vh] lg:h-[70vh]"
              }`}
            >
              <motion.img
                layoutId={`project-image-${project.id}`}
                src={project.thumbnail}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {project.video && (
                <video
                  src={project.video}
                  className="absolute inset-0 w-full h-full object-cover z-10"
                  autoPlay
                  controls
                  playsInline
                  poster={project.thumbnail}
                />
              )}
            </div>

            <div className="w-full lg:w-1/3 flex flex-col gap-8 py-4">
              <div>
                <motion.div
                  layoutId={`project-category-${project.id}`}
                  className="text-sm font-bold tracking-widest text-accent mb-2 uppercase"
                >
                  {project.category}
                </motion.div>
                <motion.h2
                  layoutId={`project-title-${project.id}`}
                  className="text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase leading-none"
                >
                  {project.title}
                </motion.h2>
              </div>

              <div className="text-white/70 text-lg leading-relaxed font-light">
                {project.description}
              </div>

              <div className="flex flex-col gap-6 pt-6 border-t border-white/10">
                <div>
                  <h4 className="text-xs font-bold tracking-widest text-white/50 mb-2 uppercase">My Role</h4>
                  <p className="text-white/90">{project.role.join(" · ")}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-widest text-white/50 mb-2 uppercase">Tools Used</h4>
                  <p className="text-white/90">{project.software.join(" · ")}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-widest text-white/50 mb-2 uppercase">Year</h4>
                  <p className="text-white/90">{project.year}</p>
                </div>
              </div>

              {onNext && (
                <button
                  onClick={onNext}
                  className="mt-auto group flex items-center gap-3 text-sm font-bold tracking-widest uppercase cursor-hover self-start hover:text-accent transition-colors py-4"
                >
                  Next Project
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
