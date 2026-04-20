import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AppProvider } from '@/hooks/use-app-store'
import { AuthProvider, useAuth } from '@/hooks/use-auth'

import Layout from './components/Layout'
import { AuthPage } from './pages/AuthPage'
import Index from './pages/Index'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import NotFound from './pages/NotFound'

const AppLayout = () => {
  const { user, loading } = useAuth()
  if (loading)
    return <div className="flex h-screen w-full items-center justify-center">Carregando...</div>
  if (!user) return <AuthPage />
  return <Layout />
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Index />,
      },
      {
        path: '/catalogo',
        element: <Catalog />,
      },
      {
        path: '/produto/:id',
        element: <ProductDetail />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

const App = () => (
  <AuthProvider>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouterProvider router={router} />
      </TooltipProvider>
    </AppProvider>
  </AuthProvider>
)

export default App
