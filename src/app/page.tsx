import { HomeContent } from "./HomeContent";
import { homeJsonLd, jsonLdHtml } from "@/lib/schema";

/* Server Component de propósito: o <script type="application/ld+json"> precisa
   sair pronto no HTML da resposta. A árvore interativa mora em HomeContent
   ("use client") — ver o comentário de lá. */
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(homeJsonLd) }}
      />
      <HomeContent />
    </>
  );
}
