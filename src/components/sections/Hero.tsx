"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";

function scrollToFormulario() {
  const target = document.getElementById("formulario");
  if (!target) return;
  const offset = window.innerWidth >= 1024 ? 72 : 64;
  const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Desktop */}
      <div className="hidden md:block relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/imagem-background-hero.webp"
            alt="João Pedro - Fundador da JTP Services"
            width={1200}
            height={1200}
            className="absolute right-0 bottom-0 h-auto object-contain brightness-125 contrast-110 hero-image-mask hero-desktop-media"
            style={{ width: "75%" }}
            priority
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
              left: "58%",
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
                src="/img/logo-hero-name.png"
                alt="Ascensão Company"
                width={520}
                height={180}
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

      {/* Mobile */}
      <div className="md:hidden flex flex-col min-h-screen">
        <div className="relative w-full pt-20">
          <div
            className="absolute pulse-glow"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "300px",
              height: "300px",
              background: "hsl(210 70.2% 50% / 0.3)",
              borderRadius: "9999px",
              filter: "blur(90px)",
            }}
          />
          <Image
            src="/img/imagem-background-hero.png"
            alt="João Pedro - Fundador da JTP Services"
            width={800}
            height={800}
            className="relative w-full h-auto object-contain brightness-125 contrast-110 hero-image-mask-mobile"
            priority
          />
          <div
            className="absolute flex justify-center text-xs z-10"
            style={{ bottom: "1rem", left: 0, right: 0 }}
          >
            <div className="text-center">
              <p className="font-[family-name:var(--font-display)] font-bold text-foreground">
                João Pedro
              </p>
              <p
                className="text-primary uppercase tracking-widest"
                style={{ fontSize: "10px" }}
              >
                Fundador
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 px-6 pb-12 -mt-8 flex-1 flex flex-col justify-center">
          <div className="absolute inset-0" style={{ zIndex: 1 }}>
            <div
              className="absolute float-animation"
              style={{
                top: 0,
                left: "10%",
                width: "200px",
                height: "200px",
                background: "hsl(210 70.2% 50% / 0.1)",
                borderRadius: "9999px",
                filter: "blur(100px)",
              }}
            />
          </div>
          <div className="relative z-10">
            <div className="mb-4 flex justify-center">
              <Image
                src="/img/logo-hero-name.png"
                alt="Ascensão Company"
                width={320}
                height={110}
                className="h-auto object-contain mx-auto"
                style={{ width: "min(320px, 82vw)" }}
              />
            </div>
            <ScrollReveal>
              <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)] leading-tight mb-4">
                Sua empresa não precisa só de um
                <span className="hero-text-gradient"> site.</span>
                <br />
                Precisa vender mais e gerar{" "}
                <span className="hero-text-gradient">resultados.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mb-4">
                <p className="hero-mobile-equation font-[family-name:var(--font-display)] font-semibold text-foreground/90">
                  Site + Divulgação + Estratégia ={" "}
                  <span className="hero-text-gradient">Clientes</span>
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-sm text-muted-foreground max-w-lg mb-6">
                Criamos uma estrutura digital completa para atrair as pessoas
                certas, apresentar sua marca com autoridade e transformar
                visitantes em vendas.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="mb-4">
                <button className="btn-cta glow-blue hero-mobile-cta" onClick={scrollToFormulario}>
                  <WhatsAppIcon className="h-5 w-5" />
                  Solicitar diagnóstico gratuito
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
                <ArrowDown className="w-5 h-5 text-muted-foreground animate-bounce" />
              </button>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
