"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "outline";
  showArrow?: boolean;
  type?: "button" | "submit" | "reset";
  target?: string;
  download?: boolean | string;
};

export default function Button({
  children,
  href,
  onClick,
  className,
  variant = "primary",
  showArrow = false,
  type = "button",
  target,
  download,
}: ButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles =
    "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-4 font-display font-bold uppercase tracking-[0.1em] transition-all duration-500 cursor-hover text-sm md:text-base";

  const variants = {
    primary: "bg-white text-black hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]",
    outline: "border border-white/20 bg-transparent text-white hover:bg-white hover:text-black",
  };

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {showArrow && (
        <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-1.5" />
      )}
    </>
  );

  const ButtonContent = () => (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      className="inline-block"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {href ? (
        <Link href={href} className={cn(baseStyles, variants[variant], className)} target={target} download={download}>
          {content}
        </Link>
      ) : (
        <button
          type={type}
          onClick={onClick}
          className={cn(baseStyles, variants[variant], className)}
        >
          {content}
        </button>
      )}
    </motion.div>
  );

  return <ButtonContent />;
}
