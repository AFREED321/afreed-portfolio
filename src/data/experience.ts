export type Experience = {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
};

export const experiences: Experience[] = [
  {
    id: "01",
    role: "VIDEO EDITOR",
    company: "Freelance",
    location: "Remote",
    period: "2024 - Present",
    responsibilities: [
      "Edited short-form videos for Instagram and YouTube, focusing on strong hooks, pacing, captions, sound design, and retention.",
      "Created cinematic edits using motion graphics, visual effects, color grading, and music synchronization.",
      "Converted raw footage into platform-ready content optimized for social media.",
      "Managed the complete post-production workflow from footage organization to final export.",
    ],
  },
  {
    id: "02",
    role: "VIDEO EDITOR",
    company: "AZEDA",
    location: "Dubai, UAE",
    period: "2025",
    responsibilities: [
      "Edited social media and promotional video content for a Dubai-based furniture brand.",
      "Transformed raw footage into engaging short-form videos using dynamic cuts, transitions, text animation, sound design, and color grading.",
      "Created visually appealing product-focused edits designed to showcase furniture, interiors, and brand aesthetics.",
      "Collaborated with the team to understand content requirements and deliver edits according to the brand's visual style and deadlines.",
    ],
  },
  {
    id: "03",
    role: "VIDEO EDITOR",
    company: "TATTVIQ LAB",
    location: "Kulshekar, Mangaluru",
    period: "2025",
    responsibilities: [
      "Edited video content for Tattviq Lab's digital and promotional requirements.",
      "Created engaging short-form content using cuts, transitions, typography, sound design, and visual effects.",
      "Worked with provided footage and creative requirements to produce polished, platform-ready videos.",
    ],
  },
];
