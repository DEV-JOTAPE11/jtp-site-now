"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { PortfolioPreviewCard } from "@/components/portfolio/PortfolioPreviewCard";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { cn } from "@/lib/utils";
import type { PortfolioProject } from "@/types";

interface PortfolioGridProps {
  projects: PortfolioProject[];
  /**
   * `home` vira carrossel com snap no mobile e grid a partir de md;
   * `portfolio` é sempre grid.
   */
  variant?: "home" | "portfolio";
  className?: string;
}

export function PortfolioGrid({
  projects,
  variant = "portfolio",
  className,
}: PortfolioGridProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isHome = variant === "home";

  /* Se a lista encolher (filtro), o índice é limitado durante a renderização —
     sem efeito extra só para corrigir estado. */
  const safeActiveIndex = Math.min(activeIndex, Math.max(projects.length - 1, 0));

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollToProject = useCallback(
    (nextIndex: number) => {
      const track = trackRef.current;
      if (!track) return;

      const safeIndex = Math.min(Math.max(nextIndex, 0), projects.length - 1);
      const card = track.children[safeIndex] as HTMLElement | undefined;
      if (!card) return;

      const trackRect = track.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      track.scrollTo({
        left: card.offsetLeft - (trackRect.width / 2 - cardRect.width / 2),
        behavior: "smooth",
      });

      setActiveIndex(safeIndex);
    },
    [projects.length]
  );

  /* Card mais próximo do centro = card ativo (throttle por rAF). */
  const handleTrackScroll = useCallback(() => {
    if (rafRef.current !== null) return;

    rafRef.current = requestAnimationFrame(() => {
      const track = trackRef.current;
      if (!track) {
        rafRef.current = null;
        return;
      }

      const trackCenter = track.scrollLeft + track.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      Array.from(track.children).forEach((child, index) => {
        const card = child as HTMLElement;
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const distance = Math.abs(cardCenter - trackCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex((current) =>
        current === closestIndex ? current : closestIndex
      );
      rafRef.current = null;
    });
  }, []);

  return (
    <div className={cn(isHome && "relative mx-auto max-w-6xl")}>
      <div
        ref={isHome ? trackRef : undefined}
        onScroll={isHome ? handleTrackScroll : undefined}
        className={cn(
          isHome
            ? "-mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-2 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3"
            : "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
          className
        )}
      >
        {projects.map((project, index) => (
          <ScrollReveal
            key={project.id}
            delay={Math.min(index, 6) * 0.06}
            className={cn(isHome && "min-w-full snap-center md:min-w-0")}
          >
            <PortfolioPreviewCard
              project={project}
              variant={variant}
              /* Na home a seção fica bem abaixo da dobra; na página de
                 portfólio a primeira fileira aparece quase de imediato. */
              priority={!isHome && index < 3}
            />
          </ScrollReveal>
        ))}
      </div>

      {isHome && projects.length > 1 && (
        <>
          {/* Setas sobrepostas nas laterais do card (só mobile). */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 items-center justify-between px-1 md:hidden">
            <button
              type="button"
              onClick={() => scrollToProject(safeActiveIndex - 1)}
              disabled={safeActiveIndex === 0}
              aria-label="Projeto anterior"
              className="glass-card portfolio-nav-button pointer-events-auto flex h-11 w-11 items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7eb8ff]/50 disabled:pointer-events-none disabled:opacity-35"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => scrollToProject(safeActiveIndex + 1)}
              disabled={safeActiveIndex === projects.length - 1}
              aria-label="Próximo projeto"
              className="glass-card portfolio-nav-button pointer-events-auto flex h-11 w-11 items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7eb8ff]/50 disabled:pointer-events-none disabled:opacity-35"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Indicador de posição — decorativo, a navegação é pelas setas. */}
          <div
            className="mt-5 flex items-center justify-center gap-2 md:hidden"
            aria-hidden="true"
          >
            {projects.map((project, index) => (
              <span
                key={project.id}
                className={cn(
                  "h-2 rounded-full bg-muted-foreground/30 transition-all duration-300",
                  safeActiveIndex === index ? "w-6 bg-primary" : "w-2"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
