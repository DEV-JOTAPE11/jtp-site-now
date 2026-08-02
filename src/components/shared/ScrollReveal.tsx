"use client";

import { type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "scale";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  /* Elemento renderizado pelo wrapper. Usado quando o reveal precisa ser o
     filho direto de uma lista: <ul> só aceita <li> como filho, e o wrapper
     de animação fica entre os dois. */
  as?: "div" | "li";
}

const variants: Record<Direction, Variants> = {
  up: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
};

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  className = "",
  once = true,
  as = "div",
}: ScrollRevealProps) {
  const Wrapper = as === "li" ? motion.li : motion.div;

  return (
    <Wrapper
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "0px 0px -50px 0px", amount: 0.1 }}
      variants={variants[direction]}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </Wrapper>
  );
}
