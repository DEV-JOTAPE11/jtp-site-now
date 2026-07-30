"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { WHATSAPP_NUMBER } from "@/lib/constants";

/* Cada pergunta aqui existe para derrubar uma objeção específica — a ordem é
   proposital: preço primeiro (é o que trava a decisão), "já tentei antes" por
   último (é o que mais converte). */
const FAQS = [
  {
    question: "Quanto custa trabalhar com a JTP?",
    answer:
      "Depende do que o seu negócio precisa — e é por isso que a gente não coloca um preço fixo no site. Um comércio local que precisa aparecer no Google não tem a mesma necessidade de uma empresa que quer estruturar um time de vendas. No diagnóstico gratuito a gente entende seu cenário e você sai com o valor exato na mão, sem compromisso. O que a gente garante: é uma fração do que custaria montar esse time internamente.",
  },
  {
    question: "Preciso assinar contrato longo? E se eu quiser sair?",
    answer:
      "Você não fica preso. Trabalhamos com contratos mensais e você pode encerrar quando quiser, sem multa e sem processo trabalhista. Nossa lógica é simples: se a gente precisa de contrato longo para te manter, é porque o resultado não está te convencendo — e o problema é nosso, não seu.",
  },
  {
    question: "Em quanto tempo eu vejo resultado?",
    answer:
      "As primeiras oportunidades de venda costumam aparecer nas primeiras semanas, porque tráfego pago começa a rodar rápido. Autoridade e crescimento de marca levam mais tempo — de 3 a 6 meses para virar um fluxo consistente. Qualquer um que te prometer resultado explosivo em 7 dias está vendendo sorte, não estratégia.",
  },
  {
    question: "O investimento em anúncios está incluído no valor?",
    answer:
      "Não, e é importante deixar isso claro desde o começo. O valor da JTP é pelo trabalho da equipe; a verba que vai para o Google e a Meta é sua e fica na sua conta, com você acompanhando cada centavo. No diagnóstico a gente define juntos um valor de mídia realista para o seu momento — nunca mais do que seu negócio consegue sustentar.",
  },
  {
    question:
      "Já contratei agência antes e não funcionou. Por que agora seria diferente?",
    answer:
      "Na maioria dos casos o problema não foi o anúncio — foi que só existia o anúncio. Tráfego sem página que converte, sem texto que persuade e sem alguém para atender o lead que chega é dinheiro queimado. A JTP atua nas cinco frentes ao mesmo tempo justamente porque uma sozinha não sustenta resultado. Se depois do diagnóstico a gente achar que não é o momento do seu negócio, vamos te dizer isso.",
  },
];

const FAQ_WHATSAPP_MESSAGE =
  "Olá! Li as perguntas frequentes no site e ficou uma dúvida que não está lá.";

/* Quadradinho do chevron: mesmo tratamento dos tiles de ícone das outras
   seções, em escala reduzida. Reage ao hover do card inteiro (group). */
const CHEVRON_TILE = [
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px]",
  "border border-[rgba(61,158,255,0.18)] [border-top-color:rgba(61,158,255,0.45)]",
  "bg-[linear-gradient(180deg,rgba(61,158,255,0.16)_0%,rgba(61,158,255,0.04)_100%)]",
  "transition-[box-shadow,border-color] duration-300 ease-out",
  "group-hover:border-[rgba(61,158,255,0.3)] group-hover:[border-top-color:rgba(61,158,255,0.65)]",
  "group-hover:shadow-[0_0_20px_rgba(61,158,255,0.28)]",
].join(" ");

export function FAQ() {
  /* Todos os cards começam fechados (`null`): a seção abre compacta e o
     visitante escolhe a objeção dele. Um índice = aquele card aberto. */
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    FAQ_WHATSAPP_MESSAGE
  )}`;

  return (
    <section id="faq" className="py-20 md:py-32 px-4 relative">
      <div className="absolute inset-0">
        <div
          className="absolute float-animation"
          style={{
            top: "20%",
            left: 0,
            width: "22rem",
            height: "22rem",
            background: "hsl(210 70.2% 50% / 0.07)",
            borderRadius: "9999px",
            filter: "blur(130px)",
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-12 md:mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Perguntas Frequentes
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-4 text-balance">
            As dúvidas que aparecem antes de{" "}
            <span className="hero-text-gradient">começar</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Respostas diretas, sem letra miúda.
          </p>
        </ScrollReveal>

        <div className="space-y-3 md:space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-trigger-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <ScrollReveal key={faq.question} delay={index * 0.08}>
                {/* Estados de "aberto" vão em `style` de propósito: `.glass-card`
                    está fora de @layer e venceria as utilities de borda/fundo. */}
                <div
                  className="glass-card group overflow-hidden transition-[border-color,box-shadow,background] duration-300 ease-out"
                  style={
                    isOpen
                      ? {
                          borderColor: "rgba(61, 158, 255, 0.42)",
                          background: "rgba(9, 26, 50, 0.72)",
                          boxShadow:
                            "0 18px 40px rgba(2, 8, 23, 0.45), 0 0 26px rgba(61, 158, 255, 0.14)",
                        }
                      : undefined
                  }
                >
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center gap-4 px-5 py-5 text-left md:px-7 md:py-6"
                    >
                      <span
                        className={`flex-1 text-base md:text-lg font-bold font-[family-name:var(--font-display)] text-balance transition-colors duration-300 ${
                          isOpen ? "text-cta" : "group-hover:text-cta"
                        }`}
                      >
                        {faq.question}
                      </span>
                      <span className={CHEVRON_TILE} aria-hidden>
                        <ChevronDown
                          className={`h-4 w-4 text-cta transition-transform duration-300 ease-out motion-reduce:transition-none ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          strokeWidth={1.5}
                        />
                      </span>
                    </button>
                  </h3>

                  {/* A resposta continua no DOM quando fechada (conteúdo de FAQ
                      é o que o Google indexa); `inert` tira do foco e da árvore
                      de acessibilidade. A altura anima via grid-template-rows,
                      sem medir scrollHeight no JS. */}
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    inert={!isOpen}
                    className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm md:text-base text-muted-foreground leading-relaxed md:px-7 md:pb-6">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Fechamento em primeira pessoa: no fim do FAQ a confiança está baixa e
            voz humana converte melhor que voz institucional. */}
        <ScrollReveal delay={0.1}>
          <div className="mt-10 md:mt-12 text-center">
            <p className="text-muted-foreground text-base md:text-lg mb-5 text-balance">
              Ficou alguma dúvida que não está aqui?{" "}
              <span className="text-foreground font-semibold">
                Fala direto comigo no WhatsApp.
              </span>
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta btn-cta-whatsapp glow-whatsapp"
            >
              <WhatsAppIcon className="h-5 w-5" />
              MANDAR MINHA DÚVIDA
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
