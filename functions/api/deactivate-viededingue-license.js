import { createClient } from '@supabase/supabase-js'

export async function onRequestPost(context) {
  // Parse request body to get the license key and instance ID
  const { license_key, instance_id } = await context.request.json()

  // Initialize Supabase client with environment variables
  const SUPABASE_URL = context.env.VITE_SUPABASE_URL
  const SUPABASE_SERVICE_KEY = context.env.SUPABASE_SERVICE_KEY
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

  // Attempt to update the status of the license in the Supabase database
  const { data: license, error } = await supabase
    .from('license_instances')
    .update({ status: 'deactivated' })
    .match({ license_key, instance_id })

  // Check for errors and handle them
  if (error) {
    // Log the error and return a corresponding response
    console.error(error)
    return new Response(JSON.stringify({ error: error.message }))
  }

  // If update is successful, respond with success message
  return new Response(JSON.stringify({ deactivated: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
