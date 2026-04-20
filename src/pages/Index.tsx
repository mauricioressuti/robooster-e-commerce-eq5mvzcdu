import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ShieldCheck,
  Factory,
  TrendingUp,
  MessageCircle,
  Play,
  CheckCircle2,
  Wrench,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCatalog } from '@/hooks/use-catalog'
import { ProductCard } from '@/components/product-card'

export default function Index() {
  const { products, loading } = useCatalog()

  const featuredProducts = products.filter((p) => p.featured).slice(0, 4)

  if (loading)
    return (
      <div className="py-32 text-center text-lg text-muted-foreground">Carregando soluções...</div>
    )

  return (
    <div className="flex flex-col w-full">
      {/* Pragmatic Hero Section */}
      <section className="relative bg-primary pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://img.usecurling.com/p/1920/1080?q=industrial+cnc+machine+working"
            alt="Factory"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent" />
        </div>
        <div className="container relative z-10 px-4 animate-fade-in-up">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-accent/20 text-accent px-3 py-1 text-sm font-semibold mb-6 border border-accent/30">
              Soluções Industriais B2B
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
              Aumente sua Produção em até 40% com Máquinas de Alta Precisão
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed">
              Equipamentos robustos para acabar com os gargalos da sua marcenaria. Reduza o
              desperdício de material, diminua a dependência de mão de obra e recupere seu
              investimento em meses.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link to="/catalogo" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-accent text-primary hover:bg-accent/90 h-14 px-8 text-lg w-full font-bold shadow-lg"
                >
                  Ver Catálogo de Máquinas
                </Button>
              </Link>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-lg text-white border-white/30 hover:bg-white/10 w-full flex items-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" /> Falar com Consultor
                </Button>
              </a>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" /> Financiamento BNDES
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" /> Instalação Inclusa
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Solved Section */}
      <section className="py-20 bg-muted/30 border-b">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Conhecemos o Chão de Fábrica</h2>
            <p className="text-muted-foreground text-lg">
              As máquinas Robooster são projetadas para resolver os problemas reais do empresário
              brasileiro.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl border shadow-sm flex flex-col items-start">
              <div className="h-12 w-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-6">
                <Factory className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Falta de Mão de Obra</h3>
              <p className="text-muted-foreground mb-4">
                A automação CNC permite que um único operador faça o trabalho de três, com precisão
                milimétrica e sem exaustão.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl border shadow-sm flex flex-col items-start">
              <div className="h-12 w-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Desperdício de Material</h3>
              <p className="text-muted-foreground mb-4">
                Softwares de nesting integrados otimizam o plano de corte, economizando até 25% de
                MDF por projeto.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl border shadow-sm flex flex-col items-start">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                <Wrench className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Máquina Parada</h3>
              <p className="text-muted-foreground mb-4">
                Componentes industriais de alta durabilidade e suporte técnico nacional em até 48h.
                Sua produção não pode parar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">
                Máquinas de Alto Desempenho
              </h2>
              <p className="text-muted-foreground">
                Equipamentos testados e aprovados pela indústria.
              </p>
            </div>
            <Link
              to="/catalogo"
              className="text-primary font-semibold hover:text-accent flex items-center bg-muted/50 px-4 py-2 rounded-lg transition-colors"
            >
              Ver Catálogo Completo <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Proof / Success Cases Mini */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Não acredite apenas na gente. Veja os resultados.
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Empresários pragmáticos exigem provas. Assista aos depoimentos de clientes que
                transformaram suas fábricas com nosso maquinário.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-accent h-6 w-6" /> Retorno do investimento médio em
                  8 a 14 meses
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-accent h-6 w-6" /> Redução drástica de devoluções
                  por defeito de corte
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-accent h-6 w-6" /> Escalabilidade para pegar grandes
                  licitações
                </li>
              </ul>
              <Link to="/casos-de-sucesso">
                <Button className="bg-white text-primary hover:bg-white/90 h-12 px-8 font-bold">
                  Ler Casos de Sucesso
                </Button>
              </Link>
            </div>
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-white/10 group cursor-pointer">
              <img
                src="https://img.usecurling.com/p/800/450?q=factory+worker+interview"
                alt="Depoimento"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 bg-accent rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-lg">
                  <Play className="h-6 w-6 ml-1" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/60 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                  <p className="font-semibold italic text-sm">
                    "Eu achava que CNC era coisa de gigante. Comprei a minha primeira e me arrependi
                    de não ter feito isso há 5 anos."
                  </p>
                  <p className="text-accent text-xs mt-2 font-bold">
                    — Carlos Oliveira, Marcenaria Costa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <ShieldCheck className="h-10 w-10 text-primary opacity-80" />
              <h3 className="font-bold text-sm">Garantia 2 Anos</h3>
              <p className="text-muted-foreground text-xs">Proteção total de fábrica</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Wrench className="h-10 w-10 text-primary opacity-80" />
              <h3 className="font-bold text-sm">Técnico Local</h3>
              <p className="text-muted-foreground text-xs">Atendimento em até 48h</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Factory className="h-10 w-10 text-primary opacity-80" />
              <h3 className="font-bold text-sm">Pronta Entrega</h3>
              <p className="text-muted-foreground text-xs">Amplo estoque de peças</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <TrendingUp className="h-10 w-10 text-primary opacity-80" />
              <h3 className="font-bold text-sm">Financiamento B2B</h3>
              <p className="text-muted-foreground text-xs">Taxas via BNDES/Finame</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
