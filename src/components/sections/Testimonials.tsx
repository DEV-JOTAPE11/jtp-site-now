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
  const [lightboxIsVideo, setLightboxIsVideo] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const lightboxVideoRef = useRef<HTMLVideoElement | null>(null);
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Force mobile browsers to render the first frame as a poster
  const handlePreviewLoad = useCallback(() => {
    const vid = previewVideoRef.current;
    if (!vid) return;
    vid.pause();
    vid.currentTime = 0.001;
  }, []);

  // Open lightbox (images)
  const openLightbox = useCallback(
    (src: string, alt: string, trigger: HTMLButtonElement) => {
      triggerRef.current = trigger;
      setLightboxSrc(src);
      setLightboxAlt(alt);
      setLightboxIsVideo(false);
      setIsPlaying(false);
    },
    []
  );

  // Open lightbox (video)
  const openVideoLightbox = useCallback(
    (src: string, alt: string, trigger: HTMLButtonElement) => {
      triggerRef.current = trigger;
      setLightboxSrc(src);
      setLightboxAlt(alt);
      setLightboxIsVideo(true);
      setIsPlaying(false);
    },
    []
  );

  // Close lightbox
  const closeLightbox = useCallback(() => {
    // Pause video before closing
    if (lightboxVideoRef.current) {
      lightboxVideoRef.current.pause();
    }
    // Pause preview video to prevent background play
    if (previewVideoRef.current) {
      previewVideoRef.current.pause();
      previewVideoRef.current.currentTime = 0.001;
    }
    setLightboxSrc(null);
    setLightboxAlt("");
    setLightboxIsVideo(false);
    setIsPlaying(false);
    // Return focus to the card that opened the lightbox
    if (triggerRef.current) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, []);

  // Toggle play/pause on lightbox video
  const toggleLightboxVideo = useCallback(() => {
    const video = lightboxVideoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  // ESC to close + lock body scroll
  useEffect(() => {
    if (!lightboxSrc) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      // Space bar toggles play/pause when video lightbox is open
      if (e.key === " " && lightboxIsVideo) {
        e.preventDefault();
        toggleLightboxVideo();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxSrc, lightboxIsVideo, closeLightbox, toggleLightboxVideo]);

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

        {/* ── Video Testimonial Card ── */}
        <ScrollReveal delay={0.35}>
          <div className="mt-14 md:mt-20 flex justify-center px-4">
            <button
              type="button"
              className="video-phone-card"
              onClick={(e) =>
                openVideoLightbox(
                  "/video/IMG_jonas.mp4",
                  "Depoimento em vídeo de cliente",
                  e.currentTarget as HTMLButtonElement
                )
              }
              aria-label="Ampliar: Depoimento em vídeo de cliente"
            >
              <video
                ref={previewVideoRef}
                src="/video/IMG_jonas.mp4#t=0.001"
                className="video-phone-card__video"
                playsInline
                muted
                autoPlay
                preload="auto"
                onLoadedData={handlePreviewLoad}
                aria-hidden="true"
              />
              {/* Play icon overlay — signals "this is a video, click to watch" */}
              <div className="video-phone-card__btn">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="20" fill="rgba(0,0,0,0.4)" />
                  <path d="M16 12V28L30 20L16 12Z" fill="rgba(255,255,255,0.9)" />
                </svg>
              </div>
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* Lightbox — supports both images and video */}
      {lightboxSrc && (
        <div
          className="lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={lightboxIsVideo ? "Vídeo ampliado" : "Imagem ampliada"}
        >
          <button
            className="lightbox__close"
            onClick={closeLightbox}
            aria-label="Fechar"
          >
            ✕
          </button>

          {lightboxIsVideo ? (
            <div
              className="lightbox__video-wrapper"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={lightboxVideoRef}
                src={lightboxSrc}
                className="lightbox__video"
                playsInline
                loop
                onClick={toggleLightboxVideo}
                aria-label={lightboxAlt}
              />
              {/* Play/Pause overlay inside lightbox */}
              <button
                type="button"
                className={`lightbox__video-btn${isPlaying ? " is-playing" : ""}`}
                onClick={toggleLightboxVideo}
                aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
              >
                {isPlaying ? (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="24" fill="rgba(0,0,0,0.45)" />
                    <rect x="15" y="13" width="6" height="22" rx="1.5" fill="rgba(255,255,255,0.9)" />
                    <rect x="27" y="13" width="6" height="22" rx="1.5" fill="rgba(255,255,255,0.9)" />
                  </svg>
                ) : (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="24" fill="rgba(0,0,0,0.45)" />
                    <path d="M19 13V35L37 24L19 13Z" fill="rgba(255,255,255,0.9)" />
                  </svg>
                )}
              </button>
            </div>
          ) : (
            <img
              src={lightboxSrc}
              alt={lightboxAlt}
              className="lightbox__img"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </section>
  );
}
