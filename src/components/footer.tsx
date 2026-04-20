import { Factory, Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter mb-6">
              <Factory className="h-6 w-6 text-accent" />
              <span>ROBOOSTER</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Líder na distribuição de maquinário industrial de alta precisão. Potencializando
              indústrias através de tecnologia e confiabilidade.
            </p>
            <div className="flex flex-col gap-3 text-sm text-white/80">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent" />
                <span>+55 (11) 4000-0000</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent" />
                <span>contato@robooster.com.br</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-accent" />
                <span>Polo Industrial, São Paulo - SP</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Equipamentos</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/60">
              <li>
                <a href="/catalogo?cat=cnc" className="hover:text-accent transition-colors">
                  Centros de Usinagem CNC
                </a>
              </li>
              <li>
                <a href="/catalogo?cat=edgebander" className="hover:text-accent transition-colors">
                  Coladeiras de Bordas
                </a>
              </li>
              <li>
                <a href="/catalogo?cat=saw" className="hover:text-accent transition-colors">
                  Serras Esquadrejadeiras
                </a>
              </li>
              <li>
                <a href="/catalogo?cat=forklift" className="hover:text-accent transition-colors">
                  Empilhadeiras Industriais
                </a>
              </li>
              <li>
                <a href="/catalogo?cat=ultrasonic" className="hover:text-accent transition-colors">
                  Limpeza Ultrassônica
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Conteúdo & Suporte</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/60">
              <li>
                <a href="/casos-de-sucesso" className="hover:text-accent transition-colors">
                  Casos de Sucesso
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-accent transition-colors">
                  Blog Industrial
                </a>
              </li>
              <li>
                <a href="/contato" className="hover:text-accent transition-colors">
                  Fale Conosco
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Assistência Técnica
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Manuais e Garantia
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Newsletter Industrial</h4>
            <p className="text-white/60 text-sm mb-4">
              Receba insights sobre automação e novas tecnologias para sua fábrica.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Seu melhor e-mail institucional"
                className="bg-white/5 border border-white/10 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-accent"
              />
              <button className="bg-accent text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-accent/90 transition-colors">
                Inscrever-se
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-white/40 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Robooster Industrial E-commerce. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
