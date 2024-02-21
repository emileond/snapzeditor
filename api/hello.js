import { getServiceSupabase } from "../src/supabaseClient"}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*') // Adjust as needed for security

  const supabase = getServiceSupabase()

  const { data, error } = await supabase.from('users').select('*')

  if (error) {
    console.error(error)
    return res.status(500).json(error)
  }

  return res.status(200).json(data)
}
