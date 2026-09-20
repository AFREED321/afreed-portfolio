"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import { sendEmail } from "@/actions/send-email";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    
    // Basic client-side validation
    const email = formData.get("email") as string;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      const result = await sendEmail(formData);
      
      if (result?.error) {
        setStatus("error");
        setErrorMessage(result.error);
      } else {
        setStatus("success");
        // Reset form fields
        (e.target as HTMLFormElement).reset();
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-32 md:py-48 w-full relative z-10 bg-[#0a0a0a] overflow-hidden">
      
      {/* Background visual element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">
        
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold uppercase tracking-tighter leading-[0.9] mb-8 text-balance"
          >
            Got footage?<br />
            <span className="text-accent">Let's make it hit.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 text-lg md:text-xl font-light mb-12 max-w-lg"
          >
            Have a project, collaboration or editing opportunity? Let's create something worth watching.
          </motion.p>
        </div>

        <div className="w-full lg:w-1/2">
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-6 w-full max-w-lg mx-auto lg:ml-auto"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs font-bold tracking-widest text-white/50 uppercase">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                required
                disabled={status === "sending"}
                className="bg-transparent border-b border-white/20 pb-2 text-white outline-none focus:border-accent transition-colors cursor-hover disabled:opacity-50"
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <label htmlFor="email" className="text-xs font-bold tracking-widest text-white/50 uppercase">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                required
                disabled={status === "sending"}
                className="bg-transparent border-b border-white/20 pb-2 text-white outline-none focus:border-accent transition-colors cursor-hover disabled:opacity-50"
                placeholder="john@example.com"
              />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <label htmlFor="type" className="text-xs font-bold tracking-widest text-white/50 uppercase">Project Type</label>
              <input 
                type="text" 
                id="type" 
                name="type"
                required
                disabled={status === "sending"}
                className="bg-transparent border-b border-white/20 pb-2 text-white outline-none focus:border-accent transition-colors cursor-hover disabled:opacity-50"
                placeholder="e.g. Commercial, YouTube, Short-form"
              />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <label htmlFor="message" className="text-xs font-bold tracking-widest text-white/50 uppercase">Message</label>
              <textarea 
                id="message" 
                name="message"
                rows={4}
                required
                disabled={status === "sending"}
                className="bg-transparent border-b border-white/20 pb-2 text-white outline-none focus:border-accent transition-colors cursor-hover resize-none disabled:opacity-50"
                placeholder="Tell me about your project..."
              />
            </div>
            
            {status === "error" && (
              <p className="text-red-500 text-sm font-bold tracking-wider mt-2">{errorMessage || "FAILED TO SEND — TRY AGAIN"}</p>
            )}

            <div className="mt-8">
              <Button 
                type="submit" 
                showArrow={status !== "sending" && status !== "success"} 
                className={`w-full sm:w-auto ${status === "sending" ? "opacity-70 cursor-not-allowed pointer-events-none" : ""}`}
              >
                {status === "sending" ? "SENDING..." : status === "success" ? "MESSAGE SENT ✓" : status === "error" ? "FAILED TO SEND — TRY AGAIN" : "SEND MESSAGE"}
              </Button>
            </div>
          </motion.form>
        </div>

      </div>
    </section>
  );
}
