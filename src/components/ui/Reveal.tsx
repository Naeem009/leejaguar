"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "text" | "image";
};

export function Reveal({ children, className = "", delay = 0, variant = "text" }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const initial =
    variant === "image" ? { opacity: 0, clipPath: "inset(8% 0 0 0)" } : { opacity: 0, y: 16 };
  const visible =
    variant === "image" ? { opacity: 1, clipPath: "inset(0% 0 0 0)" } : { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={visible}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
