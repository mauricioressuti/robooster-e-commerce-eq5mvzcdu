// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.5'
  }
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          id: string
          image: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          image: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          image?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      lead_items: {
        Row: {
          id: string
          lead_id: string | null
          price_brl: number
          price_usd: number
          product_id: string | null
          quantity: number
        }
        Insert: {
          id?: string
          lead_id?: string | null
          price_brl: number
          price_usd: number
          product_id?: string | null
          quantity: number
        }
        Update: {
          id?: string
          lead_id?: string | null
          price_brl?: number
          price_usd?: number
          product_id?: string | null
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: 'lead_items_lead_id_fkey'
            columns: ['lead_id']
            isOneToOne: false
            referencedRelation: 'leads'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'lead_items_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'products'
            referencedColumns: ['id']
          },
        ]
      }
      leads: {
        Row: {
          address: string | null
          cep: string | null
          cnpj: string | null
          company_name: string | null
          created_at: string
          email: string
          id: string
          payment_method: string | null
          phone: string | null
          status: string
          total_brl: number
          total_usd: number
          user_id: string | null
        }
        Insert: {
          address?: string | null
          cep?: string | null
          cnpj?: string | null
          company_name?: string | null
          created_at?: string
          email: string
          id?: string
          payment_method?: string | null
          phone?: string | null
          status?: string
          total_brl: number
          total_usd: number
          user_id?: string | null
        }
        Update: {
          address?: string | null
          cep?: string | null
          cnpj?: string | null
          company_name?: string | null
          created_at?: string
          email?: string
          id?: string
          payment_method?: string | null
          phone?: string | null
          status?: string
          total_brl?: number
          total_usd?: number
          user_id?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category_id: string | null
          created_at: string
          description: string
          featured: boolean
          id: string
          image: string
          in_stock: boolean
          name: string
          price_brl: number
          price_usd: number
          sku: string
          specs: Json
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description: string
          featured?: boolean
          id?: string
          image: string
          in_stock?: boolean
          name: string
          price_brl: number
          price_usd: number
          sku: string
          specs?: Json
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description?: string
          featured?: boolean
          id?: string
          image?: string
          in_stock?: boolean
          name?: string
          price_brl?: number
          price_usd?: number
          sku?: string
          specs?: Json
        }
        Relationships: [
          {
            foreignKeyName: 'products_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'categories'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

// ====== DATABASE EXTENDED CONTEXT (auto-generated) ======
// This section contains actual PostgreSQL column types, constraints, RLS policies,
// functions, triggers, indexes and materialized views not present in the type definitions above.
// IMPORTANT: The TypeScript types above map UUID, TEXT, VARCHAR all to "string".
// Use the COLUMN TYPES section below to know the real PostgreSQL type for each column.
// Always use the correct PostgreSQL type when writing SQL migrations.

// --- COLUMN TYPES (actual PostgreSQL types) ---
// Use this to know the real database type when writing migrations.
// "string" in TypeScript types above may be uuid, text, varchar, timestamptz, etc.
// Table: categories
//   id: uuid (not null, default: gen_random_uuid())
//   slug: text (not null)
//   name: text (not null)
//   image: text (not null)
//   created_at: timestamp with time zone (not null, default: now())
// Table: lead_items
//   id: uuid (not null, default: gen_random_uuid())
//   lead_id: uuid (nullable)
//   product_id: uuid (nullable)
//   quantity: integer (not null)
//   price_brl: numeric (not null)
//   price_usd: numeric (not null)
// Table: leads
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (nullable)
//   cnpj: text (nullable)
//   company_name: text (nullable)
//   email: text (not null)
//   phone: text (nullable)
//   cep: text (nullable)
//   address: text (nullable)
//   payment_method: text (nullable)
//   status: text (not null, default: 'pending'::text)
//   total_brl: numeric (not null)
//   total_usd: numeric (not null)
//   created_at: timestamp with time zone (not null, default: now())
// Table: products
//   id: uuid (not null, default: gen_random_uuid())
//   category_id: uuid (nullable)
//   name: text (not null)
//   sku: text (not null)
//   price_brl: numeric (not null)
//   price_usd: numeric (not null)
//   image: text (not null)
//   description: text (not null)
//   specs: jsonb (not null, default: '{}'::jsonb)
//   in_stock: boolean (not null, default: true)
//   featured: boolean (not null, default: false)
//   created_at: timestamp with time zone (not null, default: now())

// --- CONSTRAINTS ---
// Table: categories
//   PRIMARY KEY categories_pkey: PRIMARY KEY (id)
//   UNIQUE categories_slug_key: UNIQUE (slug)
// Table: lead_items
//   FOREIGN KEY lead_items_lead_id_fkey: FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE
//   PRIMARY KEY lead_items_pkey: PRIMARY KEY (id)
//   FOREIGN KEY lead_items_product_id_fkey: FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
// Table: leads
//   PRIMARY KEY leads_pkey: PRIMARY KEY (id)
//   FOREIGN KEY leads_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL
// Table: products
//   FOREIGN KEY products_category_id_fkey: FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
//   PRIMARY KEY products_pkey: PRIMARY KEY (id)
//   UNIQUE products_sku_key: UNIQUE (sku)

// --- ROW LEVEL SECURITY POLICIES ---
// Table: categories
//   Policy "categories_select" (SELECT, PERMISSIVE) roles={public}
//     USING: true
// Table: lead_items
//   Policy "lead_items_insert" (INSERT, PERMISSIVE) roles={public}
//     WITH CHECK: true
// Table: leads
//   Policy "leads_insert" (INSERT, PERMISSIVE) roles={public}
//     WITH CHECK: true
//   Policy "leads_select" (SELECT, PERMISSIVE) roles={public}
//     USING: (auth.uid() = user_id)
// Table: products
//   Policy "products_select" (SELECT, PERMISSIVE) roles={public}
//     USING: true

// --- INDEXES ---
// Table: categories
//   CREATE UNIQUE INDEX categories_slug_key ON public.categories USING btree (slug)
// Table: products
//   CREATE UNIQUE INDEX products_sku_key ON public.products USING btree (sku)
