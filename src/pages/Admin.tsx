import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { OverviewCards } from '@/components/admin/OverviewCards'
import { SalesChart } from '@/components/admin/SalesChart'
import { RecentLeads } from '@/components/admin/RecentLeads'
import { CategoryChart } from '@/components/admin/CategoryChart'
import { StockStatus } from '@/components/admin/StockStatus'
import { TrafficChart } from '@/components/admin/TrafficChart'
import { SystemAlerts } from '@/components/admin/SystemAlerts'
import { OperationsTab } from '@/components/admin/OperationsTab'
import { Database } from '@/lib/supabase/types'

type Lead = Database['public']['Tables']['leads']['Row']
type Product = Database['public']['Tables']['products']['Row']
type Category = Database['public']['Tables']['categories']['Row']

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const [leadsRes, productsRes, categoriesRes] = await Promise.all([
        supabase.from('leads').select('*').order('created_at', { ascending: false }),
        supabase.from('products').select('*'),
        supabase.from('categories').select('*'),
      ])

      if (leadsRes.data) setLeads(leadsRes.data)
      if (productsRes.data) setProducts(productsRes.data)
      if (categoriesRes.data) setCategories(categoriesRes.data)
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center p-8">
        Carregando painel de controle...
      </div>
    )
  }

  const totalLeads = leads.length
  const totalRevenue = leads.reduce((acc, lead) => acc + (lead.total_brl || 0), 0)
  const outOfStockCount = products.filter((p) => !p.in_stock).length
  const totalProducts = products.length

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard de Gestão Inteligente</h2>
      </div>

      <SystemAlerts outOfStockCount={outOfStockCount} />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="products">Produtos & Estoque</TabsTrigger>
          <TabsTrigger value="leads">Leads & Tráfego</TabsTrigger>
          <TabsTrigger value="operations">Logística & Operação</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <OverviewCards
            totalRevenue={totalRevenue}
            totalLeads={totalLeads}
            outOfStockCount={outOfStockCount}
            totalProducts={totalProducts}
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <SalesChart totalRevenue={totalRevenue} />
            <RecentLeads leads={leads} />
          </div>
        </TabsContent>
        <TabsContent value="products" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <CategoryChart categories={categories} />
            <StockStatus products={products} />
          </div>
        </TabsContent>
        <TabsContent value="leads" className="space-y-4">
          <TrafficChart totalLeads={totalLeads} />
        </TabsContent>
        <TabsContent value="operations" className="space-y-4">
          <OperationsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
