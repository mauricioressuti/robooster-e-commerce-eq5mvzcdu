import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AppProvider } from '@/hooks/use-app-store'

import Layout from './components/Layout'
import Index from './pages/Index'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import NotFound from './pages/NotFound'

const router = createBrowserRouter([
  {
    element: <Layout />,
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
  <AppProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RouterProvider router={router} />
    </TooltipProvider>
  </AppProvider>
)

export default App
