import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function Testimonials() {
  return (
    <section id="depoimentos" className="py-20 md:py-32 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-4">
            Histórias reais de{" "}
            <span className="hero-text-gradient">resultados</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Veja as histórias reais de quem já alcançou resultados
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[1, 2, 3].map((num) => (
            <ScrollReveal key={num} delay={num * 0.1}>
              <div className="glass-card gradient-border overflow-hidden rounded-2xl">
                <div className="aspect-[9/16]">
                  <iframe
                    src="about:blank"
                    title={`Depoimento ${num}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                    loading="lazy"
                    data-placeholder={`video-depoimento-${num}`}
                    style={{ background: "var(--color-secondary)" }}
                  />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
