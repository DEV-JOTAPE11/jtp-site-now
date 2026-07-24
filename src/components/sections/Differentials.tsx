"use client";

import { Target, TrendingUp, Brain, Headphones } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const DIFFERENTIALS = [
  {
    icon: Target,
    title: "Atuação completa na jornada de compra",
    description:
      "Da atração até a conversão e retenção, estamos em cada etapa do funil.",
  },
  {
    icon: TrendingUp,
    title: "Foco em resultado real",
    description:
      "Não trabalhamos com métricas de vaidade. Nosso foco é crescimento tangível.",
  },
  {
    icon: Brain,
    title: "Estratégia profunda",
    description:
      "Muito mais do que subir anúncio. Planejamento estratégico completo.",
  },
  {
    icon: Headphones,
    title: "Melhoria do atendimento comercial",
    description:
      "Otimizamos o processo comercial para que nenhuma oportunidade seja perdida.",
  },
];

export function Differentials() {
  return (
    <section id="diferenciais" className="py-20 md:py-32 px-4 relative">
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
      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-4">
            Por que somos <span className="text-primary">diferentes</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Não só geramos demanda, atuamos dentro do processo comercial da sua
            empresa.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DIFFERENTIALS.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.1}>
              <div className="glass-card gradient-border p-8 hover:bg-card/60 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-display)] mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
