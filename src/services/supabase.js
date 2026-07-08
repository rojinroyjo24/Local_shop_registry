import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Flag to check if Supabase is properly configured
export const isSupabaseConfigured =
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'your_supabase_project_url' &&
  supabaseAnonKey !== 'your_supabase_anon_key'

if (!isSupabaseConfigured) {
  console.warn(
    '⚠️ Supabase is not configured. Please create a .env file with valid VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
  )
}

// Create client with fallback placeholder URL to prevent crash
export const supabase = createClient(
  supabaseUrl && supabaseUrl !== 'your_supabase_project_url'
    ? supabaseUrl
    : 'https://placeholder.supabase.co',
  supabaseAnonKey && supabaseAnonKey !== 'your_supabase_anon_key'
    ? supabaseAnonKey
    : 'placeholder-key'
)
