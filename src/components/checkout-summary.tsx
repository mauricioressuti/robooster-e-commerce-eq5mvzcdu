import { useState } from 'react'
import { useAppStore } from '@/hooks/use-app-store'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MessageCircle, ShieldCheck } from 'lucide-react'

export function CheckoutSummary({
  shippingCost,
  discount,
  onApplyCoupon,
}: {
  shippingCost: number
  discount: number
  onApplyCoupon: (c: string) => void
}) {
  const { cart, cartTotal, currency } = useAppStore()
  const [coupon, setCoupon] = useState('')

  const finalTotal = cartTotal + shippingCost - discount

  return (
    <div className="bg-card border rounded-xl p-6 h-fit sticky top-28 space-y-6">
      <h3 className="font-bold text-lg border-b pb-4 flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-green-600" />
        Resumo Seguro
      </h3>
      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
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

      <div className="flex gap-2 pt-2">
        <Input
          placeholder="Cupom (ex: ROBOOSTER10)"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="h-9"
        />
        <Button variant="outline" size="sm" onClick={() => onApplyCoupon(coupon)} className="h-9">
          Aplicar
        </Button>
      </div>

      <div className="border-t pt-4 space-y-2 text-sm text-muted-foreground">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(cartTotal, currency)}</span>
        </div>
        <div className="flex justify-between">
          <span>Frete</span>
          <span>{shippingCost > 0 ? formatCurrency(shippingCost, currency) : 'Grátis'}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Desconto</span>
            <span>-{formatCurrency(discount, currency)}</span>
          </div>
        )}
        <div className="flex justify-between text-xl font-bold pt-4 text-primary">
          <span>Total</span>
          <span>{formatCurrency(finalTotal, currency)}</span>
        </div>
      </div>

      <div className="bg-blue-50 text-blue-900 p-4 rounded-lg flex items-start gap-3 mt-6">
        <MessageCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-sm">Dúvidas Técnicas?</h4>
          <p className="text-xs mt-1 mb-2 opacity-90">Fale com um engenheiro antes de finalizar.</p>
          <Button
            variant="outline"
            size="sm"
            className="w-full bg-white border-blue-200 text-blue-700 hover:bg-blue-50 text-xs h-8"
          >
            WhatsApp Direto
          </Button>
        </div>
      </div>
    </div>
  )
}
