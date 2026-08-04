/* Dados estruturados (JSON-LD) da home.

   Tudo sai daqui como um único @graph: as entidades se referenciam por @id em
   vez de repetir nome/URL/logo em cada bloco, então "quem é a JTP" existe uma
   vez só e os outros nós apontam para ela.

   Regra que vale para o arquivo inteiro: nada aqui pode afirmar o que a página
   não mostra. O FAQPage lê de lib/faq.ts (mesma fonte da seção renderizada), e
   campos que dependem de informação que não temos — nota de avaliação, número
   de reviews, endereço de rua — ficam de fora em vez de serem inventados. */
import { FAQS } from "@/lib/faq";
import { SITE_URL, SOCIAL_LINKS, WHATSAPP_NUMBER } from "@/lib/constants";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const BUSINESS_ID = `${SITE_URL}/#business`;

const LOGO_URL = `${SITE_URL}/img/logo-jtp-profissional.jpeg`;

const BUSINESS_DESCRIPTION =
  "Agência de marketing digital que une criação de sites e landing pages, gestão de tráfego pago no Google Ads e Meta Ads, copywriting, social media e edição de vídeo para transformar visitantes em clientes.";

/* Os 5 serviços do catálogo, na mesma ordem e com os mesmos nomes que a seção
   "Nossos Serviços" exibe. */
const SERVICES = [
  {
    name: "Criação de sites e landing pages",
    description:
      "Desenvolvimento de sites institucionais e landing pages otimizados para conversão e performance.",
  },
  {
    name: "Gestão de tráfego pago",
    description:
      "Campanhas no Google Ads e no Meta Ads com estratégia focada em vendas e cada real rastreado até o resultado.",
  },
  {
    name: "Edição de vídeos profissionais",
    description:
      "Vídeos com motion design que capturam atenção e sustentam a conversão nos anúncios e nas redes.",
  },
  {
    name: "Gestão estratégica de social media",
    description:
      "Conteúdo estratégico para redes sociais que fortalece a marca e gera autoridade.",
  },
  {
    name: "Copywriting e páginas de alta conversão",
    description:
      "Textos e páginas estruturados para persuadir, gerar confiança e converter visitantes em clientes.",
  },
] as const;

const organization = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "JTP Services",
  url: SITE_URL,
  description: BUSINESS_DESCRIPTION,
  logo: {
    "@type": "ImageObject",
    url: LOGO_URL,
    width: 1600,
    height: 1600,
  },
  image: LOGO_URL,
  sameAs: [SOCIAL_LINKS.instagram],
};

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "JTP Services",
  inLanguage: "pt-BR",
  publisher: { "@id": ORGANIZATION_ID },
  /* Sem `potentialAction`/SearchAction: o site não tem busca interna, e
     declarar uma caixa de busca que não existe é dado estruturado falso. */
};

const professionalService = {
  "@type": "ProfessionalService",
  "@id": BUSINESS_ID,
  name: "JTP Services",
  description: BUSINESS_DESCRIPTION,
  url: SITE_URL,
  image: LOGO_URL,
  logo: LOGO_URL,
  telephone: `+${WHATSAPP_NUMBER}`,
  parentOrganization: { "@id": ORGANIZATION_ID },
  /* Sem `streetAddress`/`postalCode`: o site não publica endereço de rua, e o
     Google trata endereço inventado como dado não confiável. Cidade/UF/país é
     o que dá para afirmar. */
  address: {
    "@type": "PostalAddress",
    addressLocality: "Arinos",
    addressRegion: "MG",
    addressCountry: "BR",
  },
  areaServed: [
    { "@type": "Country", name: "Brasil" },
    { "@type": "State", name: "Minas Gerais" },
  ],
  /* Faixa em vez de valor: o próprio FAQ diz que não há preço fixo publicado. */
  priceRange: "$$",
  currenciesAccepted: "BRL",
  knowsLanguage: "pt-BR",
  sameAs: [SOCIAL_LINKS.instagram],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços de marketing digital",
    itemListElement: SERVICES.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        serviceType: service.name,
        provider: { "@id": BUSINESS_ID },
        areaServed: { "@type": "Country", name: "Brasil" },
      },
    })),
  },
};

const faqPage = {
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  inLanguage: "pt-BR",
  isPartOf: { "@id": WEBSITE_ID },
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [organization, website, professionalService, faqPage],
};

/* `<` vira < para que uma string de conteúdo nunca consiga fechar a tag
   <script> e injetar markup — é a recomendação do próprio guia de JSON-LD do
   Next. O escape é válido dentro de string JSON, então o parser não estranha. */
export function jsonLdHtml(schema: unknown): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}
