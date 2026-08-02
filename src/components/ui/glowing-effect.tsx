"use client";

import { memo, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { animate } from "framer-motion";

/* ---------------------------------------------------------------------------
   Controlador compartilhado

   A home renderiza 9 GlowingEffect (5 em Services, 1 em Comparison, 3 nos
   previews de portfólio). Na versão anterior cada instância registrava o seu
   próprio `pointermove` no document.body e o seu próprio `scroll` na window, e
   agendava o próprio rAF: 18 listeners e até 9 rAF concorrentes, com 9
   getBoundingClientRect() (layout forçado) a cada movimento do mouse.

   Aqui há um listener de cada tipo, um único rAF e os rects em cache,
   invalidados só por scroll/resize — que são os eventos que de fato mudam a
   posição dos cards na viewport. A matemática por instância é a mesma de
   antes, então o glow se comporta e aparece exatamente igual.
   --------------------------------------------------------------------------- */

interface GlowEntry {
  element: HTMLDivElement;
  inactiveZone: number;
  proximity: number;
  movementDuration: number;
  rect: DOMRect | null;
}

const entries = new Set<GlowEntry>();
const pointer = { x: 0, y: 0 };
let frameId = 0;
let rectsDirty = true;

const schedule = () => {
  if (frameId) return;
  frameId = requestAnimationFrame(flush);
};

function updateEntry(entry: GlowEntry) {
  const { element, rect } = entry;
  if (!rect) return;

  const { left, top, width, height } = rect;
  const mouseX = pointer.x;
  const mouseY = pointer.y;

  const center = [left + width * 0.5, top + height * 0.5];
  const distanceFromCenter = Math.hypot(mouseX - center[0], mouseY - center[1]);
  const inactiveRadius = 0.5 * Math.min(width, height) * entry.inactiveZone;

  if (distanceFromCenter < inactiveRadius) {
    element.style.setProperty("--active", "0");
    return;
  }

  const isActive =
    mouseX > left - entry.proximity &&
    mouseX < left + width + entry.proximity &&
    mouseY > top - entry.proximity &&
    mouseY < top + height + entry.proximity;

  element.style.setProperty("--active", isActive ? "1" : "0");

  if (!isActive) return;

  const currentAngle =
    parseFloat(element.style.getPropertyValue("--start")) || 0;
  const targetAngle =
    (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;

  const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
  const newAngle = currentAngle + angleDiff;

  animate(currentAngle, newAngle, {
    duration: entry.movementDuration,
    ease: [0.16, 1, 0.3, 1],
    onUpdate: (value) => {
      element.style.setProperty("--start", String(value));
    },
  });
}

function flush() {
  frameId = 0;

  /* Uma leva de leituras antes de qualquer escrita, e só quando algo pode ter
     movido: evita o ciclo leitura/escrita que forçava layout por card. */
  if (rectsDirty) {
    for (const entry of entries) {
      entry.rect = entry.element.getBoundingClientRect();
    }
    rectsDirty = false;
  }

  for (const entry of entries) updateEntry(entry);
}

const handlePointerMove = (event: PointerEvent) => {
  pointer.x = event.x;
  pointer.y = event.y;
  schedule();
};

const invalidateRects = () => {
  rectsDirty = true;
  schedule();
};

function register(entry: GlowEntry) {
  if (entries.size === 0) {
    document.body.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("scroll", invalidateRects, { passive: true });
    window.addEventListener("resize", invalidateRects, { passive: true });
  }
  entries.add(entry);
  rectsDirty = true;
  schedule();
}

function unregister(entry: GlowEntry) {
  entries.delete(entry);
  if (entries.size > 0) return;

  document.body.removeEventListener("pointermove", handlePointerMove);
  window.removeEventListener("scroll", invalidateRects);
  window.removeEventListener("resize", invalidateRects);
  if (frameId) {
    cancelAnimationFrame(frameId);
    frameId = 0;
  }
}

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white" | "brand";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}
const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className,
    movementDuration = 2,
    borderWidth = 1,
    disabled = true,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const element = containerRef.current;
      if (disabled || !element) return;

      const entry: GlowEntry = {
        element,
        inactiveZone,
        proximity,
        movementDuration,
        rect: null,
      };

      register(entry);
      return () => unregister(entry);
    }, [disabled, inactiveZone, proximity, movementDuration]);

    return (
      <>
        <div
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
            glow && "opacity-100",
            variant === "white" && "border-white",
            disabled && "!block"
          )}
        />
        <div
          ref={containerRef}
          style={
            {
              "--blur": `${blur}px`,
              "--spread": spread,
              "--start": "0",
              "--active": "0",
              "--glowingeffect-border-width": `${borderWidth}px`,
              "--repeating-conic-gradient-times": "5",
              "--gradient":
                variant === "white"
                  ? `repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  var(--black),
                  var(--black) calc(25% / var(--repeating-conic-gradient-times))
                )`
                  : variant === "brand"
                  ? `radial-gradient(circle, #f4fbff 10%, #f4fbff00 20%),
                radial-gradient(circle at 40% 40%, #7eb8ff 5%, #7eb8ff00 15%),
                radial-gradient(circle at 60% 60%, #004efd 10%, #004efd00 20%), 
                radial-gradient(circle at 40% 60%, #b9d7ff 10%, #b9d7ff00 20%),
                repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  #f4fbff 0%,
                  #7eb8ff calc(25% / var(--repeating-conic-gradient-times)),
                  #004efd calc(50% / var(--repeating-conic-gradient-times)), 
                  #b9d7ff calc(75% / var(--repeating-conic-gradient-times)),
                  #f4fbff calc(100% / var(--repeating-conic-gradient-times))
                )`
                  : `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
                radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
                radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%), 
                radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
                repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  #dd7bbb 0%,
                  #d79f1e calc(25% / var(--repeating-conic-gradient-times)),
                  #5a922c calc(50% / var(--repeating-conic-gradient-times)), 
                  #4c7894 calc(75% / var(--repeating-conic-gradient-times)),
                  #dd7bbb calc(100% / var(--repeating-conic-gradient-times))
                )`,
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)] ",
            className,
            disabled && "!hidden"
          )}
        >
          <div
            className={cn(
              "glow",
              "rounded-[inherit]",
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)] after:[background-attachment:fixed]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
            )}
          />
        </div>
      </>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };
