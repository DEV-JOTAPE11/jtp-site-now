"use client";

import { Video, BarChart3, Bot, Globe, Share2 } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const SERVICES = [
  {
    icon: Video,
    title: "Edição de Vídeos Profissionais",
    description:
      "Vídeos com motion design que capturam atenção e geram conversão.",
  },
  {
    icon: BarChart3,
    title: "Gestão de Tráfego Pago",
    description: "Google Ads e Meta Ads com estratégia focada em vendas.",
  },
  {
    icon: Bot,
    title: "Agentes de Inteligência Artificial",
    description:
      "IA integrada ao seu processo comercial para escalar vendas.",
  },
  {
    icon: Globe,
    title: "Desenvolvimento de Sites",
    description:
      "Sites profissionais otimizados para conversão e performance.",
  },
  {
    icon: Share2,
    title: "Gestão Estratégica de Social Media",
    description:
      "Conteúdo estratégico para fortalecer sua marca e gerar autoridade.",
  },
];

export function Services() {
  return (
    <section id="servicos" className="py-20 md:py-32 px-4 relative">
      <div className="absolute inset-0">
        <div
          className="absolute"
          style={{
            bottom: 0,
            left: "33%",
            width: "24rem",
            height: "24rem",
            background: "hsl(210 70.2% 50% / 0.08)",
            borderRadius: "9999px",
            filter: "blur(120px)",
          }}
        />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-4">
            Nossos <span className="hero-text-gradient">Serviços</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Soluções completas para escalar o seu negócio de forma estruturada.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.1}>
              <div className="glass-card gradient-border p-8 text-center hover:bg-card/60 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-5 group-hover:glow-blue transition-all duration-300">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold font-[family-name:var(--font-display)] mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {service.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
