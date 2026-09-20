"use client";

import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import { Play } from "lucide-react";
import { useState } from "react";

type ProjectCardProps = {
  project: Project;
  onClick: () => void;
};

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      data-cursor="view"
      layoutId={`project-container-${project.id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-neutral-900 aspect-video flex flex-col justify-end p-6 cursor-hover"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.img
        layoutId={`project-image-${project.id}`}
        src={project.thumbnail}
        alt={project.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-60 group-hover:opacity-40"
      />

      {isHovered && project.video && (
        <video
          src={project.video}
          className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-50 transition-opacity duration-700"
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="relative z-10 flex flex-col gap-2">
        <motion.div
          layoutId={`project-category-${project.id}`}
          className="text-xs font-bold tracking-widest text-accent uppercase"
        >
          {project.category}
        </motion.div>
        
        <div className="flex items-center justify-between">
          <motion.h3
            layoutId={`project-title-${project.id}`}
            className="text-2xl md:text-3xl font-display font-bold uppercase"
          >
            {project.title}
          </motion.h3>
          <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
            <Play className="h-5 w-5 fill-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
