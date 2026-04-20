import { Link } from 'react-router-dom'
import { TrendingUp, Play, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function SuccessCases() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Resultados Reais no Chão de Fábrica
          </h1>
          <p className="text-lg text-white/80 md:text-xl">
            Veja como empresários do setor moveleiro e metalúrgico estão dobrando a produção e
            reduzindo o desperdício com as máquinas Robooster.
          </p>
        </div>
      </section>

      {/* Featured Case */}
      <section className="py-16 container mx-auto px-4">
        <div className="bg-muted/30 border rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          <div className="relative aspect-video lg:aspect-auto bg-black">
            <img
              src="https://img.usecurling.com/p/800/600?q=factory+worker+happy"
              alt="Dono de marcenaria"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="h-16 w-16 bg-accent rounded-full flex items-center justify-center text-primary hover:scale-110 transition-transform">
                <Play className="h-6 w-6 ml-1" />
              </button>
            </div>
          </div>
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-accent font-semibold mb-4 text-sm uppercase tracking-wider">
              <TrendingUp className="h-5 w-5" /> Aumento de 40% na Produção
            </div>
            <h2 className="text-3xl font-bold mb-4">
              "A CNC 6090 pagou a si mesma em apenas 7 meses."
            </h2>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              João Roberto, proprietário da Marcenaria São João, conta como a falta de mão de obra
              qualificada quase fechou seu negócio, até ele investir na automação da Robooster.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <div className="text-3xl font-bold text-primary mb-1">-30%</div>
                <div className="text-sm text-muted-foreground">Desperdício de MDF</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">2x</div>
                <div className="text-sm text-muted-foreground">Velocidade de Entrega</div>
              </div>
            </div>
            <Link to="/catalogo?cat=cnc">
              <Button className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90 h-12 px-8 font-bold">
                Ver Máquina Utilizada
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Other Cases */}
      <section className="py-16 bg-muted/20 border-t">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold tracking-tight mb-10">Mais Histórias de Sucesso</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Redução de retrabalho no acabamento de bordas',
                company: 'Móveis Planejados Costa',
                machine: 'Coladeira Automática PRO',
                img: 'woodworking+factory',
              },
              {
                title: 'Precisão milimétrica em peças complexas',
                company: 'Tornearia Silva',
                machine: 'Centro de Usinagem 5 Eixos',
                img: 'metal+machining',
              },
              {
                title: 'Corte rápido e sem lascas',
                company: 'Design & Corte',
                machine: 'Serra Esquadrejadeira de Precisão',
                img: 'table+saw',
              },
            ].map((c, i) => (
              <Card
                key={i}
                className="overflow-hidden hover:shadow-elevation transition-all hover:-translate-y-1"
              >
                <div className="aspect-video relative">
                  <img
                    src={`https://img.usecurling.com/p/600/400?q=${c.img}`}
                    alt={c.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/80 text-white text-xs px-3 py-1 rounded backdrop-blur-sm">
                    {c.machine}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="text-sm text-accent font-semibold mb-2">{c.company}</div>
                  <h4 className="font-bold text-lg mb-4 line-clamp-2">{c.title}</h4>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> Retorno do
                      investimento acelerado
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />{' '}
                      Treinamento incluso para a equipe
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full group font-semibold">
                    Ler Estudo de Caso{' '}
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
