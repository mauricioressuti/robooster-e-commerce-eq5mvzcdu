import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { PackageMinus, TrendingDown } from 'lucide-react'

interface SystemAlertsProps {
  outOfStockCount: number
}

export function SystemAlerts({ outOfStockCount }: SystemAlertsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 mb-6">
      {outOfStockCount > 0 && (
        <Alert variant="destructive">
          <PackageMinus className="h-4 w-4" />
          <AlertTitle>Alerta de Estoque</AlertTitle>
          <AlertDescription>
            Existem {outOfStockCount} produtos sem estoque no momento. Verifique a aba Produtos &
            Estoque.
          </AlertDescription>
        </Alert>
      )}
      <Alert className="border-orange-500 text-orange-700 dark:text-orange-400">
        <TrendingDown className="h-4 w-4 stroke-orange-500" />
        <AlertTitle className="text-orange-700 dark:text-orange-400">
          Queda em Conversões
        </AlertTitle>
        <AlertDescription className="text-orange-700 dark:text-orange-400">
          A taxa de conversão caiu 2.4% nos últimos 7 dias. Recomendamos revisar a campanha de
          retargeting.
        </AlertDescription>
      </Alert>
    </div>
  )
}
