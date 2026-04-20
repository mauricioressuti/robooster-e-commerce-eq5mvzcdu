import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts'

export function TrafficChart({ totalLeads }: { totalLeads: number }) {
  const trafficData = [
    { name: 'Jan', visitors: 1200, conversions: 24 },
    { name: 'Fev', visitors: 1500, conversions: 35 },
    { name: 'Mar', visitors: 1800, conversions: 42 },
    { name: 'Abr', visitors: 2200, conversions: 50 },
    { name: 'Mai', visitors: 2800, conversions: 65 },
    { name: 'Jun', visitors: 3100, conversions: totalLeads > 0 ? totalLeads : 75 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tráfego vs Conversão (Leads)</CardTitle>
        <CardDescription>Análise de visitantes únicos e conversão em orçamentos.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            visitors: { label: 'Visitantes', color: 'hsl(var(--primary))' },
            conversions: { label: 'Leads', color: 'hsl(var(--destructive))' },
          }}
          className="h-[350px] w-full"
        >
          <LineChart data={trafficData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="visitors"
              stroke="var(--color-visitors)"
              strokeWidth={2}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="conversions"
              stroke="var(--color-conversions)"
              strokeWidth={2}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
