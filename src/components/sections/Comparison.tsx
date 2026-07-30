"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  Check,
  Clapperboard,
  Crown,
  PenTool,
  Target,
  TrendingUp,
} from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const PROFESSIONALS = [
  {
    icon: Crown,
    title: "Líder de Vendas",
    description: "Lidera, conduz e treina o time de vendas",
    price: "R$ 5.000/mês",
  },
  {
    icon: PenTool,
    title: "Redator de Publicidade",
    description: "Escreve os textos que fazem o lead comprar",
    price: "R$ 3.500/mês",
  },
  {
    icon: TrendingUp,
    title: "Gestor de Tráfego",
    description: "Coloca seus anúncios na frente de quem compra",
    price: "R$ 2.500/mês",
  },
  {
    icon: Clapperboard,
    title: "Editor de Vídeo",
    description: "Transforma seus vídeos em engajamento",
    price: "R$ 2.500/mês",
  },
  {
    icon: Target,
    title: "Gestor de Projetos",
    description: "Comanda o time e garante a entrega",
    price: "R$ 7.500/mês",
  },
];

const JTP_DELIVERS = [
  "As 5 funções, já operando",
  "Zero encargos, zero rescisão, zero processo",
  "Time rodando na sua conta em dias, não em meses",
  "Se não der certo, você cancela — não demite",
];

/* Tile de ícone (mesmo tratamento da seção de serviços, na versão premium):
   quadrado arredondado, gradiente do accent para o fundo, borda mais viva no
   topo e um único glow externo — que intensifica no hover do card. */
const ICON_TILE = [
  "relative flex h-14 w-14 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-[18px]",
  "border border-[rgba(61,158,255,0.18)] [border-top-color:rgba(61,158,255,0.45)]",
  "bg-[linear-gradient(180deg,rgba(61,158,255,0.18)_0%,rgba(61,158,255,0.05)_55%,var(--color-background)_100%)]",
  "shadow-[0_0_20px_rgba(61,158,255,0.16)]",
  "transition-[box-shadow,border-color] duration-300 ease-out",
  "group-hover:border-[rgba(61,158,255,0.3)] group-hover:[border-top-color:rgba(61,158,255,0.65)]",
  "group-hover:shadow-[0_0_28px_rgba(61,158,255,0.3)]",
].join(" ");

function scrollToFormulario() {
  const target = document.getElementById("formulario");
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/* Lido do próprio media query (e não de um estado setado em efeito), para que
   o primeiro render já saiba se deve animar. No servidor assume "pode animar". */
function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false
  );
}

/* Dispara uma única vez quando ~30% do elemento entra na viewport.
   O observer fica no bloco que anima (grid / bloco de custo), não na <section>:
   a seção é mais alta que a viewport no mobile, onde 30% dela nunca fica
   visível de uma vez e o gatilho jamais aconteceria. */
function useInViewOnce<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setInView(true);
        observer.disconnect();
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function Comparison() {
  const reduced = useReducedMotion();
  const { ref: gridRef, inView: gridInView } = useInViewOnce<HTMLUListElement>();

  /* Cascata dos selos: 100ms de atraso entre cards. Com reduced motion, o
     estado final entra de uma vez. */
  const cascade = (index: number) => ({
    transitionDelay: reduced ? "0ms" : `${index * 100}ms`,
    transitionDuration: reduced ? "0ms" : "400ms",
  });

  return (
    <section id="comparativo" className="py-20 md:py-32 px-4 relative">
      <div className="absolute inset-0">
        <div
          className="absolute float-animation-delayed"
          style={{
            top: "33%",
            right: 0,
            width: "400px",
            height: "400px",
            background: "hsl(210 70.2% 50% / 0.08)",
            borderRadius: "9999px",
            filter: "blur(140px)",
          }}
        />
        <div
          className="absolute float-animation"
          style={{
            bottom: "25%",
            left: 0,
            width: "300px",
            height: "300px",
            background: "hsl(210 70.2% 50% / 0.05)",
            borderRadius: "9999px",
            filter: "blur(120px)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-12 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-3 text-balance">
            Você não precisa de uma agência. Precisa de{" "}
            <span className="hero-text-gradient">um time de 5 pessoas</span>.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Veja quanto custa montar esse time sozinho — e por que quase ninguém
            consegue.
          </p>
        </ScrollReveal>

        {/* ── Os 5 profissionais ── */}
        <ul
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-10 md:mb-14"
        >
          {PROFESSIONALS.map((prof, index) => (
            <li
              key={prof.title}
              className={`list-none ${
                index === PROFESSIONALS.length - 1
                  ? "col-span-2 sm:col-span-1"
                  : ""
              }`}
            >
              <ScrollReveal delay={index * 0.1} className="h-full">
                <div className="glass-card group relative flex h-full flex-col items-center overflow-hidden px-3 pb-5 pt-10 md:px-4 md:pb-6 md:pt-11 text-center transition-colors duration-300 hover:bg-[rgba(7,20,39,0.8)]">
                  {/* Selo: entra em cascata quando o grid aparece */}
                  <span
                    className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full border border-[rgba(61,158,255,0.28)] bg-[rgba(61,158,255,0.1)] px-2 py-[3px] text-[0.6875rem] font-semibold leading-none text-cta transition-all ease-out"
                    style={{
                      opacity: gridInView ? 1 : 0,
                      transform: gridInView
                        ? "translateY(0)"
                        : "translateY(-4px)",
                      ...cascade(index),
                    }}
                  >
                    <Check className="h-3 w-3" strokeWidth={1.5} aria-hidden />
                    já incluído
                  </span>

                  <div className={ICON_TILE}>
                    <prof.icon
                      className="h-[26px] w-[26px] text-cta"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </div>

                  <h3 className="mt-4 text-sm md:text-base font-bold font-[family-name:var(--font-display)]">
                    {prof.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {prof.description}
                  </p>

                  {/* Preço: risca e esvanece junto do selo */}
                  <p
                    className={`mt-auto pt-3 text-sm md:text-[0.95rem] font-bold transition-colors ease-out ${
                      gridInView ? "text-muted-foreground" : "text-cta"
                    }`}
                    style={cascade(index)}
                  >
                    <span className="relative inline-block">
                      {prof.price}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute left-0 top-1/2 h-[1.5px] w-full origin-left rounded-full bg-current transition-transform ease-out"
                        style={{
                          transform: gridInView ? "scaleX(1)" : "scaleX(0)",
                          ...cascade(index),
                        }}
                      />
                    </span>
                  </p>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ul>

        {/* ── Resolução + CTA: card único, centralizado ── */}
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="relative rounded-[1.25rem] border border-[rgba(40,126,215,0.2)] p-2 md:rounded-[1.5rem] md:p-3">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
                variant="brand"
              />
              <div className="glass-card relative z-10 flex h-full flex-col overflow-hidden p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] text-balance">
                  Com a JTP, você contrata{" "}
                  <span className="hero-text-gradient">um time</span>. Não cinco
                  pessoas.
                </h3>

                <ul className="mt-6 space-y-3.5">
                  {JTP_DELIVERS.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm md:text-base text-foreground"
                    >
                      <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[rgba(61,158,255,0.3)] bg-[rgba(61,158,255,0.12)]">
                        <Check
                          className="h-3 w-3 text-cta"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <button
                    type="button"
                    className="btn-cta glow-blue w-full"
                    onClick={scrollToFormulario}
                  >
                    Quero saber mais
                  </button>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Diagnóstico gratuito. Em 15 minutos você sai com o número na
                    mão.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
