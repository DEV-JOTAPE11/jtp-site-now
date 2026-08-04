import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/* O robots.txt do projeto antigo já anunciava /sitemap.xml, mas o arquivo
   nunca existiu lá — o Google seguia o anúncio e batia em 404. Aqui ele
   existe, e as duas rotas públicas do site são estas. A home leva prioridade
   1 por ser o alvo de conversão; o portfólio muda quando entra projeto novo. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/portfolio`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
