export interface Category {
  id: string
  slug: string
  name: string
  image: string
}

export interface Product {
  id: string
  category: string
  name: string
  sku: string
  priceBRL: number
  priceUSD: number
  image: string
  description: string
  specs: Record<string, string>
  inStock: boolean
  featured: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}
