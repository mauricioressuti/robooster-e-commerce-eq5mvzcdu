import { Link } from 'react-router-dom'
import { BookOpen, Clock, ArrowRight, User } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function Blog() {
  const posts = [
    {
      title: 'Guia Definitivo: Como escolher a CNC ideal para sua marcenaria',
      excerpt:
        'Entenda as diferenças entre motores de passo e servo motores, área de trabalho e como calcular a potência do spindle que você realmente precisa.',
      category: 'Guia de Compra',
      readTime: '8 min',
      author: 'Eng. Roberto Santos',
      img: 'cnc+router+machine',
    },
    {
      title: 'Como calcular o ROI (Retorno sobre Investimento) de uma nova máquina',
      excerpt:
        'Planilha prática e passo a passo para você descobrir exatamente em quantos meses a sua nova coladeira de bordas vai se pagar.',
      category: 'Gestão Industrial',
      readTime: '5 min',
      author: 'Carlos Mendes',
      img: 'financial+calculator',
    },
    {
      title: 'Manutenção Preventiva: 5 passos para evitar máquina parada',
      excerpt:
        'O guia de bolso do operador para limpeza de guias lineares, lubrificação e cuidados diários que estendem a vida útil do equipamento.',
      category: 'Manutenção',
      readTime: '4 min',
      author: 'Equipe Técnica Robooster',
      img: 'machine+maintenance',
    },
    {
      title: 'Diferença entre NR-12 e máquinas antigas: Vale a pena atualizar?',
      excerpt:
        'Riscos trabalhistas, ganho de produtividade e como o BNDES financia a adequação do seu parque fabril.',
      category: 'Segurança',
      readTime: '6 min',
      author: 'Amanda Silva',
      img: 'safety+factory',
    },
  ]

  return (
    <div className="flex flex-col w-full min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent hover:bg-accent/20">
            Blog Industrial
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Conhecimento que gera Lucro</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Artigos técnicos, dicas de manutenção e guias de gestão para donos de marcenarias e
            indústrias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, i) => (
            <Card
              key={i}
              className="overflow-hidden hover:shadow-elevation transition-all group border"
            >
              <div className="aspect-[16/9] relative overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-primary text-white border-none">{post.category}</Badge>
                </div>
                <img
                  src={`https://img.usecurling.com/p/800/450?q=${post.img}`}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {post.readTime} leitura
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" /> {post.author}
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors line-clamp-2 leading-tight">
                  <Link to="#">{post.title}</Link>
                </h2>
                <p className="text-muted-foreground text-sm line-clamp-3 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                <Link
                  to="#"
                  className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-accent transition-colors"
                >
                  Ler artigo completo <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="font-bold">
            Carregar mais artigos
          </Button>
        </div>
      </div>
    </div>
  )
}
