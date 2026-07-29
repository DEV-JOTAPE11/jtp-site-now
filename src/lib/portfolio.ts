import type { PortfolioFilter, PortfolioProject } from "@/types";

/**
 * Largura renderizada do print dentro do card: no mobile ele ocupa a largura do
 * carrossel menos os paddings; a partir de md o grid quebra em 2 e depois em 3
 * colunas dentro do container de 72rem.
 */
export const PORTFOLIO_PREVIEW_SIZES =
  "(max-width: 767px) calc(100vw - 56px), (max-width: 1023px) 50vw, 384px";

export const PORTFOLIO_FILTERS: PortfolioFilter[] = [
  "Todos",
  "Landing Page",
  "Institucional",
  "E-commerce",
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 1,
    title: "Barber Start",
    category: "Landing Page",
    subCategory: "Marketing Digital",
    description:
      "Landing page moderna com foco em conversão, apresentação de serviços e chamada direta para atendimento.",
    coverImage: "/img/portfolio/barber-start-cover-768.webp",
    previewImage: "/img/portfolio/landing-page-jonas-fullpage-768.webp",
    previewWidth: 768,
    previewHeight: 3090,
    badges: ["Alta Conversão", "Design Premium"],
    tags: ["React", "Tailwind", "Vite"],
    link: "https://lp-jonas-barber.vercel.app/",
    featured: true,
  },
  {
    id: 2,
    title: "Hotel Ouro do Cerrado",
    category: "Institucional",
    subCategory: "Hotelaria",
    description:
      "Site institucional one page para hotel, facilitando reservas e criando uma presença digital profissional.",
    coverImage: "/img/portfolio/hotel-ouro-cerrado-cover-768.webp",
    previewImage: "/img/portfolio/hotel-ouro-cerrado-fullpage-768.webp",
    previewWidth: 768,
    previewHeight: 3356,
    badges: ["Premium", "Sistema de Reservas"],
    tags: ["React", "Tailwind", "Vite"],
    link: "https://www.hotelourodocerrado.com.br",
    featured: true,
  },
  {
    id: 3,
    title: "Clínica Madness",
    category: "Institucional",
    subCategory: "Saúde",
    description:
      "Site moderno com agendamento online e área do cliente para uma clínica veterinária.",
    coverImage: "/img/portfolio/madness-clinica-cover-768.webp",
    previewImage:
      "/img/portfolio/madness-clinica-veterinaria-fullpage-768.webp",
    previewWidth: 768,
    previewHeight: 2916,
    badges: ["Destaque", "Clean Design"],
    tags: ["React", "Tailwind", "Vite"],
    link: "https://dev-jotape11.github.io/medneeds-fer/",
    featured: true,
  },
  {
    id: 4,
    title: "Globo Sat Arinos",
    category: "Institucional",
    subCategory: "Telecom",
    description:
      "Site profissional para empresa de instalação de antenas, com portfólio, depoimentos e formulário de contato.",
    coverImage: "/img/portfolio/globosatarinos-cover-768.webp",
    previewImage: "/img/portfolio/globosatarinos-fullpage-768.webp",
    previewWidth: 768,
    previewHeight: 3547,
    badges: ["Case de Sucesso", "Institucional"],
    tags: ["React", "Tailwind"],
    link: "https://www.globosatarinos.com.br",
    featured: false,
  },
  {
    id: 5,
    title: "LP Patins",
    category: "Landing Page",
    subCategory: "Esportes",
    description:
      "Landing page moderna e impactante para marca de patins, com ritmo visual forte e foco em produto.",
    coverImage: "/img/portfolio/lp-patins-cover-768.webp",
    previewImage: "/img/portfolio/lp-patins-fullpage-768.webp",
    previewWidth: 768,
    previewHeight: 864,
    badges: ["Landing Page", "Radical"],
    tags: ["React", "Tailwind"],
    link: "https://dev-jotape11.github.io/lp-de-patins-animada-/",
    featured: false,
  },
  {
    id: 6,
    title: "Justly Advogados",
    category: "Institucional",
    subCategory: "Jurídico",
    description:
      "Site sóbrio e elegante para transmitir autoridade, confiança e clareza em serviços jurídicos.",
    coverImage: "/img/portfolio/lp-justly-cover-768.webp",
    previewImage: "/img/portfolio/lp-justly-fullpage-768.webp",
    previewWidth: 768,
    previewHeight: 3792,
    badges: ["Corporativo", "Autoridade"],
    tags: ["React", "Tailwind"],
    link: "https://dev-jotape11.github.io/justly/",
    featured: false,
  },
];

export const FEATURED_PORTFOLIO_PROJECTS = PORTFOLIO_PROJECTS.filter(
  (project) => project.featured
).slice(0, 3);

export function countProjectsByFilter(filter: PortfolioFilter): number {
  if (filter === "Todos") return PORTFOLIO_PROJECTS.length;
  return PORTFOLIO_PROJECTS.filter((project) => project.category === filter)
    .length;
}
