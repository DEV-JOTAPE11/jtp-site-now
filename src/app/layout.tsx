import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Ascensão Company — Estrutura para Escalar seu Negócio",
  description:
    "Assessoria de marketing e vendas que atua dentro do processo comercial da sua empresa. Tráfego pago, IA, vídeos e muito mais.",
  authors: [{ name: "Ascensão Company" }],
  openGraph: {
    type: "website",
    title: "Ascensão Company — Estrutura para Escalar seu Negócio",
    description:
      "Assessoria de marketing e vendas que atua dentro do processo comercial da sua empresa. Tráfego pago, IA, vídeos e muito mais.",
    images: [
      {
        url: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4664765f-d9fe-4b15-8057-e2c12a68afd9/id-preview-b47cecfc--dac851a4-c817-47a7-931a-a68ffd1f7095.lovable.app-1771436720063.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ascensão Company — Estrutura para Escalar seu Negócio",
    description:
      "Assessoria de marketing e vendas que atua dentro do processo comercial da sua empresa. Tráfego pago, IA, vídeos e muito mais.",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4664765f-d9fe-4b15-8057-e2c12a68afd9/id-preview-b47cecfc--dac851a4-c817-47a7-931a-a68ffd1f7095.lovable.app-1771436720063.png",
    ],
  },
  icons: {
    icon: "/img/logo-navbar.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={spaceGrotesk.variable}>
      <body className="font-[family-name:var(--font-display)]">{children}</body>
    </html>
  );
}
