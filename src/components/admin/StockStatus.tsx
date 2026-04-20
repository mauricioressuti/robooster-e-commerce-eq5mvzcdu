import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Database } from '@/lib/supabase/types'

type Product = Database['public']['Tables']['products']['Row']

export function StockStatus({ products }: { products: Product[] }) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Status do Estoque</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[300px] overflow-auto pr-2">
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none truncate max-w-[200px]">
                  {product.name}
                </p>
                <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
              </div>
              <div>
                {product.in_stock ? (
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    Em Estoque
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                    Sem Estoque
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
