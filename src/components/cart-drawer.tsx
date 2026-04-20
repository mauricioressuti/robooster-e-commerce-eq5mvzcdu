import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/hooks/use-app-store'
import { formatCurrency } from '@/lib/utils'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'

export function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, cartTotal, currency, cartCount } = useAppStore()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-primary-foreground hover:bg-primary-foreground/10 hover:text-white"
        >
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground border-none">
              {cartCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>Seu Carrinho</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
              <ShoppingCart className="h-12 w-12 opacity-20" />
              <p>Seu carrinho está vazio.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-4 border-b pb-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-20 w-20 object-cover rounded-md"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-semibold text-sm line-clamp-2">{item.product.name}</h4>
                      <p className="text-xs text-muted-foreground font-mono mt-1">
                        SKU: {item.product.sku}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="font-semibold text-sm">
                        {formatCurrency(
                          currency === 'BRL' ? item.product.priceBRL : item.product.priceUSD,
                          currency,
                        )}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive self-start h-8 w-8"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t pt-6 space-y-4 mt-auto bg-background">
            <div className="bg-green-50 text-green-800 text-xs px-3 py-2 rounded flex items-center gap-2 border border-green-100 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shield-check"
              >
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              Sua compra está segura. Faturamento sujeito a análise de crédito.
            </div>
            <div className="flex justify-between items-center font-semibold text-xl">
              <span>Total Estimado</span>
              <span className="text-primary">{formatCurrency(cartTotal, currency)}</span>
            </div>
            <p className="text-xs text-muted-foreground text-right">
              * Frete e impostos calculados na próxima etapa.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  Continuar Comprando
                </Button>
              </SheetTrigger>
              <SheetTrigger asChild>
                <Link to="/checkout" className="w-full">
                  <Button className="w-full bg-accent text-white hover:bg-accent/90">
                    Finalizar Compra
                  </Button>
                </Link>
              </SheetTrigger>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
