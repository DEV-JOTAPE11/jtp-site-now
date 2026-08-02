import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* AVIF antes de WebP: ~20% menor no mesmo alvo de qualidade, e a imagem
       da hero (elemento LCP no mobile) é a que mais se beneficia. */
    formats: ["image/avif", "image/webp"],

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
