"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Footer } from "@/components/layout/Footer";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import {
  PORTFOLIO_FILTERS,
  PORTFOLIO_PROJECTS,
  countProjectsByFilter,
} from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import type { PortfolioFilter } from "@/types";

const ParticlesCanvas = dynamic(
  () =>
    import("@/components/shared/ParticlesCanvas").then(
      (mod) => mod.ParticlesCanvas
    ),
  { ssr: false }
);

const FloatingWhatsApp = dynamic(
  () =>
    import("@/components/shared/FloatingWhatsApp").then(
      (mod) => mod.FloatingWhatsApp
    ),
  { ssr: false }
);

export function PortfolioPageContent() {
  const [filter, setFilter] = useState<PortfolioFilter>("Todos");

  const filteredProjects = useMemo(
    () =>
      PORTFOLIO_PROJECTS.filter((project) =>
        filter === "Todos" ? true : project.category === filter
      ),
    [filter]
  );

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <ParticlesCanvas />

      <section className="relative z-10 px-4 pt-12 pb-20 md:pt-16 md:pb-28">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-secondary/50 px-4 py-2 text-sm font-semibold text-muted-foreground transition-all duration-300 hover:bg-primary/20 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7eb8ff]/50"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para o início
          </Link>

          <ScrollReveal className="text-center mb-16 mt-10 md:mt-14">
            <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-display)] leading-[1.1] mb-4">
              Galeria de <span className="hero-text-gradient">Sucesso</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore nossos projetos entregues. Cada site é desenvolvido
              estrategicamente para gerar resultados e fortalecer a marca dos
              nossos clientes.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div
              className="mb-12 flex flex-wrap justify-center gap-3"
              role="tablist"
              aria-label="Filtrar projetos por categoria"
            >
              {PORTFOLIO_FILTERS.map((category) => {
                const isActive = filter === category;

                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setFilter(category)}
                    className={cn(
                      "portfolio-filter flex h-10 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-all duration-300",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7eb8ff]/50",
                      isActive && "scale-105 glow-blue"
                    )}
                  >
                    {category}
                    <span
                      className={cn(
                        "flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold text-primary-foreground transition-colors",
                        isActive ? "bg-background/30" : "bg-primary/30"
                      )}
                    >
                      {countProjectsByFilter(category)}
                    </span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          <PortfolioGrid projects={filteredProjects} variant="portfolio" />

          {filteredProjects.length === 0 && (
            <div className="mt-6 rounded-2xl border border-primary/10 bg-primary/5 py-20 text-center">
              <p className="text-muted-foreground">
                Nenhum projeto encontrado nesta categoria no momento.
              </p>
              <button
                type="button"
                onClick={() => setFilter("Todos")}
                className="mt-2 text-sm font-semibold text-primary underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7eb8ff]/50"
              >
                Ver todos os projetos
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
