import { createClient } from '@supabase/supabase-js'
import Replicate from 'replicate'

export async function onRequestPost(context) {
  const MODEL_ID =
    '8a89b0ab59a050244a751b6475d91041a8582ba33692ae6fab65e0c51b700328'

  // Extract the JSON payload from the request
  const { image, prompt, num_samples, negative_prompt, license_key } =
    await context.request.json()

  const requiredCredits = num_samples * 2

  const supabaseUrl = context.env.VITE_SUPABASE_URL

  const getServiceSupabase = () =>
    createClient(supabaseUrl, context.env.SUPABASE_SERVICE_KEY)

  const supabase = getServiceSupabase()

  const { data, error } = await supabase
    .from('license_ai_credits')
    .select('balance')
    .eq('license_key', license_key)
    .eq('status', 'active')
    .single()

  console.log('balance', data)

  const replicateApiToken = context.env.REPLICATE_API_TOKEN
  const replicate = new Replicate({
    auth: replicateApiToken,
  })

  const prediction = await replicate.predictions.create({
    version: MODEL_ID,
    input: {
      image,
      prompt,
      negative_prompt,
      num_samples: parseInt(num_samples),
    },
  })

  // Return the prediction result as JSON
  return new Response(JSON.stringify(prediction), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
