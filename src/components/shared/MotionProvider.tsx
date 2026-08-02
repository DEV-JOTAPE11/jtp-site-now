"use client";

import { type ReactNode } from "react";
import { LazyMotion, domAnimation } from "framer-motion";

/* Carrega só o subconjunto do framer-motion que o site usa.
   `domAnimation` traz animações, variants e os gestos — incluindo o
   inView de que o ScrollReveal depende (whileInView) — mas deixa de fora
   drag e layout animations, que não são usados em lugar nenhum.

   Precisa envolver todo componente que renderize `m.*`. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
