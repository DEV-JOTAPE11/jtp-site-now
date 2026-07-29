"use client";

import { memo, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown, ExternalLink } from "lucide-react";

import { GlowingEffect } from "@/components/ui/glowing-effect";
import { PORTFOLIO_PREVIEW_SIZES } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import type { PortfolioProject } from "@/types";

interface PortfolioPreviewCardProps {
  project: PortfolioProject;
  variant?: "home" | "portfolio";
  /** Cards acima da dobra carregam a imagem com prioridade. */
  priority?: boolean;
}

export const PortfolioPreviewCard = memo(function PortfolioPreviewCard({
  project,
  variant = "portfolio",
  priority = false,
}: PortfolioPreviewCardProps) {
  const [imageSrc, setImageSrc] = useState(project.previewImage);

  useEffect(() => {
    setImageSrc(project.previewImage);
  }, [project.previewImage]);

  const handleImageError = () => {
    setImageSrc((currentSrc) =>
      currentSrc === project.coverImage ? currentSrc : project.coverImage
    );
  };

  const isUsingFallbackImage = imageSrc === project.coverImage;

  return (
    <article className="relative h-full rounded-[1.25rem] border border-[rgba(40,126,215,0.2)] p-2 md:rounded-[1.5rem] md:p-3">
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
        variant="brand"
      />

      <div
        className={cn(
          "glass-card group relative z-10 flex h-full flex-col overflow-hidden rounded-xl transition-all duration-300",
          "hover:bg-[rgba(7,20,39,0.8)]",
          variant === "home" ? "min-h-[500px]" : "min-h-[520px]"
        )}
      >
        {/* ── Print full-page rolável ── */}
        <div className="p-3 pb-0">
          <div className="relative">
            <div
              tabIndex={0}
              aria-label={`Preview rolável do site ${project.title}`}
              className={cn(
                "portfolio-preview-scroll rounded-xl border border-primary/20 bg-background/80",
                "shadow-[inset_0_2px_8px_rgba(2,8,23,0.55)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7eb8ff]/60",
                variant === "home"
                  ? "h-[260px] sm:h-[300px] lg:h-[320px]"
                  : "h-[280px] sm:h-[320px] lg:h-[340px]"
              )}
            >
              {isUsingFallbackImage ? (
                <div className="relative h-full w-full">
                  <Image
                    src={project.coverImage}
                    alt={`Capa do site ${project.title}`}
                    fill
                    sizes={PORTFOLIO_PREVIEW_SIZES}
                    className="select-none object-cover"
                    draggable={false}
                  />
                </div>
              ) : (
                <Image
                  src={imageSrc}
                  alt={`Preview completo do site ${project.title}`}
                  width={project.previewWidth}
                  height={project.previewHeight}
                  sizes={PORTFOLIO_PREVIEW_SIZES}
                  className="block h-auto w-full select-none"
                  draggable={false}
                  priority={priority}
                  loading={priority ? undefined : "lazy"}
                  onError={handleImageError}
                />
              )}
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 text-white/70 drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]"
            >
              <ChevronDown className="portfolio-scroll-hint h-5 w-5" />
            </div>
          </div>
        </div>

        {/* ── Conteúdo ── */}
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-4 flex flex-wrap gap-2">
            {project.badges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center rounded-full border border-primary/20 bg-primary/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground shadow-lg shadow-primary/10"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="mb-3">
            <h3 className="text-xl font-bold font-[family-name:var(--font-display)] leading-tight transition-colors group-hover:text-primary">
              {project.title}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
              <span className="font-semibold text-primary">
                {project.category}
              </span>
              <span aria-hidden="true" className="text-muted-foreground/60">
                &bull;
              </span>
              <span className="text-muted-foreground">
                {project.subCategory}
              </span>
            </div>
          </div>

          <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="mb-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver projeto ${project.title} em uma nova aba`}
            className="btn-cta glow-blue mt-auto w-full"
          >
            Ver projeto
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
});
