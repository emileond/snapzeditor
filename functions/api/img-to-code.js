import { createClient } from '@supabase/supabase-js'
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime'
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

  const client = new BedrockRuntimeClient({
    region: 'us-west-2',
    credentials: {
      accessKeyId: context.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: context.env.AWS_SECRET_ACCESS_KEY,
    },
  })

  const input = {
    modelId: 'anthropic.claude-3-sonnet-20240229-v1:0',
    contentType: 'application/json',
    accept: 'application/json',
    body: {
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: [
            // {
            //   "type": "image",
            //   "source": {
            //     "type": "base64",
            //     "media_type": "image/jpeg",
            //     "data": "iVBORw..."
            //   }
            // },
            {
              type: 'text',
              text: 'Hello, tell me a story about a dragon and a knight.',
            },
          ],
        },
      ],
    },
  }

  const command = new InvokeModelCommand(input)
  const response = await client.send(command)

  const completion = JSON.parse(Buffer.from(response.body).toString('utf8'))

  console.log(completion)

  // Deduct the required credits from the license
  //   const { error: creditsError } = await supabase.rpc('decrement_balance', {
  //     decrement_by: requiredCredits,
  //     p_license_key: license_key,
  //   })

  //   if (creditsError) {
  //     return new Response(JSON.stringify({ error: creditsError.message }))
  //   }

  // Return the completion result

  return new Response(JSON.stringify(completion), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
