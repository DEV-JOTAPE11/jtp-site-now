"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";

function scrollToFormulario() {
  const target = document.getElementById("formulario");
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Desktop (>= 1024px) */}
      <div className="hidden lg:block relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/imagem-background-hero.svg"
            alt="João Pedro - Fundador da JTP Services"
            width={1920}
            height={1080}
            className="absolute hero-image-mask hero-desktop-media"
            fetchPriority="high"
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, var(--color-background), transparent, transparent)",
            }}
          />

          <div
            className="absolute pulse-glow"
            style={{
              top: "50%",
              right: "25%",
              transform: "translateY(-50%)",
              width: "500px",
              height: "500px",
              background: "hsl(210 70.2% 50% / 0.3)",
              borderRadius: "9999px",
              filter: "blur(130px)",
            }}
          />

          <div
            className="absolute z-20 text-center"
            style={{
              bottom: "4rem",
              left: "74%",
              transform: "translateX(-50%)",
              fontSize: "0.875rem",
            }}
          >
            <p className="font-[family-name:var(--font-display)] font-bold text-foreground">
              João Pedro
            </p>
            <p className="text-primary text-xs tracking-widest uppercase">
              Fundador
            </p>
          </div>
        </div>

        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          <div
            className="absolute float-animation"
            style={{
              top: "25%",
              left: "10%",
              width: "400px",
              height: "400px",
              background: "hsl(210 70.2% 50% / 0.1)",
              borderRadius: "9999px",
              filter: "blur(160px)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full min-h-screen flex items-center px-12 py-20 hero-desktop-content">
          <div style={{ maxWidth: "42rem" }}>
            <div className="mb-6 flex justify-center">
              <Image
                src="/img/logo-hero-name.svg"
                alt="Ascensão Company"
                width={640}
                height={241}
                className="h-auto object-contain mx-auto"
                style={{ width: "min(520px, 80vw)" }}
              />
            </div>

            <ScrollReveal>
              <h1 className="text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] leading-tight mb-6">
                Sua empresa não precisa só de um{" "}
                <span className="hero-text-gradient">site.</span>
                <br />
                Precisa vender mais e gerar{" "}
                <span className="hero-text-gradient">resultados.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="mb-5">
                <p className="text-2xl font-[family-name:var(--font-display)] font-semibold text-foreground/90">
                  Site + Divulgação + Estratégia ={" "}
                  <span className="hero-text-gradient">Clientes</span>
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-lg text-muted-foreground max-w-lg mb-8">
                Criamos uma estrutura digital completa para atrair as pessoas
                certas, apresentar sua marca com autoridade e transformar
                visitantes em vendas.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="mb-6">
                <button className="btn-cta glow-blue" onClick={scrollToFormulario}>
                  <WhatsAppIcon className="h-5 w-5" />
                  SOLICITAR DIAGNÓSTICO GRATUITO
                </button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <button
                type="button"
                onClick={scrollToFormulario}
                aria-label="Rolar para o formulário"
                className="inline-flex"
              >
                <ArrowDown className="w-6 h-6 text-muted-foreground animate-bounce" />
              </button>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Mobile + tablet (< 1024px) */}
      <div className="hero-mobile lg:hidden relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="hero-mobile-photo">
          <div className="hero-mobile-glow pulse-glow" aria-hidden="true" />
          <Image
            src="/img/new-hero-abstract.svg"
            alt="João Pedro, fundador da JTP Services"
            width={800}
            height={1200}
            className="hero-mobile-photo__img"
            fetchPriority="high"
          />
        </div>

        <div className="hero-mobile-content">
          <Image
            src="/img/logo-hero-name.svg"
            alt="Ascensão Company"
            width={640}
            height={241}
            className="hero-mobile-logo"
          />

          <ScrollReveal>
            <h1 className="hero-mobile-title font-bold font-[family-name:var(--font-display)]">
              Sua empresa não precisa só de um
              <span className="hero-text-gradient"> site.</span>
              <br />
              Precisa vender mais e gerar{" "}
              <span className="hero-text-gradient">resultados.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="hero-mobile-equation font-[family-name:var(--font-display)] font-semibold text-foreground/90">
              Site + Divulgação + Estratégia ={" "}
              <span className="hero-text-gradient">Clientes</span>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="hero-mobile-description text-muted-foreground">
              Criamos uma estrutura digital completa para atrair as pessoas
              certas, apresentar sua marca com autoridade e transformar
              visitantes em vendas.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <button
              className="btn-cta glow-blue hero-mobile-cta"
              onClick={scrollToFormulario}
            >
              <WhatsAppIcon className="h-5 w-5" />
              Solicitar diagnóstico gratuito
            </button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
