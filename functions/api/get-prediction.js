import Replicate from 'replicate'
import { createClient } from '@supabase/supabase-js'

export async function onRequestGet(context) {
  // Extract the prediction_id from the query parameters
  const url = new URL(context.request.url)
  const prediction_id = url.searchParams.get('prediction_id')
  const license_key = url.searchParams.get('license_key')
  const supabaseUrl = context.env.VITE_SUPABASE_URL

  if (!prediction_id) {
    return new Response(
      JSON.stringify({ error: 'prediction_id is required' }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }

  const replicateApiToken = context.env.REPLICATE_API_TOKEN
  const replicate = new Replicate({
    auth: replicateApiToken,
  })

  const prediction = await replicate.predictions.get(prediction_id)

  if (prediction.status === 'failed') {
    const getServiceSupabase = () =>
      createClient(supabaseUrl, context.env.SUPABASE_SERVICE_KEY)

    // refund the credits to the license
    const supabase = getServiceSupabase()
    const requiredCredits = prediction.input.num_samples * 4

    const { error } = await supabase.rpc('increment_balance', {
      increment_by: requiredCredits,
      p_license_key: license_key,
    })

    if (error) {
      return new Response(JSON.stringify({ error: error.message }))
    }
  }

  // Return the prediction result as JSON
  return new Response(JSON.stringify(prediction), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
