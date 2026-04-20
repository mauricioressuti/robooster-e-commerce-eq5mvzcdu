import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCatalog } from '@/hooks/use-catalog'
import { ProductCard } from '@/components/product-card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export default function Catalog() {
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get('cat') || 'all'
  const { products, categories, loading } = useCatalog()

  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sortBy, setSortBy] = useState('popular')

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory)
    }

    if (inStockOnly) {
      result = result.filter((p) => p.inStock)
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.priceBRL - b.priceBRL)
        break
      case 'price-desc':
        result.sort((a, b) => b.priceBRL - a.priceBRL)
        break
      case 'newest':
        // Mock sorting for newest
        result.reverse()
        break
      default:
        // 'popular' keeps default order
        break
    }

    return result
  }, [selectedCategory, inStockOnly, sortBy])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Categorias</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cat-all"
                  checked={selectedCategory === 'all'}
                  onCheckedChange={() => setSelectedCategory('all')}
                />
                <Label htmlFor="cat-all" className="cursor-pointer">
                  Todas as Máquinas
                </Label>
              </div>
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cat-${cat.slug}`}
                    checked={selectedCategory === cat.slug}
                    onCheckedChange={() => setSelectedCategory(cat.slug)}
                  />
                  <Label htmlFor={`cat-${cat.slug}`} className="cursor-pointer">
                    {cat.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Disponibilidade</h3>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="in-stock"
                checked={inStockOnly}
                onCheckedChange={(c) => setInStockOnly(c as boolean)}
              />
              <Label htmlFor="in-stock" className="cursor-pointer">
                Pronta Entrega
              </Label>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold tracking-tight">Catálogo de Máquinas</h1>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Ordenar por:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Mais Populares</SelectItem>
                  <SelectItem value="newest">Lançamentos</SelectItem>
                  <SelectItem value="price-asc">Menor Preço</SelectItem>
                  <SelectItem value="price-desc">Maior Preço</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Carregando produtos...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-muted/30 rounded-lg border border-dashed">
              <p className="text-muted-foreground text-lg">
                Nenhuma máquina encontrada com estes filtros.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setInStockOnly(false)
                }}
                className="mt-4 text-primary font-medium hover:underline"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
