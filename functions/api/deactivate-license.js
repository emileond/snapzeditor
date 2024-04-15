import { createClient } from '@supabase/supabase-js'

export async function onRequestPost(context) {
  // Parse request body
  const { license_key, instance_id } = await context.request.json()

  // Perform a POST request to Lemonsqueezy to deactivate the license
  const response = await fetch(
    'https://api.lemonsqueezy.com/v1/licenses/deactivate',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ license_key, instance_id }),
    }
  )
  const deactivation = await response.json()

  // Log deactivation response (viewable via Wrangler tail or similar tools)
  console.log(deactivation)

  // Check for deactivation success
  if (deactivation.error) {
    return new Response(JSON.stringify(deactivation))
  }

  if (deactivation.deactivated) {
    // Initialize Supabase client
    const SUPABASE_URL = context.env.VITE_SUPABASE_URL
    const SUPABASE_SERVICE_KEY = context.env.SUPABASE_SERVICE_KEY
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

    // Update the status of the license in Supabase to "deactivated"
    const { data: license, error } = await supabase
      .from('license_instances')
      .update({ status: 'deactivated' })
      .match({ license_key, instance_id })

    if (error) {
      return new Response(JSON.stringify({ error: error.message }))
    }

    // Respond with deactivation success
    return new Response(JSON.stringify({ deactivated: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
