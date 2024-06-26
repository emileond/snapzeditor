import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Divider,
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
import { PiCaretDownBold } from 'react-icons/pi'

function ActivateLicenseModal({ isOpen, onOpenChange }) {
  const { license } = useLicense()
  const { checkLicense } = useCheckLicense()
  const {
    register,
    reset,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const url = '/api/activate-license'
  const viededingueUrl = '/api/activate-viededingue-license'

  const [activationError, setActivationError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [marketplace, setMarketplace] = useState(null)

  const deviceName = useDeviceName()
  const fingerprint = useFingerprint()
  const user = useUser()

  useEffect(() => {
    if (isOpen && user && fingerprint) {
      if (license.isLicensed) {
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.6 },
        })
      }
    }
  }, [isOpen, license, user, fingerprint])

  const onSubmit = async (data) => {
    setIsLoading(true)

    try {
      const response = await axios.post(
        marketplace === 'VieDeDingue' ? viededingueUrl : url,
        {
          license_key: data.licenseKey,
          instance_name: deviceName,
          device_id: fingerprint,
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

      if (response?.data?.error) {
        setIsLoading(false)
        setActivationError(response.data)
      }
      if (response?.data?.activated) {
        setIsLoading(false)
        toast.success('License activated successfully')
        checkLicense(user, fingerprint)
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
          {license?.isLicensed ? '' : 'Activate license'}
        </ModalHeader>
        <ModalBody className="pb-6">
          {license?.isLicensed ? (
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">
                Thanks for your purchase 🎉
              </h3>
              <p className="text-default-600 ">
                Congratulations! Your license has been successfully activated.
                You now have full access to all Pro features.
              </p>
              <Divider />
              <p className="text-default-700 text-sm font-semibold mt-2">
                Here&apos;s what you need to know:
              </p>
              <ul className="list-disc pl-4 flex flex-col gap-3">
                <li className="text-default-700 text-sm">
                  When you login on another device/app, your license will
                  automatically be activated.
                </li>
                <li className="text-default-700 text-sm">
                  You can view and manage your activated devices anytime, from
                  the License Manager.
                </li>
                <li className="text-default-700 text-sm">
                  If you need help, please send an email to: &nbsp;
                  <a href="mailto:hello@snapseditor.com">
                    hello@snapseditor.com
                  </a>
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
                  autoComplete="off"
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
                    required: 'License key is required',
                    shouldUnregister: true,
                  })}
                />
                <div className="flex gap-2 items-center justify-between">
                  <Dropdown className="dark">
                    <DropdownTrigger>
                      <Button
                        variant="light"
                        className="text-default-600"
                        endContent={
                          <PiCaretDownBold className="text-default-600" />
                        }
                      >
                        {marketplace ? marketplace : 'Marketplace'}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      className="dark"
                      selectionMode="single"
                      selectedKeys={[marketplace]}
                      onAction={(selected) => {
                        selected === 'none'
                          ? setMarketplace(null)
                          : setMarketplace(selected)
                      }}
                    >
                      <DropdownItem key="none">None</DropdownItem>
                      <DropdownItem key="VieDeDingue">VieDeDingue</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
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
              </div>
            </form>
          )}
        </ModalBody>
        <ModalFooter>
          {license?.isLicensed ? (
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
