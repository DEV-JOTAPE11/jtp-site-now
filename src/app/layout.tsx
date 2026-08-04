import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

/* Propriedade GA4 da JTP Services. */
const GA_MEASUREMENT_ID = "G-6VLBP3DVQV";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

const OG_DESCRIPTION =
  "Transforme a presença digital do seu negócio com a JTP Services. Especialistas em interfaces rápidas, modernas e responsivas.";

export const metadata: Metadata = {
  /* Deixa canonical, OG e Twitter usarem caminho relativo. Sem isto, campo
     relativo em metadata é erro de build. */
  metadataBase: new URL(SITE_URL),
  title: "JTP Services | Agência de Desenvolvimento Web",
  description:
    "JTP Services é uma agência especializada em desenvolvimento web, criando landing pages de alta conversão, sites institucionais e soluções digitais modernas.",
  authors: [{ name: "João Pedro (DEV-JOTAPE11)" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "JTP Services",
    locale: "pt_BR",
    title: "JTP Services | Soluções Web Modernas",
    description: OG_DESCRIPTION,
    images: [
      {
        url: "/img/logo-jtp-profissional.jpeg",
        /* 1600x1600 medido no arquivo. O index.html de origem declarava
           1200x630, que o arquivo nunca teve — e as redes usam o que está
           declarado para montar o card, então a mentira saía como corte
           errado no preview. */
        width: 1600,
        height: 1600,
        type: "image/jpeg",
        alt: "JTP Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@jtpservices",
    title: "JTP Services | Agência de Desenvolvimento Web",
    description: OG_DESCRIPTION,
    images: ["/img/logo-jtp-profissional.jpeg"],
  },
  icons: {
    icon: "/img/logo-jtp-80.webp",
    shortcut: "/img/logo-jtp-80.webp",
    apple: "/img/logo-jtp-160.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={spaceGrotesk.variable}>
      <body className="font-[family-name:var(--font-display)]">
        {children}

        {/* `lazyOnload` = ocioso do browser, que é o mesmo destino do
            requestIdleCallback que o index.html de origem montava à mão —
            só que pelo mecanismo do próprio framework. Analytics não pode
            disputar thread com a primeira pintura. */}
        <Script
          id="ga4-src"
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script id="ga4-config" strategy="lazyOnload">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`}
        </Script>
      </body>
    </html>
  );
}
