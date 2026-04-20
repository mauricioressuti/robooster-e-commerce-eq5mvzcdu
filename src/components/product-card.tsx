import { Link } from 'react-router-dom'
import { Product } from '@/lib/types'
import { useAppStore } from '@/hooks/use-app-store'
import { formatCurrency, formatInstallments } from '@/lib/utils'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function ProductCard({ product }: { product: Product }) {
  const { currency, addToCart } = useAppStore()
  const price = currency === 'BRL' ? product.priceBRL : product.priceUSD

  return (
    <Card className="group overflow-hidden flex flex-col h-full border-border/50 hover:shadow-elevation transition-all duration-300 hover:-translate-y-1">
      <Link
        to={`/produto/${product.id}`}
        className="block relative aspect-square overflow-hidden bg-muted/30"
      >
        {!product.inStock && (
          <Badge variant="destructive" className="absolute top-4 right-4 z-10">
            Sob Encomenda
          </Badge>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      <CardContent className="p-5 flex-grow flex flex-col gap-2">
        <div className="text-xs font-mono text-muted-foreground">{product.sku}</div>
        <Link to={`/produto/${product.id}`}>
          <h3 className="font-semibold text-lg leading-tight line-clamp-2 hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto pt-4">
          <div className="font-bold text-2xl tracking-tight text-primary">
            {formatCurrency(price, currency)}
          </div>
          <div className="text-sm text-muted-foreground mt-1 h-5">
            {formatInstallments(price, currency)}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Button
          className="w-full bg-primary text-white hover:bg-primary/90"
          onClick={() => addToCart(product)}
        >
          {product.inStock ? 'Adicionar ao Carrinho' : 'Solicitar Cotação'}
        </Button>
      </CardFooter>
    </Card>
  )
}
