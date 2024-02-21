import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const getServiceSupabase = () =>
  createClient(supabaseUrl, import.meta.env.SUPABASE_SERVICE_KEY)
