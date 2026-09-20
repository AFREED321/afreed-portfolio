import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import { AudioProvider } from "@/context/AudioContext";
import MusicControl from "@/components/MusicControl";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "K M Afreed | Video Editor & Visual Creator",
  description: "I turn raw footage into visual stories. Premium portfolio of K M Afreed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased bg-black text-[#F5F5F5] min-h-screen selection:bg-accent selection:text-black hide-scrollbar relative">
        <AudioProvider>
          <div className="bg-grain pointer-events-none fixed inset-0 z-50"></div>
          <CustomCursor />
          <SmoothScroll>
            {children}
          </SmoothScroll>
          <MusicControl />
        </AudioProvider>
      </body>
    </html>
  );
}
