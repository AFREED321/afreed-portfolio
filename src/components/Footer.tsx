"use client";

import { Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black border-t border-white/5 py-12 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="flex flex-col gap-2 text-center md:text-left">
            <span className="font-display font-bold text-2xl tracking-tighter uppercase text-white flex items-center justify-center md:justify-start">
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 32 32" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 mr-1 md:mr-1.5"
              >
                <circle cx="16" cy="16" r="14.5" stroke="white" strokeWidth="1.5" />
                <path d="M 9 23 L 16 7 L 23 23" stroke="url(#grad-a-footer)" strokeWidth="3.5" strokeLinejoin="round" />
                <path d="M 12 17 L 20 17" stroke="url(#grad-a-footer)" strokeWidth="2.5" strokeLinecap="round" />
                <defs>
                  <linearGradient id="grad-a-footer" x1="16" y1="0" x2="23" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="mt-[2px]">FREED.</span>
            </span>
            <span className="text-white/40 text-sm font-light uppercase tracking-widest">Visual Creator & Editor</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="https://www.instagram.com/Afreed_ae" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors cursor-hover p-2" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </Link>
            <Link href="https://www.youtube.com/@Afreed_ae" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors cursor-hover p-2" aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1C2.5 7.1 2.4 5.9 3 5.3C3.6 4.7 4.3 4.7 4.6 4.6C7.2 4.4 12 4.4 12 4.4C12 4.4 16.8 4.4 19.4 4.6C19.7 4.7 20.4 4.7 21 5.3C21.6 5.9 21.5 7.1 21.5 7.1C21.5 7.1 21.7 8.6 21.7 10.1V11.9C21.7 13.4 21.5 14.9 21.5 14.9C21.5 14.9 21.6 16.1 21 16.7C20.4 17.3 19.6 17.3 19.2 17.4C16.4 17.7 12 17.7 12 17.7C12 17.7 7.2 17.7 4.6 17.5C4.3 17.4 3.6 17.4 3 16.8C2.4 16.2 2.5 15 2.5 15C2.5 15 2.3 13.5 2.3 12V10.2C2.3 8.7 2.5 7.1 2.5 7.1Z"/><polygon points="9.5,14 9.5,8 15.5,11"/></svg>
            </Link>
            <Link href="https://www.linkedin.com/in/kaup-mohammad-afreed-3b18b932b?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors cursor-hover p-2" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </Link>
            <Link href="mailto:mohammedafreed197@gmail.com" className="text-white/50 hover:text-white transition-colors cursor-hover p-2" aria-label="Email">
              <Mail size={20} />
            </Link>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t border-white/5 text-xs font-bold tracking-widest text-white/30 uppercase">
          <span>&copy; {currentYear} K M Afreed. All Rights Reserved.</span>
          <span>Designed with intentionality.</span>
        </div>
      </div>
    </footer>
  );
}
