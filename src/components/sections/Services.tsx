"use client";

import { Video, BarChart3, PenTool, Globe, Share2 } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GlowingEffect } from "@/components/ui/glowing-effect";

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
    icon: PenTool,
    title: "Copywriting e Páginas de Alta Conversão",
    description:
      "Textos e páginas estruturados para persuadir, gerar confiança e converter visitantes em clientes.",
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

        <ul className="grid grid-cols-2 grid-rows-3 gap-4 lg:grid-cols-12 lg:grid-rows-2">
          {SERVICES.map((service, index) => {
            let areaClass = "";
            if (index === 0) areaClass = "[grid-area:1/1/2/2] lg:[grid-area:1/1/2/5]";
            if (index === 1) areaClass = "[grid-area:1/2/2/3] lg:[grid-area:2/1/3/5]";
            if (index === 2) areaClass = "[grid-area:2/1/3/2] lg:[grid-area:1/5/3/9]";
            if (index === 3) areaClass = "[grid-area:2/2/3/3] lg:[grid-area:1/9/2/13]";
            if (index === 4) areaClass = "[grid-area:3/1/4/3] lg:[grid-area:2/9/3/13]";

            return (
              <ScrollReveal
                key={service.title}
                as="li"
                delay={index * 0.1}
                className={areaClass}
              >
                <div className="relative h-full rounded-[1.25rem] border border-[rgba(40,126,215,0.2)] p-2 md:rounded-[1.5rem] md:p-3 list-none">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                    variant="brand"
                  />
                  <div className="glass-card relative flex h-full flex-col justify-between overflow-hidden rounded-xl p-4 md:p-6 text-center hover:bg-[rgba(7,20,39,0.8)] transition-all duration-300 group z-10">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4 md:mb-5 group-hover:glow-blue transition-all duration-300 flex-shrink-0">
                      <service.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-base md:text-lg font-bold font-[family-name:var(--font-display)] mb-2 md:mb-3">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-xs md:text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
