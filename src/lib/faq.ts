/* Fonte única das perguntas frequentes.

   Mora aqui — e não dentro do componente — porque o FAQPage do JSON-LD precisa
   dos MESMOS textos que a seção renderiza. Schema divergente do conteúdo
   visível é violação da diretriz de dados estruturados do Google, e a única
   forma de garantir que não divergem é não existir uma segunda cópia.

   Cada pergunta existe para derrubar uma objeção específica — a ordem é
   proposital: preço primeiro (é o que trava a decisão), "já tentei antes" por
   último (é o que mais converte). */
export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "Quanto custa trabalhar com a JTP?",
    answer:
      "Depende do que o seu negócio precisa — e é por isso que a gente não coloca um preço fixo no site. Um comércio local que precisa aparecer no Google não tem a mesma necessidade de uma empresa que quer estruturar um time de vendas. No diagnóstico gratuito a gente entende seu cenário e você sai com o valor exato na mão, sem compromisso. O que a gente garante: é uma fração do que custaria montar esse time internamente.",
  },
  {
    question: "Preciso assinar contrato longo? E se eu quiser sair?",
    answer:
      "Você não fica preso. Trabalhamos com contratos mensais e você pode encerrar quando quiser, sem multa e sem processo trabalhista. Nossa lógica é simples: se a gente precisa de contrato longo para te manter, é porque o resultado não está te convencendo — e o problema é nosso, não seu.",
  },
  {
    question: "Em quanto tempo eu vejo resultado?",
    answer:
      "As primeiras oportunidades de venda costumam aparecer nas primeiras semanas, porque tráfego pago começa a rodar rápido. Autoridade e crescimento de marca levam mais tempo — de 3 a 6 meses para virar um fluxo consistente. Qualquer um que te prometer resultado explosivo em 7 dias está vendendo sorte, não estratégia.",
  },
  {
    question: "O investimento em anúncios está incluído no valor?",
    answer:
      "Não, e é importante deixar isso claro desde o começo. O valor da JTP é pelo trabalho da equipe; a verba que vai para o Google e a Meta é sua e fica na sua conta, com você acompanhando cada centavo. No diagnóstico a gente define juntos um valor de mídia realista para o seu momento — nunca mais do que seu negócio consegue sustentar.",
  },
  {
    question:
      "Já contratei agência antes e não funcionou. Por que agora seria diferente?",
    answer:
      "Na maioria dos casos o problema não foi o anúncio — foi que só existia o anúncio. Tráfego sem página que converte, sem texto que persuade e sem alguém para atender o lead que chega é dinheiro queimado. A JTP atua nas cinco frentes ao mesmo tempo justamente porque uma sozinha não sustenta resultado. Se depois do diagnóstico a gente achar que não é o momento do seu negócio, vamos te dizer isso.",
  },
];
