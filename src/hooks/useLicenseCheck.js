import { supabase } from '../supabaseClient'
import { useLicense } from '../context/LicenseContext'

export const useCheckLicense = () => {
  const { updateLicenseStatus } = useLicense()

  const checkLicense = async (userId, fingerPrint) => {
    // Check the user's license status from the database
    const { data, error } = await supabase
      .from('license_instances')
      .select('*')
      .eq('user_id', userId)
      .eq('device_id', fingerPrint)
      .eq('status', 'active')
      .single()

    if (!data || error) {
      updateLicenseStatus(false)
      console.error('Error fetching license:', error)
    }

    // Update the context based on whether a valid license instance is found
    const isUserLicensed = !!data
    updateLicenseStatus(isUserLicensed)

    return isUserLicensed
  }

  return { checkLicense }
}
