import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Cog, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CATEGORIES, MOCK_PRODUCTS } from '@/lib/data'
import { ProductCard } from '@/components/product-card'

export default function Index() {
  const featuredProducts = MOCK_PRODUCTS.filter((p) => p.featured).slice(0, 4)

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary/90 z-10" />
        <img
          src="https://img.usecurling.com/p/1920/1080?q=industrial+factory+machines"
          alt="Factory"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="container relative z-20 px-4 text-center text-white animate-fade-in-up">
          <Badge
            variant="outline"
            className="text-accent border-accent mb-6 px-4 py-1 text-sm bg-accent/10"
          >
            B2B Machinery
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 max-w-4xl mx-auto leading-tight">
            Potência Industrial para o seu Negócio
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Equipamentos de alta performance, suporte técnico especializado e soluções de
            financiamento B2B para elevar a produtividade da sua fábrica.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/catalogo">
              <Button
                size="lg"
                className="bg-accent text-white hover:bg-accent/90 h-14 px-8 text-lg w-full sm:w-auto"
              >
                Ver Catálogo Completo
              </Button>
            </Link>
            <Link to="/contato">
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg text-primary hover:text-primary w-full sm:w-auto bg-white hover:bg-white/90"
              >
                Falar com Especialista
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="flex flex-col items-center gap-3 pt-4 md:pt-0">
              <ShieldCheck className="h-10 w-10 text-accent" />
              <h3 className="font-semibold text-lg">Garantia Estendida</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                Até 2 anos de proteção total contra defeitos de fabricação.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 pt-4 md:pt-0">
              <Cog className="h-10 w-10 text-accent" />
              <h3 className="font-semibold text-lg">Instalação Técnica</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                Equipe especializada para setup e treinamento na sua planta.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 pt-4 md:pt-0">
              <Truck className="h-10 w-10 text-accent" />
              <h3 className="font-semibold text-lg">Frete Especializado</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                Logística pesada com seguro de ponta a ponta para todo o Brasil.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Linhas de Equipamentos</h2>
            <p className="text-muted-foreground">
              Selecione a categoria para encontrar a máquina ideal.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/catalogo?cat=${cat.id}`}
              className={`group relative overflow-hidden rounded-xl aspect-[4/3] ${i === 0 ? 'md:col-span-2 lg:col-span-2 aspect-[21/9] md:aspect-auto' : ''}`}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white mb-2">{cat.name}</h3>
                <span className="text-accent flex items-center font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
                  Explorar <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted/20 border-t">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Destaques Robooster</h2>
              <p className="text-muted-foreground">
                As máquinas mais procuradas pelas indústrias este mês.
              </p>
            </div>
            <Link
              to="/catalogo"
              className="hidden sm:flex text-primary font-medium hover:text-accent items-center"
            >
              Ver todos <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function Badge({ className, variant, children }: any) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${className}`}
    >
      {children}
    </span>
  )
}
