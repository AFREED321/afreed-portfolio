"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

interface AudioContextType {
  isPlaying: boolean;
  isFading: boolean;
  toggleSound: () => void;
  playSound: () => void;
  pauseSound: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const TARGET_VOLUME = 0.18; // 18% volume (within 15-20% target)
const FADE_IN_DURATION = 1200; // ms
const FADE_OUT_DURATION = 800; // ms
const SESSION_STORAGE_KEY = "portfolio_music_pref";

const clampVolume = (val: number): number => {
  if (isNaN(val)) return 0;
  return Math.max(0, Math.min(1, val));
};

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isFading, setIsFading] = useState<boolean>(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);
  
  const userPrefersSoundRef = useRef<boolean>(false);
  const interruptedByVideoRef = useRef<boolean>(false);

  // Clear any ongoing fade animation
  const clearFade = useCallback(() => {
    if (fadeIntervalRef.current !== null) {
      cancelAnimationFrame(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
    setIsFading(false);
  }, []);

  // Smooth fade-in
  const fadeIn = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    clearFade();
    setIsFading(true);

    audio.volume = 0;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          const startTime = performance.now();
          const startVolume = clampVolume(audio.volume);

          const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / FADE_IN_DURATION, 1);
            const rawVol = startVolume + (TARGET_VOLUME - startVolume) * progress;
            const currentVol = clampVolume(rawVol);

            if (audio) {
              audio.volume = currentVol;
            }

            if (progress < 1) {
              fadeIntervalRef.current = requestAnimationFrame(step);
            } else {
              if (audio) audio.volume = clampVolume(TARGET_VOLUME);
              fadeIntervalRef.current = null;
              setIsPlaying(true);
              setIsFading(false);
            }
          };

          fadeIntervalRef.current = requestAnimationFrame(step);
        })
        .catch((err) => {
          console.warn("Audio play prevented by browser policy:", err);
          setIsPlaying(false);
          setIsFading(false);
        });
    }
  }, [clearFade]);

  // Smooth fade-out
  const fadeOut = useCallback((onComplete?: () => void) => {
    const audio = audioRef.current;
    if (!audio || audio.paused) {
      setIsPlaying(false);
      setIsFading(false);
      if (onComplete) onComplete();
      return;
    }

    clearFade();
    setIsFading(true);

    const startTime = performance.now();
    const startVolume = clampVolume(audio.volume);

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / FADE_OUT_DURATION, 1);
      const rawVol = startVolume * (1 - progress);
      const currentVol = clampVolume(rawVol);

      if (audio) {
        audio.volume = currentVol;
      }

      if (progress < 1) {
        fadeIntervalRef.current = requestAnimationFrame(step);
      } else {
        if (audio) {
          audio.volume = 0;
          audio.pause();
        }
        fadeIntervalRef.current = null;
        setIsPlaying(false);
        setIsFading(false);
        if (onComplete) onComplete();
      }
    };

    fadeIntervalRef.current = requestAnimationFrame(step);
  }, [clearFade]);

  // Turn sound ON explicitly
  const playSound = useCallback(() => {
    userPrefersSoundRef.current = true;
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, "on");
    } catch {
      // Ignore
    }
    fadeIn();
  }, [fadeIn]);

  // Turn sound OFF explicitly
  const pauseSound = useCallback(() => {
    userPrefersSoundRef.current = false;
    interruptedByVideoRef.current = false;
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, "off");
    } catch {
      // Ignore
    }
    fadeOut();
  }, [fadeOut]);

  // Toggle state
  const toggleSound = useCallback(() => {
    if (isPlaying || userPrefersSoundRef.current) {
      pauseSound();
    } else {
      playSound();
    }
  }, [isPlaying, pauseSound, playSound]);

  // Initialize audio element and check session preference
  useEffect(() => {
    const audio = new Audio("/audio/portfolio-music.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audioRef.current = audio;

    try {
      const savedPref = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (savedPref === "on") {
        userPrefersSoundRef.current = true;
      }
    } catch {
      // Ignore
    }

    return () => {
      clearFade();
      audio.pause();
      audioRef.current = null;
    };
  }, [clearFade]);

  // Global video listening to pause background music during video playback with audio
  useEffect(() => {
    const isVideoPlayingWithAudio = (): boolean => {
      const videos = Array.from(document.querySelectorAll("video"));
      return videos.some((v) => !v.paused && !v.ended && !v.muted && v.volume > 0);
    };

    const handleVideoPlay = (e: Event) => {
      const target = e.target;
      if (target instanceof HTMLVideoElement) {
        if (!target.muted && target.volume > 0) {
          if (userPrefersSoundRef.current) {
            interruptedByVideoRef.current = true;
            fadeOut();
          }
        }
      }
    };

    const handleVideoPauseOrEnd = () => {
      setTimeout(() => {
        if (
          interruptedByVideoRef.current &&
          userPrefersSoundRef.current &&
          !isVideoPlayingWithAudio()
        ) {
          interruptedByVideoRef.current = false;
          fadeIn();
        }
      }, 200);
    };

    document.addEventListener("play", handleVideoPlay, true);
    document.addEventListener("pause", handleVideoPauseOrEnd, true);
    document.addEventListener("ended", handleVideoPauseOrEnd, true);

    return () => {
      document.removeEventListener("play", handleVideoPlay, true);
      document.removeEventListener("pause", handleVideoPauseOrEnd, true);
      document.removeEventListener("ended", handleVideoPauseOrEnd, true);
    };
  }, [fadeIn, fadeOut]);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isFading,
        toggleSound,
        playSound,
        pauseSound,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
