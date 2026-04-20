import { supabase } from '@/lib/supabase/client'
import { Product, Category } from '@/lib/types'

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from('categories').select('*').order('name')
  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }
  return data || []
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from('products').select('*, category:categories(*)')
  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  if (!data) return []

  return data.map((p: any) => ({
    id: p.id,
    category: p.category?.slug || '',
    name: p.name,
    sku: p.sku,
    priceBRL: Number(p.price_brl),
    priceUSD: Number(p.price_usd),
    image: p.image,
    description: p.description,
    specs: p.specs as Record<string, string>,
    inStock: p.in_stock,
    featured: p.featured,
  }))
}

export async function submitLead(lead: any, items: any[]) {
  const { data, error } = await supabase.from('leads').insert(lead).select().single()
  if (error) throw error

  const leadItems = items.map((item) => ({
    lead_id: data.id,
    product_id: item.product.id,
    quantity: item.quantity,
    price_brl: item.product.priceBRL,
    price_usd: item.product.priceUSD,
  }))

  const { error: itemsError } = await supabase.from('lead_items').insert(leadItems)
  if (itemsError) throw itemsError

  return data
}
