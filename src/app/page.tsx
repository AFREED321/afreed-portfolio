import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import Showreel from "@/sections/Showreel";
import SelectedWork from "@/sections/SelectedWork";
import About from "@/sections/About";
import Experience from "@/sections/Experience";
import Skills from "@/sections/Skills";
import Process from "@/sections/Process";
import Contact from "@/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full">
      <Navbar />
      <Hero />
      <Showreel />
      <SelectedWork />
      <About />
      <Experience />
      <Skills />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
