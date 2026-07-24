import type { NavItem, SelectOption } from "@/types";

export const WHATSAPP_NUMBER = "5575981401481";
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

export const FATURAMENTO_OPTIONS: SelectOption[] = [
  { label: "Até R$ 50 mil", value: "Até R$ 50 mil" },
  { label: "R$ 50-100 mil", value: "R$ 50-100 mil" },
  { label: "R$ 100-500 mil", value: "R$ 100-500 mil" },
  { label: "R$ 500 mil+", value: "R$ 500 mil+" },
];

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/ascensaocompany_/",
  facebook: "https://www.facebook.com/ascensaocompanymkt/",
} as const;

export const COUNTER_TARGET = 21000;
