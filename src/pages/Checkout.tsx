import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppStore } from '@/hooks/use-app-store'
import { useAuth } from '@/hooks/use-auth'
import { submitLead } from '@/services/catalog'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  CheckCircle2,
  ChevronRight,
  Building,
  MapPin,
  CreditCard,
  Truck,
  MessageCircle,
} from 'lucide-react'
import { CheckoutSummary } from '@/components/checkout-summary'

export default function Checkout() {
  const { cart, cartTotal, currency, clearCart } = useAppStore()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [shippingCost, setShippingCost] = useState(1500)
  const [discount, setDiscount] = useState(0)

  const [formData, setFormData] = useState({
    cnpj: '',
    company_name: '',
    email: user?.email || '',
    phone: '',
    cep: '',
    address: '',
    shipping_method: 'transportadora',
    payment_method: 'credito',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleShippingChange = (val: string) => {
    setFormData((prev) => ({ ...prev, shipping_method: val }))
    setShippingCost(val === 'transportadora' ? 1500 : 0)
  }

  const handleApplyCoupon = (coupon: string) => {
    if (coupon.toUpperCase() === 'ROBOOSTER10') setDiscount(cartTotal * 0.1)
    else setDiscount(0)
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
      const finalTotal = cartTotal + shippingCost - discount
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
          total_brl: finalTotal,
          total_usd: currency === 'USD' ? finalTotal : finalTotal / 5.0,
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Finalizar Pedido Seguro</h1>
          <p className="text-muted-foreground">
            Ambiente criptografado. Um especialista validará as especificações antes do faturamento
            final.
          </p>
        </div>

        {step < 4 && (
          <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-4 text-sm font-medium">
            {[1, 2, 3].map((s) => (
              <span
                key={s}
                className={`flex items-center gap-2 ${
                  step >= s ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${
                    step >= s ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  {s}
                </span>
                {s === 1 ? 'Identificação' : s === 2 ? 'Entrega' : 'Pagamento'}
                {s < 3 && <ChevronRight className="h-4 w-4 ml-2" />}
              </span>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {step === 1 && (
              <div className="bg-card border rounded-xl p-6 animate-fade-in-up">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                  <Building className="h-5 w-5" /> Dados da Empresa
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label>CPF / CNPJ *</Label>
                    <Input
                      name="cnpj"
                      value={formData.cnpj}
                      onChange={handleChange}
                      placeholder="00.000.000/0000-00"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Nome / Razão Social *</Label>
                    <Input
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      placeholder="Sua Empresa Ltda"
                    />
                  </div>
                  <div>
                    <Label>E-mail do Comprador *</Label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="compras@empresa.com.br"
                    />
                  </div>
                  <div>
                    <Label>Telefone / WhatsApp *</Label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>
                <Button
                  className="mt-8 w-full"
                  onClick={() => setStep(2)}
                  disabled={
                    formData.cnpj.length < 11 || formData.company_name.length < 3 || !formData.email
                  }
                >
                  Continuar para Entrega
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-card border rounded-xl p-6 animate-fade-in-up">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                  <MapPin className="h-5 w-5" /> Logística e Entrega
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="md:col-span-2">
                    <Label>CEP *</Label>
                    <Input
                      name="cep"
                      value={formData.cep}
                      onChange={handleChange}
                      placeholder="00000-000"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Endereço Completo de Descarregamento *</Label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Rua, Número, Bairro, Cidade - UF"
                    />
                  </div>
                </div>

                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Truck className="h-4 w-4" /> Opções de Envio
                </h3>
                <RadioGroup
                  value={formData.shipping_method}
                  onValueChange={handleShippingChange}
                  className="space-y-3"
                >
                  <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted/50 data-[state=checked]:border-primary">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="transportadora" id="transportadora" />
                      <div>
                        <p className="font-medium">Transportadora Especializada</p>
                        <p className="text-sm text-muted-foreground">
                          7 a 14 dias úteis (Seguro incluso)
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold">{formatCurrency(1500, currency)}</span>
                  </label>
                  <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted/50 data-[state=checked]:border-primary">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="retirada" id="retirada" />
                      <div>
                        <p className="font-medium">Retirada na Fábrica</p>
                        <p className="text-sm text-muted-foreground">Disponível em 3 dias úteis</p>
                      </div>
                    </div>
                    <span className="font-semibold text-green-600">Grátis</span>
                  </label>
                </RadioGroup>

                <div className="flex gap-4 mt-8">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Voltar
                  </Button>
                  <Button
                    className="flex-1 bg-primary text-white"
                    onClick={() => setStep(3)}
                    disabled={formData.cep.length < 8 || formData.address.length < 5}
                  >
                    Continuar para Pagamento
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-card border rounded-xl p-6 animate-fade-in-up">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                  <CreditCard className="h-5 w-5" /> Pagamento
                </h2>
                <RadioGroup
                  value={formData.payment_method}
                  onValueChange={(val) => setFormData((p) => ({ ...p, payment_method: val }))}
                  className="space-y-4 mb-8"
                >
                  {[
                    {
                      id: 'credito',
                      title: 'Cartão de Crédito',
                      desc: 'Até 12x sem juros (Processado via Stripe)',
                    },
                    {
                      id: 'pix',
                      title: 'Pix',
                      desc: '5% de desconto extra na aprovação',
                    },
                    {
                      id: 'boleto',
                      title: 'Boleto Bancário Faturado',
                      desc: 'Para empresas aprovadas (30/60/90 dias)',
                    },
                    {
                      id: 'bndes',
                      title: 'Financiamento BNDES / Finame',
                      desc: 'Taxas reduzidas para indústria nacional',
                    },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className="flex items-start gap-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 data-[state=checked]:border-primary data-[state=checked]:bg-primary/5"
                    >
                      <RadioGroupItem value={opt.id} id={opt.id} className="mt-1" />
                      <div>
                        <p className="font-semibold">{opt.title}</p>
                        <p className="text-sm text-muted-foreground">{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </RadioGroup>
                <div className="flex gap-4 mt-8">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Voltar
                  </Button>
                  <Button
                    className="flex-1 bg-accent text-white hover:bg-accent/90"
                    onClick={handleComplete}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processando...' : 'Confirmar Pedido Seguro'}
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="bg-card border border-green-200 rounded-xl p-8 md:p-12 text-center animate-fade-in-up">
                <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-6" />
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  Pedido Confirmado!
                </h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                  Sua requisição foi recebida com sucesso. Um especialista técnico entrará em
                  contato em até 2 horas para validação logística e aprovação do faturamento.
                </p>
                <div className="text-left bg-muted/30 p-6 rounded-lg max-w-sm mx-auto mb-8 text-sm space-y-2">
                  <p>
                    <strong>Nº do Pedido:</strong> RBT-
                    {Math.floor(Math.random() * 100000)}
                  </p>
                  <p>
                    <strong>Status:</strong> Em Análise Comercial
                  </p>
                  <p>
                    <strong>E-mail de confirmação:</strong> Enviado para {formData.email}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" onClick={() => navigate('/')}>
                    Voltar ao Início
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
                    <MessageCircle className="h-4 w-4" /> Acompanhar via WhatsApp
                  </Button>
                </div>
              </div>
            )}
          </div>

          {step < 4 && (
            <CheckoutSummary
              shippingCost={shippingCost}
              discount={discount}
              onApplyCoupon={handleApplyCoupon}
            />
          )}
        </div>
      </div>
    </div>
  )
}
