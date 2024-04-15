import { supabase } from '../supabaseClient'
import { useLicense } from '../context/LicenseContext'
import axios from 'axios'
import useDeviceName from '../hooks/useDeviceName'

export const useCheckLicense = () => {
  const { updateLicenseStatus } = useLicense()
  const deviceName = useDeviceName()

  const activateLicense = async (
    licenseKey,
    instanceName,
    deviceId,
    user,
    vendor
  ) => {
    const url = '/api/activate-license'
    const viededingueUrl = '/api/activate-viededingue-license'

    const response = await axios.post(
      vendor === 'viededingue' ? viededingueUrl : url,
      {
        license_key: licenseKey,
        instance_name: deviceName,
        device_id: deviceId,
        user_id: user.id,
        user_email: user.email,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
    if (response.data.error) {
      console.error('Activation failed:', response.data.error)
      return false
    }

    if (response.data.activated) {
      return true
    }
  }

  const checkLicense = async (user, fingerPrint) => {
    // Check the user's license status from the database
    const { data, error } = await supabase
      .from('license_instances')
      .select('*')
      .eq('user_id', user.id)
      // .eq('device_id', fingerPrint)
      .eq('status', 'active')
    // .single()

    if (!data || error) {
      updateLicenseStatus(false)
      console.error('Error fetching license:', error)
    }

    const { activation_limit, license_key, vendor } = data[0]

    // filter array to see if there is a license for the current device
    const deviceLicense = data.find(
      (license) => license.device_id === fingerPrint
    )
    const hasAvailableSlots = data.length < (activation_limit || 0)

    // if there's no license for the current device, check if the license key has available slots
    if (!deviceLicense && hasAvailableSlots) {
      const activationSuccess = await activateLicense(
        license_key,
        'deviceName',
        fingerPrint,
        user,
        vendor
      )

      if (!activationSuccess) {
        updateLicenseStatus(false)
        return false
      }

      if (activationSuccess) {
        updateLicenseStatus(true, deviceLicense)
        return true
      }
    }

    // Update the context based on whether a valid license instance is found
    const isLicensed = deviceLicense ? true : false

    return updateLicenseStatus({ isLicensed, deviceLicense })
  }

  return { checkLicense }
}
