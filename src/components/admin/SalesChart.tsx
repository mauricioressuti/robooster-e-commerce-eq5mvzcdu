import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

export function SalesChart({ totalRevenue }: { totalRevenue: number }) {
  const salesData = [
    { name: 'Jan', total: 120000 },
    { name: 'Fev', total: 185000 },
    { name: 'Mar', total: 145000 },
    { name: 'Abr', total: 210000 },
    { name: 'Mai', total: 280000 },
    { name: 'Jun', total: totalRevenue > 0 ? totalRevenue : 320000 },
  ]

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Vendas & Orçamentos (6 meses)</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer
          config={{
            total: { label: 'Receita', color: 'hsl(var(--primary))' },
          }}
          className="h-[300px] w-full"
        >
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(val) => `R$ ${val / 1000}k`} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="total" fill="var(--color-total)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
