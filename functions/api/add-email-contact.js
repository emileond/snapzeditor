export async function onRequestPost(context) {
  // Parse the request body to get the email
  const {
    record: { email },
  } = await context.request.json()

  // Configuration for the Mailbluster API
  const mailblusterEndpoint = 'https://api.mailbluster.com/api/leads'
  const mailblusterApiKey = context.env.MAILBLUSTER_API_KEY // Use environment variable in Cloudflare
  const requestBody = {
    email: email,
    subscribed: true,
  }

  try {
    const response = await fetch(mailblusterEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${mailblusterApiKey}`, // Ensure the Authorization header is properly set
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Check if the lead was successfully added
    if (data.message === 'Lead added') {
      return new Response('Lead added successfully')
    } else {
      // Handle cases where the API response is not as expected
      console.error(`Mailbluster API unexpected response: ${data.message}`)
      return new Response('An error occurred', { status: 500 })
    }
  } catch (error) {
    // Log and handle any errors that occur during the fetch request
    console.error(
      `Error in sending request to Mailbluster API: ${error.message}`
    )
    return new Response('An error occurred', { status: 500 })
  }
}
