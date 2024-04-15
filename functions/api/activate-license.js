import { createClient } from '@supabase/supabase-js'

export async function onRequestPost(context) {
  // Extract JSON payload from the request
  const { license_key, instance_name, device_id, user_id } =
    await context.request.json()

  // Initialize Supabase client
  const SUPABASE_URL = context.env.VITE_SUPABASE_URL
  const SUPABASE_SERVICE_KEY = context.env.SUPABASE_SERVICE_KEY
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

  // Make a post request to Lemonsqueezy to activate the license
  const activationResponse = await fetch(
    'https://api.lemonsqueezy.com/v1/licenses/activate',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ license_key, instance_name }),
    }
  )
  const activation = await activationResponse.json()

  // Handle activation errors
  if (activation.error) {
    return new Response(JSON.stringify(activation))
  }

  if (activation.activated) {
    const instance_id = activation.instance.id
    const created_at = activation.instance.created_at
    const activation_limit = activation.license_key.activation_limit

    // Determine AI credits based on the variant name
    let ai_credits = 500 // default
    const variant_name = activation.meta.variant_name
    switch (variant_name.toLowerCase()) {
      case 'personal':
        ai_credits = 500
        break
      case 'standard':
        ai_credits = 1750
        break
      case 'extended':
        ai_credits = 3250
        break
      case 'team':
        ai_credits = 7500
        break
    }

    // Check existing credits or insert new record
    const { data: licenseCredits, error: licenseCreditsError } = await supabase
      .from('license_ai_credits')
      .select('*')
      .eq('license_key', license_key)
      .single()

    if (!licenseCredits) {
      const { data: newLicenseCredits, error: newLicenseCreditsError } =
        await supabase.from('license_ai_credits').insert({
          license_key,
          balance: ai_credits,
          status: 'active',
          vendor: 'lemonsqueezy',
        })

      if (newLicenseCreditsError) {
        return new Response(
          JSON.stringify({ error: newLicenseCreditsError.message })
        )
      }
    }

    // Insert license instance details
    const { data: license, error } = await supabase
      .from('license_instances')
      .insert([
        {
          license_key,
          instance_name,
          instance_id,
          status: 'active',
          user_id,
          device_id,
          activation_limit,
          created_at,
          vendor: 'lemonsqueezy',
        },
      ])

    if (error) {
      return new Response(JSON.stringify({ error: error.message }))
    }

    // Return success response
    return new Response(JSON.stringify({ activated: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
