"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoverState, setHoverState] = useState<"default" | "hover" | "text">("default");
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    // Hide cursor on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const cursorTarget = target.closest("[data-cursor]");
      
      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor");
        if (text) {
          setCursorText(text.toUpperCase());
          setHoverState("text");
          return;
        }
      }
      
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-hover")
      ) {
        setHoverState("hover");
        setCursorText("");
      } else {
        setHoverState("default");
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const isTextHover = hoverState === "text";
  const isNormalHover = hoverState === "hover";

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference flex items-center justify-center overflow-hidden"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isTextHover ? 5 : isNormalHover ? 2 : 1,
          backgroundColor: isTextHover ? "#fff" : "#fff",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
          mass: 0.5,
        }}
      >
        <AnimatePresence>
          {isTextHover && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[3px] font-bold tracking-widest text-black uppercase"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white/40 rounded-full pointer-events-none z-[99]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isNormalHover || isTextHover ? 1.5 : 1,
          opacity: isNormalHover || isTextHover ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
          mass: 0.5,
        }}
      />
    </>
  );
}
