"use client";

import { type FormEvent } from "react";
import { Send, CircleCheckBig } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import {
  WHATSAPP_NUMBER,
  SETOR_OPTIONS,
  FATURAMENTO_OPTIONS,
} from "@/lib/constants";

const BENEFITS = [
  "Diagnóstico gratuito do seu negócio",
  "Estratégia personalizada de crescimento",
  "Sem compromisso, conhecer é o primeiro passo",
];

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const data = {
    nome: String(formData.get("nome") ?? ""),
    email: String(formData.get("email") ?? ""),
    whatsapp: String(formData.get("whatsapp") ?? ""),
    empresa: String(formData.get("empresa") ?? ""),
    setor: String(formData.get("setor") ?? ""),
    faturamento: String(formData.get("faturamento") ?? ""),
  };

  const message = encodeURIComponent(
    "Olá! Vim pelo site e gostaria de mais informações.\n\n" +
      `Nome: ${data.nome}\n` +
      `Email: ${data.email}\n` +
      `WhatsApp: ${data.whatsapp}\n` +
      `Empresa: ${data.empresa}\n` +
      `Setor: ${data.setor}\n` +
      `Faturamento: ${data.faturamento}`
  );

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
}

export function Contact() {
  return (
    <section id="formulario" className="py-20 md:py-32 px-4 relative">
      <div className="absolute inset-0">
        <div
          className="absolute"
          style={{
            top: 0,
            right: "25%",
            width: "24rem",
            height: "24rem",
            background: "hsl(210 70.2% 50% / 0.08)",
            borderRadius: "9999px",
            filter: "blur(120px)",
          }}
        />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-6">
              Pronto para <span className="text-gradient">escalar</span> seu
              negócio?
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Preencha o formulário e nossa equipe entrará em contato para
              entender a realidade da sua empresa e apresentar a melhor
              estratégia.
            </p>
            <div className="space-y-4">
              {BENEFITS.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CircleCheckBig className="w-5 h-5 text-cta shrink-0" />
                  <span className="text-foreground/80">{benefit}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <form
              id="contact-form"
              className="glass-card gradient-border p-8 space-y-4"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="nome"
                placeholder="Nome completo"
                required
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground"
                style={{ background: "hsl(216 50% 14.9% / 0.9)" }}
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                required
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground"
                style={{ background: "hsl(216 50% 14.9% / 0.9)" }}
              />
              <input
                type="tel"
                name="whatsapp"
                placeholder="DDD + WhatsApp"
                required
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground"
                style={{ background: "hsl(216 50% 14.9% / 0.9)" }}
              />
              <input
                type="text"
                name="empresa"
                placeholder="Nome da empresa"
                required
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground"
                style={{ background: "hsl(216 50% 14.9% / 0.9)" }}
              />
              <select
                name="setor"
                required
                defaultValue=""
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground"
                style={{ background: "hsl(216 50% 14.9% / 0.9)" }}
              >
                <option value="" disabled>
                  Setor da empresa
                </option>
                {SETOR_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <select
                name="faturamento"
                required
                defaultValue=""
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground"
                style={{ background: "hsl(216 50% 14.9% / 0.9)" }}
              >
                <option value="" disabled>
                  Faturamento mensal
                </option>
                {FATURAMENTO_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full btn-cta glow-blue flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                RECEBER DIAGNÓSTICO GRATUITO
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
