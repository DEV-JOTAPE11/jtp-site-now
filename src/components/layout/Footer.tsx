import Image from "next/image";

export function Footer() {
  return (
    /* Fundo chapado e sem a grade decorativa: o rodapé fecha a página, então
       nada aqui deve competir com o CTA da seção anterior.

       `relative z-10` não é decorativo: o #particles-canvas é absolute/z-0 e
       cobre a altura inteira do <main>. Um rodapé estático ficaria ABAIXO dele
       na ordem de pintura (descendentes posicionados vêm depois dos estáticos),
       e as partículas passariam por cima do fundo sólido. */
    <footer
      className="relative z-10 py-14 px-4 border-t border-border"
      style={{ background: "#05080c" }}
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-5 text-center">
        {/* O PNG não tem alpha — o fundo navy é parte do arquivo. Arredondar e
            aplicar o glow (mesmo tratamento do .jtp-brand-logo na navbar) faz o
            quadrado virar um tile intencional em vez de um bloco solto. */}
        <Image
          src="/img/logo-navbar.png"
          alt="JTP Services"
          width={72}
          height={72}
          className="h-16 w-16 rounded-xl object-cover md:h-[72px] md:w-[72px]"
          style={{ filter: "drop-shadow(0 0 10px rgba(40, 126, 215, 0.35))" }}
        />

        <p className="text-base md:text-lg text-foreground/85 text-balance max-w-xl">
          Sites que convertem, anúncios que vendem, presença que gera
          autoridade.
        </p>

        {/* O rodapé é onde o sinal local do negócio cabe sem competir com o CTA:
            cidade/UF aqui casa com o `address` do ProfessionalService no
            JSON-LD, em vez de o dado estruturado afirmar uma localização que a
            página nunca mostra. */}
        <p className="text-muted-foreground text-sm">
          © 2026 JTP Services — Agência de marketing digital em Arinos, MG,
          atendendo todo o Brasil. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
