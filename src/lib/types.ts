export type Category = 'cnc' | 'edgebander' | 'saw' | 'forklift' | 'ultrasonic' | 'all'

export interface Product {
  id: string
  name: string
  sku: string
  category: Category
  priceBRL: number
  priceUSD: number
  image: string
  description: string
  specs: Record<string, string>
  inStock: boolean
  featured?: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}
