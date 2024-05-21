import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'
import { Buffer } from 'buffer'

export async function onRequestPost(context) {
  // Extract the JSON payload from the request
  const { image, framework, library, license_key } =
    await context.request.json()

  //   const requiredCredits = 1

  //   const supabaseUrl = context.env.VITE_SUPABASE_URL

  //   const getServiceSupabase = () =>
  //     createClient(supabaseUrl, context.env.SUPABASE_SERVICE_KEY)

  //   const supabase = getServiceSupabase()

  //   const { data, error } = await supabase
  //     .from('license_ai_credits')
  //     .select('balance')
  //     .eq('license_key', license_key)
  //     .eq('status', 'active')
  //     .single()

  //   if (error) {
  //     console.error(error)
  //     return new Response(JSON.stringify({ error: error.message }))
  //   }

  //   // if balance is less than required credits, return an error response
  //   if (data.balance < requiredCredits) {
  //     return new Response(
  //       JSON.stringify({
  //         error: 'Insufficient credits',
  //         requiredCredits,
  //         availableCredits: data.balance,
  //       })
  //     )
  //   }

  const openai = new OpenAI({
    apiKey: context.env.OPENAI_API_KEY,
    baseURL:
      'https://gateway.ai.cloudflare.com/v1/606654cc2bf282f29537dc173f405984/snapseditor/openai',
  })

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content:
          'You are coding assistant, your goal is to help the user write front-end code that follows best practices. Reply with the code only, dont include any comments or extra information.',
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Write a react component for this image, using the latest mui library.',
          },
          {
            type: 'image_url',
            image_url: {
              url: 'https://tailwindui.com/img/category-thumbnails/application-ui/stats.png',
            },
          },
        ],
      },
    ],
  })
  console.log(response.choices[0])

  // Deduct the required credits from the license
  //   const { error: creditsError } = await supabase.rpc('decrement_balance', {
  //     decrement_by: requiredCredits,
  //     p_license_key: license_key,
  //   })

  //   if (creditsError) {
  //     return new Response(JSON.stringify({ error: creditsError.message }))
  //   }

  // Return the completion result

  return new Response(JSON.stringify(response), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
