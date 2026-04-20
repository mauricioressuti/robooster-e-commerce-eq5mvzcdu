import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Truck, CreditCard, Clock, XCircle } from 'lucide-react'

export function OperationsTab() {
  const freightData = [
    { name: 'Correios Sedex', value: 45 },
    { name: 'Jadlog', value: 30 },
    { name: 'Braspress', value: 25 },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Método de Pagamento</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Pix (65%)</div>
          <p className="text-xs text-muted-foreground">Cartão de Crédito: 30%, Boleto: 5%</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taxa de Recusa</CardTitle>
          <XCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2.1%</div>
          <p className="text-xs text-muted-foreground">Chargeback: 0.5% (dentro do aceitável)</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Transportadora Principal</CardTitle>
          <Truck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Correios Sedex</div>
          <p className="text-xs text-muted-foreground">Custo médio de frete: R$ 450,00</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Suporte</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">14 mins</div>
          <p className="text-xs text-muted-foreground">Tempo médio de resposta no WhatsApp</p>
        </CardContent>
      </Card>
      <Card className="col-span-2 lg:col-span-4 mt-4">
        <CardHeader>
          <CardTitle>Uso de Transportadoras</CardTitle>
          <CardDescription>Volume de envios por parceiro logístico no mês atual.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{ value: { label: 'Envios (%)', color: 'hsl(var(--primary))' } }}
            className="h-[250px] w-full"
          >
            <BarChart data={freightData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="var(--color-value)" radius={[0, 4, 4, 0]} barSize={32} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
