import { createClient } from '@supabase/supabase-js'

export async function onRequestPost(context) {
  // Parse request body
  const { license_key, instance_name, device_id, user_id, user_email } =
    await context.request.json()

  // Logging information in Cloudflare (console.log can be viewed in Wrangler tail)
  console.log(license_key, instance_name, device_id, user_id, user_email)

  // Initialize Supabase client
  const SUPABASE_URL = context.env.VITE_SUPABASE_URL
  const SUPABASE_SERVICE_KEY = context.env.SUPABASE_SERVICE_KEY
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

  // Step 2: Check the license key in the Supabase database
  const { data: licenseData, error: licenseError } = await supabase
    .from('viededingue_licenses')
    .select('*')
    .eq('license_key', license_key)
    .is('is_refunded', false)
    .single()

  if (licenseError || !licenseData) {
    console.error(licenseError)
    return new Response(
      JSON.stringify({ error: 'Invalid or refunded license' })
    )
  }

  // Step 3: Update the license if it is not redeemed
  if (!licenseData.is_redeemed) {
    const { error: redeemError } = await supabase
      .from('viededingue_licenses')
      .update({ is_redeemed: true, user_email, user_id })
      .match({ license_key })

    if (redeemError) {
      return new Response(JSON.stringify({ error: redeemError.message }))
    }
  }

  // Step 4: Manage AI Credits
  const variant_name = licenseData.license_type
  let ai_credits = 500 // default credits
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
        vendor: 'viededingue',
      })

    if (newLicenseCreditsError) {
      return new Response(
        JSON.stringify({ error: newLicenseCreditsError.message })
      )
    }
  }

  // Step 5: Check and insert license instance
  const { data: existingInstances, error: instancesError } = await supabase
    .from('license_instances')
    .select('*', { count: 'exact' })
    .eq('license_key', license_key)
    .eq('status', 'active')

  if (instancesError) {
    return new Response(JSON.stringify({ error: instancesError.message }))
  }

  if (existingInstances.length >= licenseData.activation_limit) {
    return new Response(JSON.stringify({ error: 'Activation limit reached' }))
  }

  // Generate a unique instance ID using Web Crypto API
  const instance_id = crypto.randomUUID()

  // Insert new license instance
  const { error: insertError } = await supabase
    .from('license_instances')
    .insert([
      {
        license_key,
        instance_name,
        instance_id,
        status: 'active',
        user_id,
        device_id,
        activation_limit: licenseData.activation_limit,
        vendor: 'viededingue',
      },
    ])

  if (insertError) {
    return new Response(JSON.stringify({ error: insertError.message }))
  }

  return new Response(JSON.stringify({ activated: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
