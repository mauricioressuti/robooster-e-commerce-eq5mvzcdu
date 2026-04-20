import { Link } from 'react-router-dom'
import { Search, Menu, Factory } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { CartDrawer } from './cart-drawer'
import { useAppStore } from '@/hooks/use-app-store'

const NAV_LINKS = [
  { name: 'Catálogo Completo', path: '/catalogo' },
  { name: 'CNC Routers', path: '/catalogo?cat=cnc' },
  { name: 'Coladeiras', path: '/catalogo?cat=edgebander' },
  { name: 'Serras', path: '/catalogo?cat=saw' },
]

export function Header() {
  const { currency, setCurrency } = useAppStore()

  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-primary-foreground shadow-elevation">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl md:text-2xl tracking-tighter"
        >
          <Factory className="h-6 w-6 text-accent" />
          <span>ROBOOSTER</span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-xl relative mx-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por nome ou SKU da máquina..."
            className="w-full pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-accent"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden sm:flex items-center bg-white/10 p-1 rounded-md">
            <button
              onClick={() => setCurrency('BRL')}
              className={`px-3 py-1 text-xs font-semibold rounded ${currency === 'BRL' ? 'bg-white text-primary' : 'text-white hover:bg-white/10'}`}
            >
              BRL
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1 text-xs font-semibold rounded ${currency === 'USD' ? 'bg-white text-primary' : 'text-white hover:bg-white/10'}`}
            >
              USD
            </button>
          </div>

          <Link to="/contato" className="hidden lg:block">
            <Button
              variant="outline"
              className="border-white/20 text-primary hover:bg-white/10 hover:text-white"
            >
              Solicitar Orçamento
            </Button>
          </Link>

          <CartDrawer />

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-white/10"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-primary text-white border-l-primary-foreground/10"
            >
              <SheetTitle className="text-white flex items-center gap-2">
                <Factory className="h-5 w-5 text-accent" /> Menu
              </SheetTitle>
              <div className="mt-8 flex flex-col gap-4">
                <Input
                  type="search"
                  placeholder="Buscar máquinas..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <nav className="flex flex-col gap-2 mt-4">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="px-4 py-3 hover:bg-white/10 rounded-md font-medium transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto pt-8 flex items-center gap-4">
                  <span className="text-sm font-semibold">Moeda:</span>
                  <button
                    onClick={() => setCurrency('BRL')}
                    className={`px-4 py-2 rounded-md ${currency === 'BRL' ? 'bg-accent text-white' : 'bg-white/10'}`}
                  >
                    BRL
                  </button>
                  <button
                    onClick={() => setCurrency('USD')}
                    className={`px-4 py-2 rounded-md ${currency === 'USD' ? 'bg-accent text-white' : 'bg-white/10'}`}
                  >
                    USD
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex bg-primary-foreground/5 border-t border-white/10">
        <div className="container mx-auto px-4 h-12 flex items-center gap-8 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-white/80 hover:text-accent transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
