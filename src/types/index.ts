export interface NavItem {
  label: string;
  targetId: string;
}

export interface SelectOption {
  label: string;
  value: string;
}

/** Categorias reais dos projetos do portfólio. */
export type PortfolioCategory =
  | "Landing Page"
  | "Institucional"
  | "E-commerce";

/** Categoria + a opção "Todos" usada pelos filtros da página de portfólio. */
export type PortfolioFilter = "Todos" | PortfolioCategory;

export interface PortfolioProject {
  id: number;
  title: string;
  category: PortfolioCategory;
  subCategory: string;
  description: string;
  /** Fallback usado se o print full-page falhar ao carregar. */
  coverImage: string;
  /** Screenshot full-page que rola dentro do card. */
  previewImage: string;
  previewWidth: number;
  previewHeight: number;
  badges: string[];
  tags: string[];
  link: string;
  /** Aparece na seção da home (os 3 primeiros). */
  featured: boolean;
}
