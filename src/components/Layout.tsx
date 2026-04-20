import { Outlet, ScrollRestoration } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { Header } from './header'
import { Footer } from './footer'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans relative">
      <Header />
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />

      {/* Floating WhatsApp Button for pragmatic B2B buyers */}
      <a
        href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20estou%20no%20site%20da%20Robooster%20e%20gostaria%20de%20falar%20com%20um%20consultor%20t%C3%A9cnico."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-elevation hover:scale-110 transition-transform flex items-center justify-center group"
        aria-label="Fale conosco no WhatsApp"
      >
        <MessageCircle className="h-8 w-8" />
        <span className="absolute right-full mr-4 bg-black/80 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-medium">
          Falar com Especialista
        </span>
      </a>
    </div>
  )
}
