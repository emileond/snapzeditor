import { createClient } from '@supabase/supabase-js'
import Replicate from 'replicate'
const replicate = new Replicate()

export async function onRequestPost(request, context) {
  const MODEL_ID =
    '8a89b0ab59a050244a751b6475d91041a8582ba33692ae6fab65e0c51b700328'

  const license_key = request.body.license_key
  const image = request.body.image
  const prompt = request.body.prompt
  const num_samples = request.body.num_samples
  const negative_prompt = request.body.negative_prompt

  const supabaseUrl = context.env.VITE_SUPABASE_URL
  const replicateApiToken = context.env.REPLICATE_API_TOKEN

  const getServiceSupabase = () =>
    createClient(supabaseUrl, context.env.SUPABASE_SERVICE_KEY)

  const supabase = getServiceSupabase()

  const prediction = await replicate.predictions.create({
    version: MODEL_ID,
    input: {
      image,
      prompt,
      negative_prompt,
      num_samples,
    },
  })

  const latest = await replicate.predictions.getLatest(prediction.id)

  let completed
  for (let i = 0; i < 5; i++) {
    const latest = await replicate.predictions.get(prediction.id)
    if (latest.status !== 'starting' && latest.status !== 'processing') {
      completed = latest
      break
    }
    // Wait for 2 seconds and then try again.
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  // return completed.output
  return new Response(completed.output)
}
