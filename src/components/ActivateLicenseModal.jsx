import {
  Button,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import useDeviceName from '../hooks/useDeviceName'
import { useUser } from '@supabase/auth-helpers-react'
import { useLicense } from '../context/LicenseContext'
import { useFingerprint } from '../context/FingerprintContext'
import { useCheckLicense } from '../hooks/useLicenseCheck'
import confetti from 'canvas-confetti'

function ActivateLicenseModal({ isOpen, onOpenChange }) {
  const { isLicensed } = useLicense()
  const { checkLicense } = useCheckLicense()
  const {
    register,
    reset,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const url = 'https://snapseditor-main-e4a52d7.d2.zuplo.dev/licenses'

  const [activationError, setActivationError] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const deviceName = useDeviceName()
  const fingerprint = useFingerprint()
  const user = useUser()

  useEffect(() => {
    if (isOpen && user && fingerprint) {
      checkLicense(user.id, fingerprint)
      if (isLicensed) {
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.6 },
        })
      }
    }
  }, [isOpen, isLicensed, user, fingerprint])

  const onSubmit = async (data) => {
    setIsLoading(true)

    try {
      const response = await axios.post(
        url,
        {
          license_key: data.licenseKey,
          instance_name: deviceName,
          device_id: fingerprint,
          user_id: user.id,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
      if (response?.data?.error) {
        setIsLoading(false)
        setActivationError(response.data)
      }
      if (response?.data?.activated) {
        setIsLoading(false)
        toast.success('License activated successfully')
        checkLicense(user.id, fingerprint)
      }
    } catch (error) {
      setIsLoading(false)
      setActivationError(error.message)
    }
  }

  // Reset form on open change
  useEffect(() => {
    if (onOpenChange) {
      reset()
      clearErrors()
      setActivationError(null)
    }
  }, [onOpenChange, reset, clearErrors])

  return (
    <Modal
      className="dark"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="xl"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {isLicensed ? '' : 'Activate license'}
        </ModalHeader>
        <ModalBody>
          {isLicensed ? (
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold">
                Thanks for your purchase 🎉
              </h3>
              <p className="text-default-700">
                Your license has been activated, you now have access to all Pro
                features on this device.
              </p>
              <ul className="list-disc pl-4">
                <li className="text-default-500 text-sm pb-3">
                  Use the same license key to activate other devices.
                </li>
                <li className="text-default-500 text-sm">
                  To deactivate a device and activate on another, visit the
                  license manager page.
                </li>
              </ul>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4 w-full">
                <p className="text-default-500">
                  Your license key can be found in your email after purchasing
                  the license.
                </p>
                <Input
                  isInvalid={
                    (errors?.licenseKey && true) ||
                    (activationError?.error && true)
                  }
                  errorMessage={
                    (errors?.licenseKey && 'License key is required') ||
                    activationError?.error
                  }
                  placeholder="License key"
                  {...register('licenseKey', {
                    required: true,
                    message: 'License key is required',
                    shouldUnregister: true,
                  })}
                />
                <div className="flex gap-2 items-center">
                  <Button
                    isLoading={isLoading}
                    type="submit"
                    color="primary"
                    variant="solid"
                  >
                    Activate
                  </Button>
                  <Button
                    isDisabled={isLoading}
                    variant="flat"
                    onClick={() => onOpenChange(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          )}
        </ModalBody>
        <ModalFooter>
          {isLicensed ? (
            <Button
              onClick={() => onOpenChange(false)}
              variant="solid"
              color="secondary"
              fullWidth
            >
              Continue to editor
            </Button>
          ) : (
            <div className="flex gap-4 items-center py-4">
              <span className="text-sm text-default-500">
                Don&apos;t have a license key?
              </span>
              <Link
                size="sm"
                href="https://snapseditor.lemonsqueezy.com/checkout/buy/9aadbed6-2db0-4f45-b0a1-2bd86bbc8955?media=0"
                isExternal
                showAnchorIcon
                color="warning"
              >
                Purchase a license
              </Link>
            </div>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ActivateLicenseModal
