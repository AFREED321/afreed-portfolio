export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  thumbnail: string;
  video?: string;
  software: string[];
  role: string[];
  orientation?: "landscape" | "portrait";
};

export const projects: Project[] = [
  {
    id: "01",
    title: "Project 01",
    category: "CINEMATIC",
    year: "2025",
    description: "A dark, moody cinematic edit focusing on storytelling and advanced color grading techniques.",
    thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop",
    video: "/project1.mp4",
    software: ["Premiere Pro", "DaVinci Resolve"],
    role: ["Video Editing", "Color Grading", "Sound Design"],
  },
  {
    id: "02",
    title: "Project 02",
    category: "SPEEDRAMP",
    year: "2025",
    description: "High-energy speedramp montage with seamless transitions, beat-syncing, and dynamic motion blur.",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    video: "/project2.mp4",
    software: ["Premiere Pro", "After Effects"],
    role: ["Video Editing", "Time Remapping", "Sound Design"],
    orientation: "portrait",
  },
  {
    id: "03",
    title: "Project 03",
    category: "TYPOLOGY",
    year: "2026",
    description: "Sleek and professional commercial edit for a lifestyle brand highlighting their new collection.",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop",
    video: "/project3.mp4",
    software: ["Adobe Premiere Pro", "Adobe After Effects"],
    role: ["Video Editing", "Typology", "Color Grading", "SFX", "3D Motion"],
    orientation: "portrait",
  },
  {
    id: "04",
    title: "Project 04",
    category: "PROMOTIONAL",
    year: "2025",
    description: "Engaging promotional video content featuring dynamic cuts, text animation, and motion graphics designed to drive conversions.",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    video: "/project4.mp4",
    software: ["Premiere Pro", "After Effects"],
    role: ["Video Editing", "Motion Graphics"],
  },
];

export const categories = ["ALL", "CINEMATIC", "SPEEDRAMP", "TYPOLOGY", "PROMOTIONAL"];
