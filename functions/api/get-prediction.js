import Replicate from 'replicate'

export async function onRequestGet(context) {
  // Extract the prediction_id from the query parameters
  const url = new URL(context.request.url)
  const prediction_id = url.searchParams.get('prediction_id')

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

  // Return the prediction result as JSON
  return new Response(JSON.stringify(prediction), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
