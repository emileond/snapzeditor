import { createClient } from '@supabase/supabase-js'

export async function onRequest(context) {
  const supabaseUrl = context.env.VITE_SUPABASE_URL

  const getServiceSupabase = () =>
    createClient(supabaseUrl, context.env.SUPABASE_SERVICE_KEY)

  const supabase = getServiceSupabase()

  const { data, error } = await supabase
    .from('users')
    .select('id, email')
    .eq('email', 'sonarart@gmail.com')
  console.log(data)

  console.log(context)
  return new Response('Hello, world!')
}
