import { useParams, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { MOCK_PRODUCTS } from '@/lib/data'
import { useAppStore } from '@/hooks/use-app-store'
import { formatCurrency, formatInstallments } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Shield, Truck, FileText, CheckCircle2 } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function ProductDetail() {
  const { id } = useParams()
  const { currency, addToCart } = useAppStore()
  const [cep, setCep] = useState('')
  const [shippingResult, setShippingResult] = useState<string | null>(null)

  const product = MOCK_PRODUCTS.find((p) => p.id === id)

  if (!product) return <Navigate to="/404" />

  const price = currency === 'BRL' ? product.priceBRL : product.priceUSD

  const simulateShipping = () => {
    if (cep.length >= 8) {
      // Mock shipping API call
      setTimeout(() => {
        setShippingResult(
          `Frete Especializado B2B: ${formatCurrency(currency === 'BRL' ? 1200 : 250, currency)} - Prazo: 15 dias úteis`,
        )
      }, 800)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-muted rounded-xl overflow-hidden border">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-zoom-in"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square bg-muted rounded-md border cursor-pointer hover:border-primary overflow-hidden"
              >
                <img
                  src={`${product.image}&seed=${i}`}
                  alt=""
                  className="w-full h-full object-cover opacity-80 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info & Purchase */}
        <div className="flex flex-col">
          <div className="mb-2 text-sm font-mono text-muted-foreground flex items-center gap-2">
            SKU: {product.sku}
            <span className="text-border">|</span>
            {product.inStock ? (
              <span className="text-green-600 flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" /> Em estoque
              </span>
            ) : (
              <span className="text-amber-600">Sob Encomenda (45 dias)</span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{product.name}</h1>
          <p className="text-muted-foreground text-lg mb-8">{product.description}</p>

          <div className="bg-muted/30 p-6 rounded-xl border mb-8">
            <div className="text-4xl font-bold text-primary mb-2">
              {formatCurrency(price, currency)}
            </div>
            {currency === 'BRL' ? (
              <div className="text-muted-foreground font-medium">
                {formatInstallments(price, currency)} via Finame ou BNDES
              </div>
            ) : (
              <div className="text-amber-600 text-sm font-medium mt-2">
                * International shipping and customs duties not included (FOB Pricing).
              </div>
            )}
          </div>

          <div className="space-y-4 mb-8">
            <Button
              size="lg"
              className="w-full h-14 text-lg bg-accent text-white hover:bg-accent/90"
              onClick={() => addToCart(product)}
            >
              Adicionar ao Carrinho
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full h-14 text-lg border-primary text-primary"
            >
              Solicitar Financiamento B2B
            </Button>
          </div>

          {/* Shipping Calculator */}
          <div className="border-t pt-8 mt-auto">
            <h4 className="font-semibold flex items-center gap-2 mb-4">
              <Truck className="h-5 w-5" /> Cálculo de Frete
            </h4>
            <div className="flex gap-2">
              <Input
                placeholder="00000-000"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                className="max-w-[200px]"
              />
              <Button variant="secondary" onClick={simulateShipping}>
                Calcular
              </Button>
            </div>
            {shippingResult && (
              <div className="mt-4 p-3 bg-blue-50 text-blue-900 rounded-md text-sm font-medium border border-blue-100">
                {shippingResult}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="specs" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-[600px] mb-8">
          <TabsTrigger value="specs">Especificações Técnicas</TabsTrigger>
          <TabsTrigger value="manuals">Manuais e Vídeos</TabsTrigger>
          <TabsTrigger value="warranty">Garantia</TabsTrigger>
        </TabsList>
        <TabsContent value="specs" className="p-6 border rounded-xl bg-card">
          <h3 className="text-xl font-bold mb-6">Ficha Técnica</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">{key}</span>
                <span className="font-medium text-right">{value}</span>
              </div>
            ))}
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Voltagem</span>
              <span className="font-medium text-right">380V Trifásico</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Certificação</span>
              <span className="font-medium text-right">NR-12 Completa</span>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="manuals" className="p-6 border rounded-xl bg-card text-center py-12">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">
            Acesse manuais de operação e vídeos de setup.
          </p>
          <Button variant="outline">Download PDF</Button>
        </TabsContent>
        <TabsContent value="warranty" className="p-6 border rounded-xl bg-card">
          <div className="flex items-start gap-4">
            <Shield className="h-8 w-8 text-accent shrink-0" />
            <div>
              <h3 className="text-lg font-bold mb-2">Garantia Industrial Robooster</h3>
              <p className="text-muted-foreground">
                Este equipamento possui 12 meses de garantia legal + 12 meses de garantia estendida
                (total 24 meses) cobrindo peças mecânicas e eletrônicas contra defeitos de
                fabricação em uso normal de turno único.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
