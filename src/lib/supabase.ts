import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl) throw new Error('Missing env.VITE_SUPABASE_URL')
if (!supabaseAnonKey) throw new Error('Missing env.VITE_SUPABASE_ANON_KEY')

// Supabase istemcisini oluştur
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: window.localStorage
  }
})

// Wrapper fonksiyonları
export const getSupabase = () => supabase
