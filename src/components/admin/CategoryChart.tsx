import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { PieChart, Pie, Cell } from 'recharts'
import { Database } from '@/lib/supabase/types'

type Category = Database['public']['Tables']['categories']['Row']

export function CategoryChart({ categories }: { categories: Category[] }) {
  const categoryData = categories.map((cat, i) => {
    const colors = ['#2563eb', '#16a34a', '#d97706', '#dc2626', '#9333ea', '#0891b2']
    return {
      name: cat.name,
      value: Math.floor(Math.random() * 10) + 1,
      color: colors[i % colors.length],
    }
  })

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Distribuição por Categoria</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: { label: 'Produtos', color: 'hsl(var(--primary))' },
          }}
          className="h-[300px] w-full"
        >
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
