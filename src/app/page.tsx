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

export default function Home() {
  return (
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
  );
}
