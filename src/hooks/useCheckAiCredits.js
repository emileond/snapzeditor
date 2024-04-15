import { supabase } from '../supabaseClient'

export const useCheckAiCredits = () => {
  const checkAiCredits = async (licenseKey) => {
    try {
      const { data, error } = await supabase
        .from('license_ai_credits')
        .select('balance')
        .eq('license_key', licenseKey)
        .eq('status', 'active')
        .single()

      if (error) {
        console.error('Error fetching AI credits:', error)

        return { valid: false, balance: 0 }
      }

      if (data) {
        return { valid: true, balance: data.balance }
      } else {
        return { valid: false, balance: 0 }
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error)

      return { valid: false, balance: 0 }
    }
  }

  return { checkAiCredits }
}
