import type { Metadata } from "next";

import { PortfolioPageContent } from "./PortfolioPageContent";

const TITLE = "Portfólio Completo — Ascensão Company";
const DESCRIPTION =
  "Explore nossos projetos entregues. Cada site é desenvolvido estrategicamente para gerar resultados e fortalecer a marca dos nossos clientes.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function PortfolioPage() {
  return <PortfolioPageContent />;
}
