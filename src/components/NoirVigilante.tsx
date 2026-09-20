"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

interface NoirVigilanteProps {
  targetRef?: React.RefObject<HTMLSpanElement | null>;
}

const FULL_DIALOGUE = "HEY FELLAS... READY TO MAKE SOMETHING WORTH WATCHING?";

export default function NoirVigilante({ targetRef }: NoirVigilanteProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const webPathRef = useRef<SVGPathElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const isDialogueActiveRef = useRef(false);
  const typewriterTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoHideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Custom Voice Audio Player
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Primary: public/audio/spider-noir-voice.mp3
      // Fallback: public/audio/spider-noir-voice.wav
      const audio = new Audio("/audio/spider-noir-voice.mp3");
      audio.volume = 0.85;
      
      // Fallback to wav if mp3 is missing
      audio.onerror = () => {
        if (audio.src.endsWith(".mp3")) {
          audio.src = "/audio/spider-noir-voice.wav";
        }
      };

      audioRef.current = audio;
    }
  }, []);

  // Initial Entrance Animation & Loop setup
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const webPath = webPathRef.current;
      const character = characterRef.current;
      const bubble = bubbleRef.current;

      if (!container || !webPath || !character || !bubble) return;

      if (prefersReducedMotion) {
        gsap.set(character, { y: 0, opacity: 1, rotate: 0 });
        gsap.set(webPath, { opacity: 0.6 });
        return;
      }

      // Initial off-screen states
      gsap.set(character, { y: -400, opacity: 0, rotate: -8 });
      gsap.set(webPath, { strokeDasharray: 450, strokeDashoffset: 450, opacity: 0 });
      gsap.set(bubble, { scale: 0.95, opacity: 0, y: 8 });

      // Master Entrance Timeline
      const tl = gsap.timeline({
        delay: 0.7,
        defaults: { ease: "power3.out" },
      });

      // 1. Web shoots down from top of viewport to STORIES text
      tl.to(webPath, {
        strokeDashoffset: 0,
        opacity: 0.8,
        duration: 0.45,
        ease: "power2.inOut",
      })
      // 2. Character drops down along web
      .to(
        character,
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "back.out(1.1)",
        },
        "-=0.1"
      )
      // 3. Character swings into hanging posture (2-4 deg) & settles
      .to(character, {
        rotate: 3.5,
        duration: 0.4,
        ease: "power1.inOut",
      })
      .to(character, {
        rotate: -2,
        duration: 0.45,
        ease: "power1.inOut",
      })
      .to(character, {
        rotate: 0,
        duration: 0.55,
        ease: "power2.out",
        onComplete: () => {
          // Start gentle organic pendulum sway
          gsap.to(character, {
            rotate: 2.2,
            duration: 2.8,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });

          // Web micro sway
          gsap.to(webPath, {
            attr: { d: "M 10,0 Q 7,120 10,240" },
            duration: 2.8,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        },
      });

      // Desktop Mouse Parallax
      const handleMouseMove = (e: MouseEvent) => {
        if (isDialogueActiveRef.current) return;
        const { innerWidth, innerHeight } = window;
        const moveX = ((e.clientX / innerWidth) - 0.5) * 14;
        const moveY = ((e.clientY / innerHeight) - 0.5) * 9;

        gsap.to(character, {
          x: moveX,
          y: moveY,
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto",
        });

        gsap.to(bubble, {
          x: moveX * 0.45,
          y: moveY * 0.45,
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto",
        });

        gsap.to(webPath, {
          x: moveX * 0.3,
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      // Scroll Interception: Fade away gracefully when hero scrolls off screen
      const handleScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > 50) {
          const progress = Math.min((scrollY - 50) / 300, 1);
          gsap.to(container, {
            opacity: 1 - progress,
            y: scrollY * 0.3,
            duration: 0.3,
            overwrite: "auto",
          });
        } else {
          gsap.to(container, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            overwrite: "auto",
          });
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("scroll", handleScroll);
      };
    }, containerRef);

    return () => {
      ctx.revert();
      if (typewriterTimerRef.current) clearTimeout(typewriterTimerRef.current);
      if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current);
    };
  }, []);

  // Play User's Custom Audio File
  const playCustomAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.warn("Custom voice audio playback deferred until user interaction:", err);
      });
    }
  }, []);

  // Click / Tap Interactive Dialogue Trigger
  const triggerDialogue = useCallback(() => {
    // Prevent spam clicking while active
    if (isDialogueActiveRef.current) return;
    isDialogueActiveRef.current = true;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const character = characterRef.current;
    const bubble = bubbleRef.current;

    // Reset typewriter state
    setDisplayText("");
    setIsTyping(true);

    // Play Custom Voice Audio File
    playCustomAudio();

    if (!prefersReducedMotion && character) {
      // 1. Character acting reaction: subtle head tilt + small swing
      gsap.to(character, {
        rotate: -4,
        y: -4,
        duration: 0.25,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      });
    }

    // 2. Pause 200-300ms, then animate speech bubble in & start typewriter
    setTimeout(() => {
      if (bubble) {
        gsap.to(bubble, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.45,
          ease: "back.out(1.3)",
        });
      }

      // Typewriter Effect (~35ms per character)
      let charIndex = 0;
      const typeNextChar = () => {
        if (charIndex < FULL_DIALOGUE.length) {
          setDisplayText(FULL_DIALOGUE.slice(0, charIndex + 1));
          charIndex++;
          typewriterTimerRef.current = setTimeout(typeNextChar, 35);
        } else {
          // Typewriting complete
          setIsTyping(false);

          // Hold bubble visible for 3.5 seconds, then auto-fade out & reset
          autoHideTimerRef.current = setTimeout(() => {
            if (bubble) {
              gsap.to(bubble, {
                opacity: 0,
                scale: 0.95,
                y: 8,
                duration: 0.4,
                ease: "power2.in",
                onComplete: () => {
                  setDisplayText("");
                  isDialogueActiveRef.current = false;
                },
              });
            } else {
              setDisplayText("");
              isDialogueActiveRef.current = false;
            }
          }, 3500);
        }
      };

      typeNextChar();
    }, 250);
  }, [playCustomAudio]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      triggerDialogue();
    }
  };

  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={0}
      aria-label="Interact with Noir Spider-Vigilante character"
      className="absolute right-[-65px] sm:right-[-90px] md:right-[-125px] lg:right-[-155px] top-[-30px] sm:top-[-40px] md:top-[-50px] z-30 pointer-events-auto select-none outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-full p-3 sm:p-4"
      onClick={triggerDialogue}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* SVG Web Line */}
      <svg
        width="20"
        height="240"
        viewBox="0 0 20 240"
        className="overflow-visible absolute top-[-190px] right-[45px] sm:right-[60px] md:right-[75px] z-10 pointer-events-none"
      >
        <defs>
          <linearGradient id="web-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#e2e8f0" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.3" />
          </linearGradient>
          <filter id="web-glow">
            <feGaussianBlur stdDeviation="0.75" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          ref={webPathRef}
          d="M 10,0 Q 10,120 10,240"
          stroke="url(#web-gradient)"
          strokeWidth="1.5"
          fill="none"
          filter="url(#web-glow)"
          strokeLinecap="round"
        />
      </svg>

      {/* Interactive Noir Comic Speech Bubble */}
      <div
        ref={bubbleRef}
        className="absolute z-40 pointer-events-none origin-bottom-right opacity-0 scale-95"
        style={{
          top: "-65px",
          left: "clamp(-260px, -35vw, -220px)",
          maxWidth: "clamp(210px, 40vw, 290px)",
        }}
      >
        <div className="relative px-4 py-2.5 bg-[#09090b]/95 border border-white/30 rounded-lg shadow-[0_12px_30px_rgba(0,0,0,0.9)] backdrop-blur-sm">
          <p className="font-display tracking-[0.18em] text-white text-[10px] sm:text-[11px] font-bold uppercase leading-relaxed text-balance">
            {displayText}
            {isTyping && (
              <span className="inline-block w-1.5 h-3 ml-1 bg-white animate-pulse align-middle" />
            )}
          </p>

          {/* Hand-drawn speech bubble tail */}
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            className="absolute bottom-[-9px] right-4 text-[#09090b]/95"
          >
            <path
              d="M0 0 L14 0 L10 10 Z"
              fill="currentColor"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>

      {/* Noir Vigilante Floating Character */}
      <div
        ref={characterRef}
        className={`relative transition-transform duration-300 transform-gpu origin-top cursor-pointer ${
          isHovered ? "scale-105" : "scale-100"
        }`}
        style={{
          width: "clamp(95px, 14vw, 175px)",
          height: "auto",
        }}
      >
        {/* Soft rim backlight on hover */}
        <div
          className={`absolute inset-0 rounded-full blur-xl transition-opacity duration-500 pointer-events-none ${
            isHovered ? "opacity-35 bg-white/25" : "opacity-0"
          }`}
        />

        {/* 100% Transparent PNG Character */}
        <img
          src="/images/noir-vigilante.png"
          alt=""
          draggable={false}
          className="w-full h-auto object-contain pointer-events-none"
        />

        {/* Dynamic Eye Lens Glow on Hover & Interaction */}
        <div
          className={`absolute bottom-[28%] left-[47%] -translate-x-1/2 w-7 h-2.5 rounded-full blur-xs transition-all duration-300 pointer-events-none ${
            isHovered || isTyping
              ? "bg-white/95 shadow-[0_0_16px_rgba(255,255,255,1)] opacity-100 scale-125"
              : "opacity-0 scale-100"
          }`}
        />
      </div>
    </div>
  );
}
