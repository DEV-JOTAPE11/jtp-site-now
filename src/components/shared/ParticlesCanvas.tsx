"use client";

import { useParticlesCanvas } from "@/hooks/useParticlesCanvas";

export function ParticlesCanvas() {
  useParticlesCanvas();

  return (
    <canvas
      id="particles-canvas"
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
}
