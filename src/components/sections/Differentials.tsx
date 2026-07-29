"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  Target,
  MapPin,
  Route,
  DollarSign,
  Brain,
  Headphones,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const DIFFERENTIALS = [
  {
    icon: Target,
    title: "Tráfego pago que vira cliente",
    description:
      "Nada de curtida bonita. Cada real investido em anúncio é rastreado até a venda.",
  },
  {
    icon: MapPin,
    title: "Presença que aparece no Google",
    description:
      "Otimizamos seu Google Meu Negócio pra você aparecer no mapa, ganhar avaliações e receber chamada direto de quem já está pronto pra comprar.",
  },
  {
    icon: Route,
    title: "Do primeiro clique até o fechamento",
    description:
      "Cuidamos de cada etapa: atração, conversão e retenção. Nenhuma oportunidade fica pelo caminho.",
  },
  {
    icon: DollarSign,
    title: "Métrica que importa: dinheiro no caixa",
    description:
      "Esquece número de vaidade. Medimos o que muda seu faturamento no fim do mês.",
  },
  {
    icon: Brain,
    title: "Estratégia antes do anúncio",
    description:
      "Não subimos campanha no impulso. Cada ação nasce de um plano pensado pro seu negócio.",
  },
  {
    icon: Headphones,
    title: "Seu atendimento também vende mais",
    description:
      "Ajustamos seu processo comercial pra nenhum lead esfriar e nenhuma venda escapar.",
  },
];

function scrollToFormulario() {
  const target = document.getElementById("formulario");
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ─── Mobile Carousel ─── */

// The "Google" card is the initial card shown when the page loads.
const INITIAL_INDEX = DIFFERENTIALS.findIndex((d) =>
  d.title.includes("Google"),
);
const initialIndex = INITIAL_INDEX === -1 ? 0 : INITIAL_INDEX;

function DifferentialsCarouselMobile() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(initialIndex);

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const track = trackRef.current;
      if (!track) return;
      const card = track.children[index] as HTMLElement | undefined;
      if (!card) return;
      const trackRect = track.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const scrollLeft =
        card.offsetLeft - (trackRect.width / 2 - cardRect.width / 2);
      track.scrollTo({ left: scrollLeft, behavior });
    },
    [],
  );

  const handlePrev = () =>
    scrollToIndex(active === 0 ? DIFFERENTIALS.length - 1 : active - 1);
  const handleNext = () =>
    scrollToIndex(active === DIFFERENTIALS.length - 1 ? 0 : active + 1);

  /* Keyboard navigation */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  /* Scroll to the initial card on mount (instant, no visible jump) */
  useEffect(() => {
    // Small RAF delay so the track is laid out before we scroll.
    const id = requestAnimationFrame(() => scrollToIndex(initialIndex, "auto"));
    return () => cancelAnimationFrame(id);
  }, [scrollToIndex]);

  /* Detect which card is centred using IntersectionObserver */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (
            entry.isIntersecting &&
            (!best || entry.intersectionRatio > best.intersectionRatio)
          ) {
            best = entry;
          }
        }
        if (best) {
          const idx = Array.from(track.children).indexOf(best.target);
          if (idx !== -1) setActive(idx);
        }
      },
      { root: track, threshold: [0.5, 0.6, 0.7, 0.8] },
    );

    Array.from(track.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="md:hidden w-full outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Carrossel de diferenciais"
    >
      {/* ── Track ── */}
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[8%] pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {DIFFERENTIALS.map((item, i) => (
          <div
            key={item.title}
            className="w-[86%] shrink-0 snap-center"
          >
            <div className="h-full bg-primary/5 border border-primary/20 backdrop-blur-xl rounded-2xl p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 border border-primary/20">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-[family-name:var(--font-display)] mb-3 text-foreground">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed flex-1 text-[0.95rem]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Controls: [ < ]  • • ● • • •  [ > ] ── */}
      <div className="mt-3 flex items-center justify-center gap-4 px-4">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Card anterior"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors duration-200 hover:border-[#7eb8ff]/60 hover:text-[#7eb8ff] active:bg-[#7eb8ff]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7eb8ff]/50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2" role="tablist">
          {DIFFERENTIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              onClick={() => scrollToIndex(i)}
              aria-label={`Ir para o card ${i + 1}`}
              aria-selected={active === i}
              className={`block rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7eb8ff]/50 ${
                active === i
                  ? "h-2.5 w-2.5 bg-[#7eb8ff] shadow-[0_0_6px_rgba(126,184,255,0.5)]"
                  : "h-2 w-2 bg-white/60 hover:bg-white/90"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Próximo card"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors duration-200 hover:border-[#7eb8ff]/60 hover:text-[#7eb8ff] active:bg-[#7eb8ff]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7eb8ff]/50"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ─── Main Section ─── */
export function Differentials() {
  return (
    <section
      id="diferenciais"
      className="py-20 md:py-32 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div
          className="absolute"
          style={{
            top: 0,
            right: 0,
            width: "18rem",
            height: "18rem",
            background: "hsl(210 70.2% 50% / 0.1)",
            borderRadius: "9999px",
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* ── Section header (shared) ── */}
      <div className="max-w-7xl mx-auto relative z-10 px-4">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-4">
            Por que somos{" "}
            <span className="hero-text-gradient">diferentes</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Não somos uma agência comum. Construímos uma máquina de vendas onde
            cada clique tem um propósito e todo esforço vira resultado no seu
            caixa.
          </p>
        </ScrollReveal>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── DESKTOP GRID — 6 Cards (untouched) ── */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {DIFFERENTIALS.map((item, index) => (
            <ScrollReveal
              key={item.title}
              delay={index * 0.1}
              className="h-full"
            >
              <div className="h-full bg-primary/5 border border-primary/20 backdrop-blur-xl rounded-2xl p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,112,243,0.15)] group flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 group-hover:bg-primary/20 transition-colors duration-300">
                  <item.icon className="w-6 h-6 text-primary group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-display)] mb-3 text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed flex-1">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}

          {/* CTA banner (desktop) */}
          <div className="col-span-1 md:col-span-3 mt-8">
            <ScrollReveal delay={0.6}>
              <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-primary/30 via-primary/80 to-primary/30 group overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 animate-pulse blur-md" />
                <div className="relative bg-background/90 backdrop-blur-2xl rounded-2xl p-8 md:p-10 flex flex-col items-center justify-center gap-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  <div className="text-center w-full">
                    <h3 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-display)] text-foreground whitespace-nowrap overflow-hidden text-ellipsis">
                      Descubra em 2 minutos quanto sua empresa está perdendo sem
                      estratégia digital!
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={scrollToFormulario}
                      className="btn-cta btn-differentials glow-blue md:min-w-[400px] md:py-4 md:text-lg"
                    >
                      Ver diagnóstico grátis
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* ── MOBILE — 6 Cards Carousel ── */}
        <div className="block md:hidden">
          <ScrollReveal delay={0.1}>
            <DifferentialsCarouselMobile />
          </ScrollReveal>

          {/* CTA banner (mobile) */}
          <div className="px-4 mt-8">
            <ScrollReveal delay={0.3}>
              <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-primary/30 via-primary/80 to-primary/30 group overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 animate-pulse blur-md" />
                <div className="relative bg-background/90 backdrop-blur-2xl rounded-2xl p-5 flex flex-col items-center gap-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  <div className="text-center flex-1">
                    <h3 className="text-lg font-bold font-[family-name:var(--font-display)] text-foreground">
                      Descubra em 2 minutos quanto sua empresa está perdendo sem
                      estratégia digital!
                    </h3>
                  </div>
                  <div className="flex-shrink-0 w-full flex justify-center">
                    <button
                      onClick={scrollToFormulario}
                      className="btn-cta btn-differentials glow-blue w-full sm:w-auto"
                    >
                      Ver diagnóstico grátis
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
