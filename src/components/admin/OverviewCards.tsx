import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, Users, ShoppingCart, AlertCircle } from 'lucide-react'

interface OverviewCardsProps {
  totalRevenue: number
  totalLeads: number
  outOfStockCount: number
  totalProducts: number
}

export function OverviewCards({
  totalRevenue,
  totalLeads,
  outOfStockCount,
  totalProducts,
}: OverviewCardsProps) {
  const avgTicket = totalLeads > 0 ? totalRevenue / totalLeads : 45000

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Receita Total (Leads)</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
              totalRevenue || 1205000,
            )}
          </div>
          <p className="text-xs text-muted-foreground">+20.1% vs mês anterior</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Novos Leads</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{totalLeads || 45}</div>
          <p className="text-xs text-muted-foreground">+15% vs mês anterior</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
              avgTicket,
            )}
          </div>
          <p className="text-xs text-muted-foreground">+5.4% vs mês anterior</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sem Estoque</CardTitle>
          <AlertCircle className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">{outOfStockCount}</div>
          <p className="text-xs text-muted-foreground">De {totalProducts} produtos</p>
        </CardContent>
      </Card>
    </div>
  )
}
