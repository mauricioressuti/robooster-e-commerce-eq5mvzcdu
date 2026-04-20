import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messages } = await req.json()

    // Simulação do comportamento de IA (Motor de Recomendação Customizado)
    // Na implementação real com OpenAI, enviaríamos o histórico e o catálogo para a API.

    const lastUserMessage = messages[messages.length - 1].content.toLowerCase()

    let reply =
      'Entendi! Para eu recomendar a melhor máquina para sua operação, qual é o principal material que você processa e o seu volume médio de produção?'

    if (
      lastUserMessage.includes('corte') ||
      lastUserMessage.includes('precisão') ||
      lastUserMessage.includes('madeira') ||
      lastUserMessage.includes('mdf')
    ) {
      reply =
        'Perfeito. Para cortes de alta precisão em MDF ou madeira, recomendo a **Esquadrejadeira de Precisão Titanium** (ideal para acabamento perfeito) ou a **CNC Router Industrial Pro X-2000** (ideal para produtividade e automação). Qual o seu volume de produção diário ou orçamento previsto?'
    } else if (
      lastUserMessage.includes('volume') ||
      lastUserMessage.includes('alto') ||
      lastUserMessage.includes('produção') ||
      lastUserMessage.includes('cnc')
    ) {
      reply =
        'Considerando seu cenário, a automação da **CNC Router Industrial Pro X-2000** vai trazer um ROI fantástico, economizando tempo e reduzindo desperdício. O investimento é de R$ 145.000, com opções de parcelamento em até 36x pelo BNDES. Quer que eu simule o valor de uma parcela ou prefere falar com um especialista humano? [Ver CNC Router](/produto/p1)'
    } else if (
      lastUserMessage.includes('parcela') ||
      lastUserMessage.includes('simular') ||
      lastUserMessage.includes('financiamento')
    ) {
      reply =
        'Claro! Simulando a CNC Router Pro X-2000 em 36x, a parcela fica em torno de R$ 4.800/mês. Muitos de nossos clientes cobrem essa parcela apenas com a economia gerada no primeiro mês de uso da máquina! Qual o seu nome e WhatsApp para eu enviar essa simulação detalhada?'
    } else if (
      lastUserMessage.match(/[0-9]{8,}/) ||
      lastUserMessage.includes('nome') ||
      lastUserMessage.includes('whatsapp') ||
      lastUserMessage.includes('telefone')
    ) {
      reply =
        'Excelente! Já registrei seu contato. Um de nossos engenheiros especialistas vai te chamar no WhatsApp em poucos minutos para finalizar o atendimento técnico. Enquanto aguarda, posso ajudar com mais alguma dúvida sobre as especificações?'
    } else if (
      lastUserMessage.includes('limpeza') ||
      lastUserMessage.includes('ultrassom') ||
      lastUserMessage.includes('injetor')
    ) {
      reply =
        'Para limpeza profunda de peças e injetores, nossa **Cuba Ultrassônica Industrial 100L** é a solução definitiva. Ela utiliza cavitação para remover resíduos impossíveis de limpar manualmente. [Ver Cuba Ultrassônica](/produto/p5)'
    } else if (lastUserMessage.includes('borda') || lastUserMessage.includes('coladeira')) {
      reply =
        'Para fitas de borda, recomendo a **Coladeira de Bordas Automática EdgeMaster**. Ela faz até 12m/minuto e já vem com arredondador de cantos. Vai acelerar muito a sua marcenaria! [Ver Coladeira](/produto/p2)'
    } else if (
      lastUserMessage.includes('empilhadeira') ||
      lastUserMessage.includes('peso') ||
      lastUserMessage.includes('carga')
    ) {
      reply =
        'Para movimentação de cargas, temos a **Empilhadeira Elétrica 2.5T Lithium**. Ela tem zero emissões e carregamento rápido, suportando até 2500kg. É o equipamento mais procurado para logística interna eficiente. [Ver Empilhadeira](/produto/p4)'
    }

    // Delay simulado para parecer digitação/processamento IA
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 1200))

    return new Response(JSON.stringify({ message: reply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
