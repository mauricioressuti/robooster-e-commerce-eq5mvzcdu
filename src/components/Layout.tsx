import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Header } from './header'
import { Footer } from './footer'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <Header />
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
