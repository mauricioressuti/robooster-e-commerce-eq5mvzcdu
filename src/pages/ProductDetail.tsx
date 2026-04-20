import { useParams, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { useCatalog } from '@/hooks/use-catalog'
import { useAppStore } from '@/hooks/use-app-store'
import { formatCurrency, formatInstallments } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Shield, Truck, CheckCircle2, Play, Calculator, Wrench, RotateCw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default function ProductDetail() {
  const { id } = useParams()
  const { currency, addToCart } = useAppStore()
  const { products, loading } = useCatalog()
  const [cep, setCep] = useState('')
  const [shippingResult, setShippingResult] = useState<string | null>(null)
  const [activeImage, setActiveImage] = useState(0)

  if (loading)
    return (
      <div className="py-32 text-center text-lg text-muted-foreground">
        Carregando detalhes técnicos...
      </div>
    )

  const product = products.find((p) => p.id === id)
  if (!product) return <Navigate to="/404" />

  const price = currency === 'BRL' ? product.priceBRL : product.priceUSD
  const mockImages = [
    product.image,
    `${product.image}&seed=2`,
    `${product.image}&seed=3`,
    `${product.image}&seed=4`,
  ]

  const simulateShipping = () => {
    if (cep.length >= 8) {
      setTimeout(() => {
        setShippingResult(
          `Logística Pesada: ${formatCurrency(currency === 'BRL' ? 1200 : 250, currency)} - Prazo: 15 dias úteis (Seguro Total Incluso)`,
        )
      }, 800)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/3] bg-muted rounded-xl overflow-hidden border relative group">
            <img
              src={mockImages[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {/* Simulating a 360 viewer button */}
            <div className="absolute top-4 left-4 bg-white/90 text-primary text-xs font-bold px-3 py-1.5 rounded flex items-center gap-2 shadow-sm cursor-pointer hover:bg-white transition-colors">
              <RotateCw className="h-4 w-4" /> Ver 360°
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {mockImages.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveImage(i)}
                className={`aspect-video bg-muted rounded-md border-2 cursor-pointer overflow-hidden transition-all ${activeImage === i ? 'border-primary' : 'border-transparent hover:border-primary/50'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Commercial & Technical Info */}
        <div className="flex flex-col">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
              SKU: {product.sku}
            </span>
            {product.inStock ? (
              <span className="text-green-600 flex items-center gap-1 text-sm font-semibold bg-green-50 px-2 py-1 rounded">
                <CheckCircle2 className="h-4 w-4" /> Pronta Entrega
              </span>
            ) : (
              <span className="text-amber-600 text-sm font-semibold bg-amber-50 px-2 py-1 rounded">
                Produção sob Encomenda
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-primary">
            {product.name}
          </h1>
          <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="bg-card border rounded-xl p-6 mb-8 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="text-4xl font-bold text-primary tracking-tight">
                {formatCurrency(price, currency)}
              </div>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noreferrer"
                className="text-green-600 font-semibold text-sm hover:underline flex items-center gap-1"
              >
                Negociar no WhatsApp
              </a>
            </div>

            {currency === 'BRL' ? (
              <div className="space-y-2 mt-4 pt-4 border-t border-dashed">
                <div className="text-muted-foreground font-medium text-sm flex justify-between">
                  <span>Cartão de Crédito ou Boleto:</span>
                  <span className="text-foreground">{formatInstallments(price, currency)}</span>
                </div>
                <div className="text-muted-foreground font-medium text-sm flex justify-between">
                  <span>À vista no Pix:</span>
                  <span className="text-green-600 font-bold">
                    {formatCurrency(price * 0.95, currency)} (5% OFF)
                  </span>
                </div>
                <div className="text-muted-foreground font-medium text-sm flex justify-between">
                  <span>Financiamento BNDES/Finame:</span>
                  <span className="text-foreground text-right">Consulte taxas</span>
                </div>
              </div>
            ) : (
              <div className="text-amber-600 text-sm font-medium mt-2">
                * Valores FOB. Frete e impostos de importação não inclusos.
              </div>
            )}
          </div>

          <div className="space-y-4 mb-8">
            <Button
              size="lg"
              className="w-full h-14 text-lg bg-accent text-primary font-bold hover:bg-accent/90 shadow-md"
              onClick={() => addToCart(product)}
            >
              Adicionar ao Carrinho Seguro
            </Button>
            <div className="grid grid-cols-2 gap-4">
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noreferrer"
                className="w-full block"
              >
                <Button
                  variant="outline"
                  className="w-full h-12 border-primary text-primary hover:bg-primary/5"
                >
                  Tirar Dúvida Técnica
                </Button>
              </a>
              <Button
                variant="outline"
                className="w-full h-12 border-primary text-primary hover:bg-primary/5"
              >
                Solicitar Financiamento
              </Button>
            </div>
          </div>

          {/* ROI Estimator Mini */}
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/10 flex items-start gap-4 mb-8">
            <Calculator className="h-8 w-8 text-primary shrink-0" />
            <div>
              <h4 className="font-bold text-primary mb-1">Estimativa de Retorno (ROI)</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Produzindo em média 20 peças/dia, nossos clientes relatam a recuperação total do
                investimento nesta máquina em <strong>8 a 11 meses</strong> devido à economia de
                material e tempo.
              </p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="font-semibold flex items-center gap-2 mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              <Truck className="h-4 w-4" /> Cálculo de Logística Especializada
            </h4>
            <div className="flex gap-2">
              <Input
                placeholder="Seu CEP (00000-000)"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                className="max-w-[200px]"
              />
              <Button variant="secondary" onClick={simulateShipping}>
                Calcular Prazos
              </Button>
            </div>
            {shippingResult && (
              <div className="mt-4 p-3 bg-blue-50 text-blue-900 rounded-md text-sm font-medium border border-blue-100 flex items-center gap-2">
                <Shield className="h-4 w-4 shrink-0" /> {shippingResult}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs - Technical, Videos, Warranty */}
      <Tabs defaultValue="specs" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 max-w-4xl mb-8 h-auto">
          <TabsTrigger value="specs" className="py-3 font-semibold">
            Especificações
          </TabsTrigger>
          <TabsTrigger value="videos" className="py-3 font-semibold">
            Vídeos Práticos
          </TabsTrigger>
          <TabsTrigger value="warranty" className="py-3 font-semibold">
            Garantia & Suporte
          </TabsTrigger>
          <TabsTrigger value="faq" className="py-3 font-semibold">
            Perguntas Frequentes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="specs" className="border rounded-xl bg-card overflow-hidden">
          <div className="p-6 md:p-10">
            <h3 className="text-2xl font-bold mb-8">Ficha Técnica Completa</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-16">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center border-b pb-3">
                  <span className="text-muted-foreground font-medium">{key}</span>
                  <span className="font-bold text-right">{value as React.ReactNode}</span>
                </div>
              ))}
              <div className="flex justify-between items-center border-b pb-3">
                <span className="text-muted-foreground font-medium">Tensão Operacional</span>
                <span className="font-bold text-right text-primary">
                  380V Trifásico (Opcional 220V)
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-3">
                <span className="text-muted-foreground font-medium">Certificação</span>
                <span className="font-bold text-right text-green-600">NR-12 Adequada</span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="videos" className="border rounded-xl bg-card p-6 md:p-10">
          <h3 className="text-2xl font-bold mb-6">Veja a Máquina em Ação</h3>
          <p className="text-muted-foreground mb-8">
            Nossos vídeos demonstram o equipamento operando em condições reais de fábrica,
            cortando/usinando materiais comuns ao mercado brasileiro.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-video bg-black relative rounded-lg overflow-hidden group cursor-pointer border">
              <img
                src={`${product.image}&seed=10`}
                className="w-full h-full object-cover opacity-60"
                alt="Video demo"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all">
                  <Play className="h-8 w-8 ml-1 text-white group-hover:text-primary" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-black/80 text-white px-3 py-1 text-sm rounded font-medium">
                Demonstração de Operação
              </div>
            </div>
            <div className="aspect-video bg-black relative rounded-lg overflow-hidden group cursor-pointer border">
              <img
                src={`${product.image}&seed=11`}
                className="w-full h-full object-cover opacity-60"
                alt="Video setup"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all">
                  <Play className="h-8 w-8 ml-1 text-white group-hover:text-primary" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-black/80 text-white px-3 py-1 text-sm rounded font-medium">
                Setup e Painel de Controle
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="warranty" className="border rounded-xl bg-card p-6 md:p-10">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <Shield className="h-10 w-10 text-accent shrink-0" />
                <h3 className="text-2xl font-bold">Garantia Industrial Robooster</h3>
              </div>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Este equipamento possui <strong>12 meses de garantia de fábrica</strong> mais a
                opção de <strong>12 meses de garantia estendida preventiva</strong>. Cobrimos 100%
                das peças mecânicas e componentes eletrônicos contra defeitos de fabricação.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-green-500" /> Peças de reposição disponíveis
                  a pronta entrega em SP.
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-green-500" /> Técnico presencial em sua
                  fábrica em até 48 horas (capitais).
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-green-500" /> Plantão de suporte por
                  WhatsApp em horário comercial.
                </li>
              </ul>
            </div>
            <div className="md:w-1/3 bg-muted/30 p-8 rounded-xl text-center border flex flex-col justify-center">
              <Wrench className="h-12 w-12 mx-auto text-primary mb-4" />
              <h4 className="font-bold text-lg mb-2">Instalação e Treinamento</h4>
              <p className="text-sm text-muted-foreground mb-6">
                A entrega técnica inclui o setup da máquina na sua planta e treinamento prático de 1
                dia para sua equipe de operadores.
              </p>
              <Button variant="outline" className="w-full">
                Baixar Manual em PDF
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="faq" className="border rounded-xl bg-card p-6 md:p-10">
          <h3 className="text-2xl font-bold mb-8">Dúvidas Frequentes (FAQ)</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-bold text-lg hover:text-primary">
                A máquina já vem adequada à norma NR-12?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Sim. Todos os equipamentos saem de fábrica com proteções físicas, painel elétrico
                isolado, botão de parada de emergência e laudo ART assinado por engenheiro mecânico
                responsável, 100% adequados à NR-12.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-bold text-lg hover:text-primary">
                Como funciona o financiamento pelo BNDES?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Por sermos fabricantes/distribuidores credenciados, esta máquina possui código
                FINAME. Você pode solicitar o financiamento diretamente no seu banco (Banco do
                Brasil, Caixa, Bradesco, etc.) com taxas reduzidas. Nossa equipe fornece toda a
                documentação necessária (Proforma) em até 24h.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-bold text-lg hover:text-primary">
                Qual o prazo real de entrega e instalação?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Para máquinas em estoque, o faturamento ocorre em 2 dias úteis, e a transportadora
                coleta em seguida (prazos variam de 5 a 15 dias dependendo do estado). A instalação
                é agendada para a mesma semana que a máquina chega na sua fábrica.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left font-bold text-lg hover:text-primary">
                O software de operação é complexo?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Não. Nossos painéis operacionais são intuitivos e traduzidos para o Português
                (PT-BR). Durante o treinamento incluso na entrega técnica, seu operador sairá
                capacitado para realizar a rotina produtiva completa.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  )
}
