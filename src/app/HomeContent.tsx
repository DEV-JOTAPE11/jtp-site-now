"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { Differentials } from "@/components/sections/Differentials";
import { Testimonials } from "@/components/sections/Testimonials";
import { Portfolio } from "@/components/sections/Portfolio";
import { Services } from "@/components/sections/Services";
import { Comparison } from "@/components/sections/Comparison";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/shared/MotionProvider";

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

/* Árvore de cliente da home. Foi separada de page.tsx para que page.tsx pudesse
   voltar a ser Server Component e emitir o JSON-LD no HTML do servidor — dado
   estruturado montado no cliente não é o que o rastreador lê primeiro. O
   `ssr: false` destes dois dynamic() só é válido em Client Component, então
   eles têm de continuar deste lado da fronteira. Mesmo arranjo de
   /portfolio (page.tsx + PortfolioPageContent.tsx). */
export function HomeContent() {
  return (
    <MotionProvider>
      <main className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
        {/* Navbar removida do site (componente mantido em
            components/layout/Navbar.tsx para rollback). */}
        <ParticlesCanvas />
        <Hero />
        <Differentials />
        <Testimonials />
        <Portfolio />
        <Services />
        <Comparison />
        {/* Seção "Agente de Inteligência Artificial" removida do site
            (componente mantido em components/sections/AIAgent.tsx para
            rollback). */}
        <Contact />
        <FAQ />
        <Footer />
        <FloatingWhatsApp />
      </main>
    </MotionProvider>
  );
}
