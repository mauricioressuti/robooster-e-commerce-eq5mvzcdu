-- Migration for e-commerce schema
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  price_brl NUMERIC NOT NULL,
  price_usd NUMERIC NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  specs JSONB NOT NULL DEFAULT '{}'::jsonb,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  cnpj TEXT,
  company_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  cep TEXT,
  address TEXT,
  payment_method TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  total_brl NUMERIC NOT NULL,
  total_usd NUMERIC NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.lead_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INT NOT NULL,
  price_brl NUMERIC NOT NULL,
  price_usd NUMERIC NOT NULL
);

-- RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "categories_select" ON public.categories;
CREATE POLICY "categories_select" ON public.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "products_select" ON public.products;
CREATE POLICY "products_select" ON public.products FOR SELECT USING (true);

DROP POLICY IF EXISTS "leads_insert" ON public.leads;
CREATE POLICY "leads_insert" ON public.leads FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "leads_select" ON public.leads;
CREATE POLICY "leads_select" ON public.leads FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "lead_items_insert" ON public.lead_items;
CREATE POLICY "lead_items_insert" ON public.lead_items FOR INSERT WITH CHECK (true);

-- Auth Seed
DO $$
DECLARE
  new_user_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'mauricio@saberdaeletronica.com.br') THEN
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      new_user_id,
      '00000000-0000-0000-0000-000000000000',
      'mauricio@saberdaeletronica.com.br',
      crypt('Skip@Pass', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Mauricio"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '', NULL, '', '', ''
    );
  END IF;
END $$;

-- Data Seed
DO $$
DECLARE
  cat_cnc UUID := 'c0000000-0000-0000-0000-000000000001'::uuid;
  cat_edge UUID := 'c0000000-0000-0000-0000-000000000002'::uuid;
  cat_saw UUID := 'c0000000-0000-0000-0000-000000000003'::uuid;
  cat_fork UUID := 'c0000000-0000-0000-0000-000000000004'::uuid;
  cat_ultra UUID := 'c0000000-0000-0000-0000-000000000005'::uuid;
BEGIN
  INSERT INTO public.categories (id, slug, name, image) VALUES
    (cat_cnc, 'cnc', 'CNC Routers', 'https://img.usecurling.com/p/600/400?q=cnc+machine&color=gray'),
    (cat_edge, 'edgebander', 'Coladeiras', 'https://img.usecurling.com/p/600/400?q=industrial+machine+edge&color=orange'),
    (cat_saw, 'saw', 'Serras', 'https://img.usecurling.com/p/600/400?q=industrial+saw+machine&color=blue'),
    (cat_fork, 'forklift', 'Empilhadeiras', 'https://img.usecurling.com/p/600/400?q=forklift&color=yellow'),
    (cat_ultra, 'ultrasonic', 'Cubas Ultrassônicas', 'https://img.usecurling.com/p/600/400?q=ultrasonic+cleaner+industrial&color=cyan')
  ON CONFLICT (slug) DO NOTHING;

  INSERT INTO public.products (id, category_id, name, sku, price_brl, price_usd, image, description, specs, in_stock, featured) VALUES
    ('p0000000-0000-0000-0000-000000000001'::uuid, cat_cnc, 'CNC Router Industrial Pro X-2000', 'RBT-CNC-2000', 145000, 28000, 'https://img.usecurling.com/p/500/500?q=cnc+router+machine', 'Alta precisão para cortes complexos em madeira, acrílico e metais leves. Equipamento de nível industrial com refrigeração líquida.', '{"Potência": "9kW", "Área de Trabalho": "2000x3000mm", "Peso": "1200kg"}', true, true),
    ('p0000000-0000-0000-0000-000000000002'::uuid, cat_edge, 'Coladeira de Bordas Automática EdgeMaster', 'RBT-EDG-AUTO', 85000, 16500, 'https://img.usecurling.com/p/500/500?q=edge+bander+machine', 'Coladeira de bordas de alta velocidade com tupia de entrada e arredondador de cantos.', '{"Velocidade": "12m/min", "Espessura da fita": "0.4 a 3mm", "Peso": "850kg"}', true, true),
    ('p0000000-0000-0000-0000-000000000003'::uuid, cat_saw, 'Esquadrejadeira de Precisão Titanium', 'RBT-SAW-TITAN', 42000, 8200, 'https://img.usecurling.com/p/500/500?q=table+saw+industrial', 'Serra esquadrejadeira com eixo inclinável e riscador, ideal para cortes perfeitos em MDF revestido.', '{"Motor": "5.5CV", "Comprimento de corte": "3200mm", "Inclinação": "0 a 45º"}', true, false),
    ('p0000000-0000-0000-0000-000000000004'::uuid, cat_fork, 'Empilhadeira Elétrica 2.5T Lithium', 'RBT-FRK-25L', 210000, 41000, 'https://img.usecurling.com/p/500/500?q=electric+forklift', 'Empilhadeira elétrica com bateria de lítio, zero emissões e carregamento rápido.', '{"Capacidade": "2500kg", "Elevação": "4500mm", "Bateria": "Lítio 80V/271Ah"}', false, true),
    ('p0000000-0000-0000-0000-000000000005'::uuid, cat_ultra, 'Cuba Ultrassônica Industrial 100L', 'RBT-ULT-100', 18500, 3600, 'https://img.usecurling.com/p/500/500?q=ultrasonic+cleaner+steel', 'Limpeza profunda de peças mecânicas e injetores através de cavitação ultrassônica.', '{"Capacidade": "100 Litros", "Frequência": "28/40 kHz", "Potência": "1500W"}', true, false),
    ('p0000000-0000-0000-0000-000000000006'::uuid, cat_cnc, 'Mini Router CNC Desktop M-500', 'RBT-CNC-0500', 25000, 4900, 'https://img.usecurling.com/p/500/500?q=desktop+cnc+machine', 'Solução compacta para prototipagem e pequenas produções.', '{"Potência": "2.2kW", "Área de Trabalho": "600x900mm", "Peso": "150kg"}', true, false)
  ON CONFLICT (sku) DO NOTHING;
END $$;
