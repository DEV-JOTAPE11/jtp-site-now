import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { FEATURED_PORTFOLIO_PROJECTS } from "@/lib/portfolio";

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20 md:py-32 px-4 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Nosso Portfólio
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-4">
            Sites que <span className="hero-text-gradient">Criamos</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Alguns dos projetos que desenvolvemos para empresas de todo o
            Brasil.
          </p>
        </ScrollReveal>

        <PortfolioGrid projects={FEATURED_PORTFOLIO_PROJECTS} variant="home" />

        <div className="mt-12 text-center">
          <Link href="/portfolio" className="btn-cta glow-blue">
            Ver portfólio completo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
