import type { NavItem, SelectOption } from "@/types";

/* Número único do projeto: Contact, FAQ e o botão flutuante todos importam
   daqui — não repita o literal em componente nenhum. */
export const WHATSAPP_NUMBER = "5538999743350";
export const WHATSAPP_DEFAULT_MESSAGE =
  "Vim pelo site, tenho interesse e gostaria de mais informações.";

export const NAV_ITEMS: NavItem[] = [
  { label: "Diferenciais", targetId: "diferenciais" },
  { label: "Depoimentos", targetId: "depoimentos" },
  { label: "Serviços", targetId: "servicos" },
  { label: "Comparativo", targetId: "comparativo" },
  { label: "Agente IA", targetId: "agente-ia" },
  { label: "Contato", targetId: "formulario" },
];

export const SETOR_OPTIONS: SelectOption[] = [
  { label: "Serviço", value: "Serviço" },
  { label: "Varejo", value: "Varejo" },
  { label: "Indústria", value: "Indústria" },
  { label: "E-commerce", value: "E-commerce" },
  { label: "SAAS", value: "SAAS" },
  { label: "Educação", value: "Educação" },
  { label: "Outro", value: "Outro" },
];

/* Faixas curtas na base da escala: a maioria dos leads fica abaixo dos R$ 50
   mil, e um único "até R$ 50 mil" jogava todos eles no mesmo balde. */
export const FATURAMENTO_OPTIONS: SelectOption[] = [
  { label: "Até R$ 10 mil", value: "Até R$ 10 mil" },
  { label: "R$ 10-20 mil", value: "R$ 10-20 mil" },
  { label: "R$ 20-50 mil", value: "R$ 20-50 mil" },
  { label: "R$ 50-100 mil", value: "R$ 50-100 mil" },
  { label: "R$ 100-300 mil", value: "R$ 100-300 mil" },
  { label: "R$ 300 mil+", value: "R$ 300 mil+" },
];

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/ascensaocompany_/",
  facebook: "https://www.facebook.com/ascensaocompanymkt/",
} as const;

export const COUNTER_TARGET = 21000;
