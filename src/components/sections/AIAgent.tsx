"use client";

import {
  Mic,
  ImageIcon,
  MessageCircle,
  Brain,
  Zap,
} from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const AI_SAVINGS = [
  "Contratar novos funcionários",
  "Arcar com salários e encargos trabalhistas",
  "Investir em treinamentos constantes",
  "Gerenciar equipe comercial",
];

const AI_FEATURES = [
  { icon: Mic, label: "Entende e envia áudio" },
  { icon: ImageIcon, label: "Processa imagens" },
  { icon: MessageCircle, label: "Entende contexto completo" },
  { icon: Brain, label: "Inteligência real, não chatbot travado" },
  { icon: Zap, label: "Atendimento 24/7 instantâneo" },
];

function scrollToFormulario() {
  const target = document.getElementById("formulario");
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function AIAgent() {
  return (
    <section id="agente-ia" className="py-20 md:py-32 px-4 relative">
      <div className="absolute inset-0">
        <div
          className="absolute float-animation"
          style={{
            top: "50%",
            left: 0,
            width: "500px",
            height: "500px",
            background: "hsl(210 70.2% 50% / 0.1)",
            borderRadius: "9999px",
            filter: "blur(150px)",
          }}
        />
        <div
          className="absolute float-animation-delayed"
          style={{
            bottom: 0,
            right: "25%",
            width: "300px",
            height: "300px",
            background: "hsl(210 70.2% 50% / 0.05)",
            borderRadius: "9999px",
            filter: "blur(100px)",
          }}
        />
      </div>

      <div
        className="absolute"
        style={{
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "250px",
          height: "3px",
          borderRadius: "9999px",
          background:
            "linear-gradient(to right, transparent, hsl(210 70.2% 50% / 0.4), transparent)",
          filter: "blur(1px)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-6">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-4">
            DESTAQUE ESPECIAL
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-4">
            Agente de{" "}
            <span className="text-gradient">Inteligência Artificial</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4">
            Não é um chatbot qualquer. É um agente inteligente que transforma o
            atendimento comercial da sua empresa.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="glass-card gradient-border p-8 max-w-3xl mx-auto mb-12">
            <h3 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-display)] mb-4 text-center">
              Economia real para{" "}
              <span className="hero-text-gradient">sua empresa</span>
            </h3>
            <p className="text-muted-foreground text-center mb-4">
              Com o agente de IA, sua empresa não precisa:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {AI_SAVINGS.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary/50"
                >
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: "var(--color-primary)" }}
                  />
                  <span className="text-foreground/80 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-sm text-center">
              Exemplo prático: Um vendedor CLT pode custar{" "}
              <strong className="text-foreground">
                R$ 5.000 a R$ 8.000 por mês
              </strong>{" "}
              com encargos. O agente de IA opera 24h por um custo muito menor,
              sem faltas, férias ou rotatividade.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10">
          {AI_FEATURES.map((feature, index) => (
            <ScrollReveal key={feature.label} delay={index * 0.1}>
              <div className="flex items-center gap-4 glass-card p-4 hover:bg-card/60 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground font-medium text-sm">
                  {feature.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="max-w-md mx-auto mb-10">
            <div className="glass-card gradient-border overflow-hidden rounded-2xl">
              <div className="aspect-[9/16]">
                <iframe
                  src="about:blank"
                  title="Demo Agente de IA"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                  loading="lazy"
                  data-placeholder="video-demo-ia"
                  style={{ background: "var(--color-secondary)" }}
                />
              </div>
            </div>
            <p className="text-muted-foreground text-xs text-center mt-3">
              Veja o agente em ação
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal className="text-center">
          <button className="btn-cta glow-blue" onClick={scrollToFormulario}>
            QUERO MEU AGENTE DE IA
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
}
