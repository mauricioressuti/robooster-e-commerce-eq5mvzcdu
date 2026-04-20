import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppStore } from '@/hooks/use-app-store'
import { useAuth } from '@/hooks/use-auth'
import { submitLead } from '@/services/catalog'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckCircle2, ChevronRight, Building, MapPin, CreditCard } from 'lucide-react'

export default function Checkout() {
  const { cart, cartTotal, currency, clearCart } = useAppStore()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    cnpj: '',
    company_name: '',
    email: user?.email || '',
    phone: '',
    cep: '',
    address: '',
    payment_method: 'credito',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  if (cart.length === 0 && step !== 4) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h2>
        <Link to="/catalogo">
          <Button>Voltar ao Catálogo</Button>
        </Link>
      </div>
    )
  }

  const handleComplete = async () => {
    setIsProcessing(true)
    try {
      await submitLead(
        {
          user_id: user?.id,
          cnpj: formData.cnpj,
          company_name: formData.company_name,
          email: formData.email,
          phone: formData.phone,
          cep: formData.cep,
          address: formData.address,
          payment_method: formData.payment_method,
          total_brl: cartTotal,
          total_usd: currency === 'USD' ? cartTotal : cartTotal / 5.0, // simple mock conv
        },
        cart,
      )
      clearCart()
      setStep(4)
    } catch (e) {
      console.error(e)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="bg-muted/10 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Finalizar Compra B2B</h1>

        {step < 4 && (
          <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-4 text-sm font-medium">
            <span
              className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${step >= 1 ? 'bg-primary' : 'bg-muted'}`}
              >
                1
              </span>{' '}
              Identificação
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span
              className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}
              >
                2
              </span>{' '}
              Entrega
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span
              className={`flex items-center gap-2 ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${step >= 3 ? 'bg-primary' : 'bg-muted'}`}
              >
                3
              </span>{' '}
              Pagamento
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1 */}
            {step === 1 && (
              <div className="bg-card border rounded-xl p-6 animate-fade-in-up">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                  <Building className="h-5 w-5" /> Dados da Empresa
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label>CNPJ</Label>
                    <Input
                      name="cnpj"
                      value={formData.cnpj}
                      onChange={handleChange}
                      placeholder="00.000.000/0000-00"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Razão Social</Label>
                    <Input
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      placeholder="Indústria de Exemplo S.A."
                    />
                  </div>
                  <div>
                    <Label>E-mail do Comprador</Label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="compras@exemplo.com.br"
                    />
                  </div>
                  <div>
                    <Label>Telefone / WhatsApp</Label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>
                <Button className="mt-8 w-full" onClick={() => setStep(2)}>
                  Continuar para Entrega
                </Button>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="bg-card border rounded-xl p-6 animate-fade-in-up">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                  <MapPin className="h-5 w-5" /> Logística Industrial
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label>CEP</Label>
                    <Input
                      name="cep"
                      value={formData.cep}
                      onChange={handleChange}
                      placeholder="00000-000"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Endereço de Descarregamento</Label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Rodovia BR-101, Km 45"
                    />
                  </div>
                  <div className="col-span-2 p-4 bg-amber-50 text-amber-900 border border-amber-200 rounded-md text-sm mt-4">
                    <strong>Atenção:</strong> Por se tratar de maquinário pesado (acima de 500kg), é
                    necessário que o local possua doca ou empilhadeira para descarga.
                  </div>
                </div>
                <div className="flex gap-4 mt-8">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Voltar
                  </Button>
                  <Button className="flex-1" onClick={() => setStep(3)}>
                    Continuar para Pagamento
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="bg-card border rounded-xl p-6 animate-fade-in-up">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                  <CreditCard className="h-5 w-5" /> Pagamento
                </h2>
                <div className="space-y-4 mb-8">
                  <label className="flex items-start gap-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="credito"
                      checked={formData.payment_method === 'credito'}
                      onChange={handleChange}
                      className="mt-1"
                    />
                    <div>
                      <p className="font-semibold">Cartão de Crédito (PagSeguro)</p>
                      <p className="text-sm text-muted-foreground">Parcele em até 12x sem juros</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="bndes"
                      checked={formData.payment_method === 'bndes'}
                      onChange={handleChange}
                      className="mt-1"
                    />
                    <div>
                      <p className="font-semibold">BNDES / Finame</p>
                      <p className="text-sm text-muted-foreground">
                        Financiamento especial para indústria
                      </p>
                    </div>
                  </label>
                </div>
                <div className="flex gap-4 mt-8">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Voltar
                  </Button>
                  <Button
                    className="flex-1 bg-accent text-white hover:bg-accent/90"
                    onClick={handleComplete}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processando...' : 'Confirmar Pedido'}
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4 - Success */}
            {step === 4 && (
              <div className="bg-card border border-green-200 rounded-xl p-12 text-center animate-fade-in-up">
                <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-primary mb-4">Pedido Confirmado!</h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                  Sua requisição de compra foi recebida. Um de nossos especialistas entrará em
                  contato em até 2 horas para validação logística.
                </p>
                <div className="text-left bg-muted/30 p-6 rounded-lg max-w-sm mx-auto mb-8 font-mono text-sm">
                  <p>
                    <strong>Nº do Pedido:</strong> RBT-{Math.floor(Math.random() * 100000)}
                  </p>
                  <p>
                    <strong>Status:</strong> Aguardando Análise Comercial
                  </p>
                </div>
                <Button onClick={() => navigate('/')}>Voltar ao Início</Button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          {step < 4 && (
            <div className="bg-card border rounded-xl p-6 h-fit sticky top-28">
              <h3 className="font-bold text-lg mb-4 border-b pb-4">Resumo do Pedido</h3>
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground pr-4">
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="font-medium whitespace-nowrap">
                      {formatCurrency(
                        (currency === 'BRL' ? item.product.priceBRL : item.product.priceUSD) *
                          item.quantity,
                        currency,
                      )}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatCurrency(cartTotal, currency)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Frete (Estimativa)</span>
                  <span>A calcular</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-4 text-primary">
                  <span>Total</span>
                  <span>{formatCurrency(cartTotal, currency)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
