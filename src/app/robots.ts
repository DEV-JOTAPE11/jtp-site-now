import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/* Porte do public/robots.txt do projeto antigo. Mesmo conteúdo, gerado pelo
   Next em vez de arquivo solto, para o domínio sair de SITE_URL e não haver
   duas fontes da verdade quando o domínio mudar. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
