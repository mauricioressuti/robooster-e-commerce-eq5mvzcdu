import { useState, useEffect } from 'react'
import { getCategories, getProducts } from '@/services/catalog'
import { Category, Product } from '@/lib/types'

export function useCatalog() {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [cats, prods] = await Promise.all([getCategories(), getProducts()])
        setCategories(cats)
        setProducts(prods)
      } catch (error) {
        console.error('Error loading catalog:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return { categories, products, loading }
}
