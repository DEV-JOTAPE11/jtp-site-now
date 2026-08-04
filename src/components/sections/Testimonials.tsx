"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const RESULTS = [
  {
    id: 1,
    src: "/img/print-one.jpeg",
    alt: "Print de resultado — crescimento de tráfego e conversões do cliente 1",
  },
  {
    id: 2,
    src: "/img/print-two.jpeg",
    alt: "Print de resultado — métricas de campanha do cliente 2",
  },
  {
    id: 3,
    src: "/img/print-three.jpeg",
    alt: "Print de resultado — aumento de vendas do cliente 3",
  },
];

const VIDEO_TESTIMONIAL = {
  youtubeId: "GDY3DjMbuLA",
  // Vertical still frame (1080x1920) served from /public — the player itself is
  // only fetched once the lightbox opens.
  thumb: "/img/depoimento-thumb.jpg",
  alt: "Depoimento em vídeo de cliente",
};

type LightboxItem =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; youtubeId: string; alt: string };

export function Testimonials() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const openLightbox = useCallback(
    (item: LightboxItem, trigger: HTMLButtonElement) => {
      triggerRef.current = trigger;
      setLightbox(item);
    },
    []
  );

  // Clearing the state unmounts the <iframe>, which destroys the player and
  // stops playback — no imperative pause needed.
  const closeLightbox = useCallback(() => {
    setLightbox(null);
    triggerRef.current?.focus();
    triggerRef.current = null;
  }, []);

  // ESC to close + lock body scroll
  useEffect(() => {
    if (!lightbox) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightbox, closeLightbox]);

  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-heading"
      className="py-20 md:py-32 px-4 relative"
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2
            id="depoimentos-heading"
            className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-4"
          >
            Histórias reais de{" "}
            <span className="hero-text-gradient">resultados</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Veja as histórias reais de quem já alcançou resultados
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="fan-cards">
            {RESULTS.map((item, i) => {
              const hoveredIndex =
                hoveredId !== null
                  ? RESULTS.findIndex((r) => r.id === hoveredId)
                  : -1;
              const isActive = hoveredId === item.id;
              const isInactive = hoveredId !== null && !isActive;

              let dynamicStyle: React.CSSProperties | undefined;

              if (isActive) {
                // Active card: center, scale up, rise
                dynamicStyle = {
                  transform: "rotate(0deg) scale(1.12) translateY(-18px)",
                  zIndex: 5,
                };
              } else if (isInactive) {
                // Spread inactive cards to the opposite side of the hovered card
                if (hoveredIndex === 0) {
                  // Hovered LEFT → others go RIGHT
                  dynamicStyle =
                    i === 1
                      ? {
                          transform:
                            "rotate(6deg) translateX(160px) scale(0.92)",
                          zIndex: 1,
                        }
                      : {
                          transform:
                            "rotate(14deg) translateX(260px) scale(0.88)",
                          zIndex: 0,
                        };
                } else if (hoveredIndex === 2) {
                  // Hovered RIGHT → others go LEFT
                  dynamicStyle =
                    i === 1
                      ? {
                          transform:
                            "rotate(-6deg) translateX(-160px) scale(0.92)",
                          zIndex: 1,
                        }
                      : {
                          transform:
                            "rotate(-14deg) translateX(-260px) scale(0.88)",
                          zIndex: 0,
                        };
                } else {
                  // Hovered CENTER → spread outward
                  dynamicStyle =
                    i === 0
                      ? {
                          transform:
                            "rotate(-18deg) translateX(-180px) scale(0.92)",
                          zIndex: 1,
                        }
                      : {
                          transform:
                            "rotate(18deg) translateX(180px) scale(0.92)",
                          zIndex: 1,
                        };
                }
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`fan-card fan-card--${i}${
                    isActive ? " is-active" : ""
                  }${isInactive ? " is-inactive" : ""}`}
                  style={dynamicStyle}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(item.id)}
                  onBlur={() => setHoveredId(null)}
                  onClick={(e) =>
                    openLightbox(
                      { type: "image", src: item.src, alt: item.alt },
                      e.currentTarget
                    )
                  }
                  aria-label={`Ampliar: ${item.alt}`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 767px) 160px, 240px"
                    className="fan-card__img"
                  />
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* ── Video Testimonial Card ── */}
        <ScrollReveal delay={0.35}>
          <div className="mt-14 md:mt-20 flex justify-center px-4">
            <button
              type="button"
              className="video-phone-card"
              onClick={(e) =>
                openLightbox(
                  {
                    type: "video",
                    youtubeId: VIDEO_TESTIMONIAL.youtubeId,
                    alt: VIDEO_TESTIMONIAL.alt,
                  },
                  e.currentTarget
                )
              }
              aria-label={`Ampliar: ${VIDEO_TESTIMONIAL.alt}`}
            >
              {/* Static thumbnail — nothing playable renders before the click. */}
              <Image
                src={VIDEO_TESTIMONIAL.thumb}
                /* Decorativa: o botão que a envolve já carrega o rótulo
                   ("Ampliar: Depoimento em vídeo de cliente"), então anunciar a
                   miniatura de novo só duplicaria a fala do leitor de tela. */
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 767px) 200px, 240px"
                className="video-phone-card__video"
              />
              {/* The single play icon for this card */}
              <div className="video-phone-card__btn">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                  <circle cx="20" cy="20" r="20" fill="rgba(0,0,0,0.4)" />
                  <path d="M16 12V28L30 20L16 12Z" fill="rgba(255,255,255,0.9)" />
                </svg>
              </div>
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* Lightbox — supports both images and video */}
      {lightbox && (
        <div
          className="lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={
            lightbox.type === "video" ? "Vídeo ampliado" : "Imagem ampliada"
          }
        >
          <button
            className="lightbox__close"
            onClick={closeLightbox}
            aria-label="Fechar"
          >
            ✕
          </button>

          {lightbox.type === "video" ? (
            <div
              className="lightbox__video-wrapper"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mounted only while the lightbox is open. Unmounting destroys
                  the player, which is what stops playback on close. YouTube
                  draws its own controls, so no overlay button here. */}
              <iframe
                className="lightbox__video-frame"
                src={`https://www.youtube.com/embed/${lightbox.youtubeId}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
                title={lightbox.alt}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="lightbox__img"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </section>
  );
}
