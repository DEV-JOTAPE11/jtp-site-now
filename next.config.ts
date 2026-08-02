import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* Só AVIF, de propósito. Com ["image/avif", "image/webp"] a lista parece
       uma ordem de preferência do servidor, mas não é: o otimizador escolhe
       pela ordem do header `Accept` do browser e ignora os valores de `q`.
       O Safari anuncia `image/webp` antes de `image/avif`, então todo browser
       WebKit (Safari e Chrome do iPhone, que é WKWebView) caía no WebP e
       baixava o dobro de bytes — medido contra produção: hero LCP do mobile
       70.134 B em WebP contra 35.352 B em AVIF, e a mesma proporção no logo
       e nos prints.

       Com um formato só não há o que negociar: quem aceita AVIF recebe AVIF.
       Quem não aceita (Safari <= 16.3, Firefox <= 92) cai em JPEG — inclusive
       para os fontes .webp, o otimizador não devolve o original. Medido no
       build: hero 62,6 KB e logo 6,9 KB em JPEG contra 70,1 KB e 9,3 KB em
       WebP hoje, ou seja, esses até melhoram; só os prints pioram ~2,5 KB, e
       são lazy e abaixo da dobra. Saldo do fallback: neutro. */
    formats: ["image/avif"],

    /* 320 cobre os cards do leque de depoimentos: 160px de CSS num aparelho
       de DPR 1.75 pedem 280px reais, e sem esse degrau o browser pulava
       direto de 256 para 384. */
    imageSizes: [32, 48, 64, 96, 128, 256, 320, 384],

    /* 600 cobre os previews de portfólio, que ocupam ~585px e antes só
       encontravam o degrau de 640. */
    deviceSizes: [600, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
};

export default nextConfig;
