"use client";

import { Target, MapPin, Route, DollarSign, Brain, Headphones } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const DIFFERENTIALS_DESKTOP = [
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

const DIFFERENTIALS_MOBILE = [
  {
    icon: Target,
    title: "Tráfego pago que vira cliente",
    description:
      "Gerenciamos seus anúncios com foco total em conversão. Cada real investido é rastreado até a venda, não até a curtida.",
  },
  {
    icon: MapPin,
    title: "Você aparece quando o cliente procura",
    description:
      "Otimizamos seu Google Meu Negócio e sua presença digital pra você aparecer no mapa, no Google e nas redes na hora certa.",
  },
  {
    icon: Brain,
    title: "Estratégia antes da execução",
    description:
      "Nada de campanha no impulso. Planejamos toda a jornada, da atração até o fechamento, com foco em resultado real e não em número de vaidade.",
  },
  {
    icon: Headphones,
    title: "Seu processo comercial também melhora",
    description:
      "Ajustamos o atendimento pra nenhum lead esfriar. Não geramos só demanda, atuamos dentro do processo de venda da sua empresa.",
  },
];

function scrollToFormulario() {
  const target = document.getElementById("formulario");
  if (!target) return;
  const offset = window.innerWidth >= 1024 ? 72 : 64;
  const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

export function Differentials() {
  return (
    <section id="diferenciais" className="py-20 md:py-32 px-4 relative overflow-hidden">
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
      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-4">
            Por que somos <span className="hero-text-gradient">diferentes</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Não somos uma agência comum. Construímos uma máquina de vendas onde cada clique tem um propósito e todo esforço vira resultado no seu caixa.
          </p>
        </ScrollReveal>

        {/* DESKTOP GRID - 6 Cards */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
          {DIFFERENTIALS_DESKTOP.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.1} className="h-full">
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
          
          <div className="col-span-1 md:col-span-3 mt-8">
            <ScrollReveal delay={0.6}>
              <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-primary/30 via-primary/80 to-primary/30 group overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 animate-pulse blur-md"></div>
                <div className="relative bg-background/90 backdrop-blur-2xl rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  <div className="text-center md:text-left flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] text-foreground">
                      Descubra em 2 minutos quanto sua empresa está perdendo sem estratégia digital
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    <button 
                      onClick={scrollToFormulario}
                      className="btn-cta glow-blue"
                    >
                      Ver diagnóstico grátis
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* MOBILE GRID - 4 Cards */}
        <div className="grid md:hidden grid-cols-1 gap-6">
          {DIFFERENTIALS_MOBILE.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.1} className="h-full">
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
          
          <div className="col-span-1 mt-6">
            <ScrollReveal delay={0.5}>
              <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-primary/30 via-primary/80 to-primary/30 group overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 animate-pulse blur-md"></div>
                <div className="relative bg-background/90 backdrop-blur-2xl rounded-2xl p-5 flex flex-col items-center gap-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  <div className="text-center flex-1">
                    <h3 className="text-lg font-bold font-[family-name:var(--font-display)] text-foreground">
                      Descubra em 2 minutos quanto sua empresa está perdendo sem estratégia digital
                    </h3>
                  </div>
                  <div className="flex-shrink-0 w-full flex justify-center">
                    <button 
                      onClick={scrollToFormulario}
                      className="btn-cta glow-blue w-full sm:w-auto"
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
