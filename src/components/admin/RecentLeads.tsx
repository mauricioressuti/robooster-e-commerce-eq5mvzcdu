import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Database } from '@/lib/supabase/types'

type Lead = Database['public']['Tables']['leads']['Row']

export function RecentLeads({ leads }: { leads: Lead[] }) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Leads Recentes</CardTitle>
        <CardDescription>Você teve {leads.length} leads recentemente.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {leads.slice(0, 5).map((lead) => (
            <div key={lead.id} className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {lead.company_name || lead.email}
                </p>
                <p className="text-sm text-muted-foreground">{lead.email}</p>
              </div>
              <div className="ml-auto font-medium">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                  lead.total_brl,
                )}
              </div>
            </div>
          ))}
          {leads.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Nenhum lead encontrado no banco de dados.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
