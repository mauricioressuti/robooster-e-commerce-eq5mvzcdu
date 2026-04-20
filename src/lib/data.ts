import { Product } from './types'

export const CATEGORIES = [
  {
    id: 'cnc',
    name: 'CNC Routers',
    image: 'https://img.usecurling.com/p/600/400?q=cnc+machine&color=gray',
  },
  {
    id: 'edgebander',
    name: 'Coladeiras',
    image: 'https://img.usecurling.com/p/600/400?q=industrial+machine+edge&color=orange',
  },
  {
    id: 'saw',
    name: 'Serras',
    image: 'https://img.usecurling.com/p/600/400?q=industrial+saw+machine&color=blue',
  },
  {
    id: 'forklift',
    name: 'Empilhadeiras',
    image: 'https://img.usecurling.com/p/600/400?q=forklift&color=yellow',
  },
  {
    id: 'ultrasonic',
    name: 'Cubas Ultrassônicas',
    image: 'https://img.usecurling.com/p/600/400?q=ultrasonic+cleaner+industrial&color=cyan',
  },
]

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'CNC Router Industrial Pro X-2000',
    sku: 'RBT-CNC-2000',
    category: 'cnc',
    priceBRL: 145000,
    priceUSD: 28000,
    image: 'https://img.usecurling.com/p/500/500?q=cnc+router+machine',
    description:
      'Alta precisão para cortes complexos em madeira, acrílico e metais leves. Equipamento de nível industrial com refrigeração líquida.',
    specs: { Potência: '9kW', 'Área de Trabalho': '2000x3000mm', Peso: '1200kg' },
    inStock: true,
    featured: true,
  },
  {
    id: 'p2',
    name: 'Coladeira de Bordas Automática EdgeMaster',
    sku: 'RBT-EDG-AUTO',
    category: 'edgebander',
    priceBRL: 85000,
    priceUSD: 16500,
    image: 'https://img.usecurling.com/p/500/500?q=edge+bander+machine',
    description:
      'Coladeira de bordas de alta velocidade com tupia de entrada e arredondador de cantos.',
    specs: { Velocidade: '12m/min', 'Espessura da fita': '0.4 a 3mm', Peso: '850kg' },
    inStock: true,
    featured: true,
  },
  {
    id: 'p3',
    name: 'Esquadrejadeira de Precisão Titanium',
    sku: 'RBT-SAW-TITAN',
    category: 'saw',
    priceBRL: 42000,
    priceUSD: 8200,
    image: 'https://img.usecurling.com/p/500/500?q=table+saw+industrial',
    description:
      'Serra esquadrejadeira com eixo inclinável e riscador, ideal para cortes perfeitos em MDF revestido.',
    specs: { Motor: '5.5CV', 'Comprimento de corte': '3200mm', Inclinação: '0 a 45º' },
    inStock: true,
  },
  {
    id: 'p4',
    name: 'Empilhadeira Elétrica 2.5T Lithium',
    sku: 'RBT-FRK-25L',
    category: 'forklift',
    priceBRL: 210000,
    priceUSD: 41000,
    image: 'https://img.usecurling.com/p/500/500?q=electric+forklift',
    description: 'Empilhadeira elétrica com bateria de lítio, zero emissões e carregamento rápido.',
    specs: { Capacidade: '2500kg', Elevação: '4500mm', Bateria: 'Lítio 80V/271Ah' },
    inStock: false,
    featured: true,
  },
  {
    id: 'p5',
    name: 'Cuba Ultrassônica Industrial 100L',
    sku: 'RBT-ULT-100',
    category: 'ultrasonic',
    priceBRL: 18500,
    priceUSD: 3600,
    image: 'https://img.usecurling.com/p/500/500?q=ultrasonic+cleaner+steel',
    description:
      'Limpeza profunda de peças mecânicas e injetores através de cavitação ultrassônica.',
    specs: { Capacidade: '100 Litros', Frequência: '28/40 kHz', Potência: '1500W' },
    inStock: true,
  },
  {
    id: 'p6',
    name: 'Mini Router CNC Desktop M-500',
    sku: 'RBT-CNC-0500',
    category: 'cnc',
    priceBRL: 25000,
    priceUSD: 4900,
    image: 'https://img.usecurling.com/p/500/500?q=desktop+cnc+machine',
    description: 'Solução compacta para prototipagem e pequenas produções.',
    specs: { Potência: '2.2kW', 'Área de Trabalho': '600x900mm', Peso: '150kg' },
    inStock: true,
  },
]
