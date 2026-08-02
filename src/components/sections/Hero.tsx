"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/constants";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`;

/* A hero usa .hero-reveal (CSS) no lugar do ScrollReveal (framer-motion): o
   conteúdo da primeira dobra precisa ser pintado sem esperar a hidratação,
   senão não existe candidato a LCP. As demais seções seguem com ScrollReveal. */
function revealDelay(seconds: number) {
  return seconds ? { animationDelay: `${seconds}s` } : undefined;
}

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
          {/* Os dois heros coexistem no DOM (um oculto por display:none), então
              o `sizes` faz o trabalho de art direction: o `1px` fora do
              breakpoint leva o browser a escolher o menor degrau do srcset no
              lado que nunca exibe esta imagem. */}
          <Image
            src="/img/imagem-background-hero.webp"
            alt="João Pedro - Fundador da JTP Services"
            width={1920}
            height={1080}
            className="absolute hero-image-mask hero-desktop-media"
            /* Elemento LCP do desktop. O `fetchPriority` sozinho deixava em pé
               o `loading="lazy"` padrão do next/image: prioridade alta e
               carregamento adiado ao mesmo tempo, e o Lighthouse reprovava
               ("os recursos do LCP não devem usar loading=lazy").

               `loading="eager"` em vez de `priority` (deprecado no Next 16 em
               favor de `preload`). Efeito colateral aceito: o SSR do React 19
               emite <link rel=preload> sozinho para todo <img> que não seja
               loading="lazy" nem fetchPriority="low", e promove ao balde de
               alta prioridade quando fetchPriority="high" — não é o Next que
               injeta, então `preload={false}` não teria efeito nenhum aqui.
               Com isso o mobile, onde esta imagem fica em display:none, baixa
               o menor degrau do srcset (~6,9 KB AVIF, graças ao `1px` do
               `sizes`). Custo medido e validado contra o alvo de não regredir
               o mobile. */
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1024px) 84vw, 1px"
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
                src="/img/logo-hero-name.webp"
                alt="Ascensão Company"
                width={640}
                height={241}
                className="h-auto object-contain mx-auto"
                style={{ width: "min(520px, 80vw)" }}
                sizes="(min-width: 1024px) 520px, 1px"
              />
            </div>

            <div className="hero-reveal">
              <h1 className="text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] leading-tight mb-6">
                Sua empresa não precisa só de um{" "}
                <span className="hero-text-gradient">site.</span>
                <br />
                Precisa vender mais e gerar{" "}
                <span className="hero-text-gradient">resultados.</span>
              </h1>
            </div>

            <div className="hero-reveal" style={revealDelay(0.1)}>
              <div className="mb-5">
                <p className="text-2xl font-[family-name:var(--font-display)] font-semibold text-foreground/90">
                  Site + Divulgação + Estratégia ={" "}
                  <span className="hero-text-gradient">Clientes</span>
                </p>
              </div>
            </div>

            <div className="hero-reveal" style={revealDelay(0.2)}>
              <p className="text-lg text-muted-foreground max-w-lg mb-8">
                Criamos uma estrutura digital completa para atrair as pessoas
                certas, apresentar sua marca com autoridade e transformar
                visitantes em vendas.
              </p>
            </div>

            <div className="hero-reveal" style={revealDelay(0.3)}>
              <div className="mb-6">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta btn-cta-whatsapp glow-whatsapp"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  FALE CONOSCO!
                </a>
              </div>
            </div>

            <div className="hero-reveal" style={revealDelay(0.4)}>
              <button
                type="button"
                onClick={scrollToFormulario}
                aria-label="Rolar para o formulário"
                className="inline-flex"
              >
                <ArrowDown className="w-6 h-6 text-muted-foreground animate-bounce" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile + tablet (< 1024px) */}
      <div className="hero-mobile lg:hidden relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="hero-mobile-photo">
          <div className="hero-mobile-glow pulse-glow" aria-hidden="true" />
          {/* elemento LCP do mobile — que é o que o PageSpeed audita: carrega
              com prioridade em vez de lazy, para virar candidato cedo. */}
          <Image
            src="/img/new-hero-abstract.webp"
            alt="João Pedro, fundador da JTP Services"
            width={800}
            height={1200}
            className="hero-mobile-photo__img"
            /* Mesma receita do hero desktop, e pelo mesmo motivo. O `priority`
               que estava aqui (deprecado no Next 16) só liga o preload —
               `preload: preload || priority` — sem setar fetchPriority. O
               React 19 então despejava esta imagem no balde comum de preloads,
               que ele descarrega DEPOIS do balde de alta prioridade, onde o
               hero desktop já estava por causa do seu fetchPriority="high".
               Resultado no iPhone: uma imagem em display:none era buscada na
               frente do elemento LCP real da tela. */
            loading="eager"
            fetchPriority="high"
            /* espelha o --hero-photo-w do CSS: declarar só o teto de 26rem
               fazia o browser pedir o degrau de 750px quando a altura da tela
               (42vh) é o limite real na maioria dos aparelhos. */
            sizes="(max-width: 1023px) min(104vw, 42vh, 26rem), 1px"
          />
        </div>

        <div className="hero-mobile-content">
          <Image
            src="/img/logo-hero-name.webp"
            alt="Ascensão Company"
            width={640}
            height={241}
            className="hero-mobile-logo"
            sizes="(max-width: 1023px) 16rem, 1px"
          />

          <div className="hero-reveal">
            <h1 className="hero-mobile-title font-bold font-[family-name:var(--font-display)]">
              Sua empresa não precisa só de um
              <span className="hero-text-gradient"> site.</span>
              <br />
              Precisa vender mais e gerar{" "}
              <span className="hero-text-gradient">resultados.</span>
            </h1>
          </div>

          <div className="hero-reveal" style={revealDelay(0.1)}>
            <p className="hero-mobile-equation font-[family-name:var(--font-display)] font-semibold text-foreground/90">
              Site + Divulgação + Estratégia ={" "}
              <span className="hero-text-gradient">Clientes</span>
            </p>
          </div>

          <div className="hero-reveal" style={revealDelay(0.2)}>
            <p className="hero-mobile-description text-muted-foreground">
              Criamos uma estrutura digital completa para atrair as pessoas
              certas, apresentar sua marca com autoridade e transformar
              visitantes em vendas.
            </p>
          </div>

          <div className="hero-reveal" style={revealDelay(0.3)}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta btn-cta-whatsapp glow-whatsapp hero-mobile-cta"
            >
              <WhatsAppIcon className="h-5 w-5" />
              FALE CONOSCO!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
