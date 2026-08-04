import type { Metadata, Viewport } from "next";
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

/* Título e descrição são a cópia que aparece no resultado de busca — não são
   slogan. Por isso o serviço vem antes da marca (é o que a pessoa digita) e a
   descrição cita site, tráfego pago e conversão de forma explícita, terminando
   na oferta que a página inteira usa como CTA.
   TITLE: 51 caracteres. DESCRIPTION: 153 — dentro dos ~60/~155 que o Google
   renderiza sem cortar. */
const TITLE = "Agência de Marketing Digital e Sites | JTP Services";
const DESCRIPTION =
  "Agência de marketing digital: criação de sites, landing pages que convertem e gestão de tráfego pago no Google e Meta Ads. Peça seu diagnóstico gratuito.";

/* Casa com --color-background (hsl(220 37.5% 3.1%)) do globals.css: é a cor que
   a barra do navegador tem de continuar quando o mobile pinta o chrome. */
export const viewport: Viewport = {
  themeColor: "#05070b",
};

export const metadata: Metadata = {
  /* Deixa canonical, OG e Twitter usarem caminho relativo. Sem isto, campo
     relativo em metadata é erro de build. */
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "agência de marketing digital",
    "criação de sites",
    "landing page que converte",
    "gestão de tráfego pago",
    "Google Ads",
    "Meta Ads",
    "social media",
    "edição de vídeo",
    "marketing digital em Arinos MG",
    "marketing digital Noroeste de Minas",
  ],
  authors: [{ name: "João Pedro (DEV-JOTAPE11)" }],
  creator: "JTP Services",
  publisher: "JTP Services",
  alternates: {
    canonical: "/",
  },
  /* `max-image-preview: large` é o que autoriza o Google a usar a miniatura
     grande no resultado — sem ele o padrão é a miniatura pequena. */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "JTP Services",
    locale: "pt_BR",
    title: TITLE,
    description: DESCRIPTION,
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
        alt: "Logotipo da JTP Services, agência de marketing digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@jtpservices",
    title: TITLE,
    description: DESCRIPTION,
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
