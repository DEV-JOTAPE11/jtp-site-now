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

export function Testimonials() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState<string>("");
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  // Open lightbox
  const openLightbox = useCallback(
    (src: string, alt: string, trigger: HTMLButtonElement) => {
      triggerRef.current = trigger;
      setLightboxSrc(src);
      setLightboxAlt(alt);
    },
    []
  );

  // Close lightbox
  const closeLightbox = useCallback(() => {
    setLightboxSrc(null);
    setLightboxAlt("");
    // Return focus to the card that opened the lightbox
    if (triggerRef.current) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, []);

  // ESC to close + lock body scroll
  useEffect(() => {
    if (!lightboxSrc) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxSrc, closeLightbox]);

  return (
    <section id="depoimentos" className="py-20 md:py-32 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-4">
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
                      item.src,
                      item.alt,
                      e.currentTarget as HTMLButtonElement
                    )
                  }
                  aria-label={`Ampliar: ${item.alt}`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 160px, 240px"
                    className="fan-card__img"
                  />
                </button>
              );
            })}
          </div>
        </ScrollReveal>
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Imagem ampliada"
        >
          <button
            className="lightbox__close"
            onClick={closeLightbox}
            aria-label="Fechar imagem ampliada"
          >
            ✕
          </button>
          <img
            src={lightboxSrc}
            alt={lightboxAlt}
            className="lightbox__img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
