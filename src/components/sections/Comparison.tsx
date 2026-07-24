"use client";

import { useEffect, useRef, useState } from "react";
import { Crown, PenTool, TrendingUp, Clapperboard, Target } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { COUNTER_TARGET } from "@/lib/constants";

const PROFESSIONALS = [
  {
    icon: Crown,
    title: "Líder de Vendas",
    description: "Para liderar, conduzir e treinar o time de vendas",
    price: "R$ 5.000,00/mês",
  },
  {
    icon: PenTool,
    title: "Redator de Publicidade",
    description: "Responsável por escrever textos persuasivos",
    price: "R$ 3.500,00/mês",
  },
  {
    icon: TrendingUp,
    title: "Gestor de Tráfego",
    description: "Para fazer seus anúncios patrocinados na internet",
    price: "R$ 2.500,00/mês",
  },
  {
    icon: Clapperboard,
    title: "Editor de Vídeo",
    description: "Para editar seus vídeos e aumentar o engajamento do público",
    price: "R$ 2.500,00/mês",
  },
  {
    icon: Target,
    title: "Gestor de Projetos",
    description:
      "O responsável por tomar conta de todo o projeto e liderar todo esse time",
    price: "R$ 7.500,00/mês",
  },
];

function scrollToFormulario() {
  const target = document.getElementById("formulario");
  if (!target) return;
  const offset = window.innerWidth >= 1024 ? 72 : 64;
  const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

export function Comparison() {
  const [counterValue, setCounterValue] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasAnimated.current) return;
          hasAnimated.current = true;

          const duration = 2000;
          const startTime = performance.now();

          const tick = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(COUNTER_TARGET * eased);
            setCounterValue(current);

            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setCounterValue(COUNTER_TARGET);
            }
          };

          requestAnimationFrame(tick);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
        <ScrollReveal className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-3">
            Quais profissionais você precisa{" "}
            <span className="text-primary">para executar este plano?</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Quanto você paga por cada um deles{" "}
            <strong className="text-foreground">NO MERCADO</strong>?
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-14">
          {PROFESSIONALS.map((prof, index) => (
            <ScrollReveal key={prof.title} delay={index * 0.1}>
              <div className="text-center group">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-secondary/60 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-all duration-300">
                  <prof.icon
                    className="w-10 h-10 md:w-12 md:h-12 text-muted-foreground group-hover:text-primary transition-colors duration-300"
                    style={{ opacity: 0.6 }}
                  />
                </div>
                <h4 className="font-bold font-[family-name:var(--font-display)] text-sm md:text-base mb-1">
                  {prof.title}
                </h4>
                <p className="text-muted-foreground text-xs mb-2 leading-relaxed">
                  {prof.description}
                </p>
                <p className="text-primary font-bold text-sm">{prof.price}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="scale">
          <div className="max-w-lg mx-auto">
            <div className="glass-card gradient-border p-10 text-center">
              <p className="text-lg md:text-xl font-[family-name:var(--font-display)] font-semibold mb-2 text-muted-foreground">
                Total se você contratar tudo separado:
              </p>
              <p className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-display)] text-primary mb-1">
                <span ref={counterRef}>
                  R$ {counterValue.toLocaleString("pt-BR")}
                </span>
                <span className="text-lg text-muted-foreground">/mês</span>
              </p>
              <p className="text-muted-foreground text-sm mb-6">
                Com a Ascensão, você tem uma assessoria completa que atua em
                todas essas frentes por um investimento muito menor.
              </p>
              <button className="btn-cta glow-blue w-full" onClick={scrollToFormulario}>
                QUERO MAIS INFORMAÇÕES
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
