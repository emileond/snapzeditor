import {
  Button,
  Input,
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

function ActivateLicenseModal({ isOpen, onOpenChange }) {
  const {
    register,
    reset,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const activateUrl = 'https://api.lemonsqueezy.com/v1/licenses/activate'

  const [activationError, setActivationError] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await axios.post(
        activateUrl,
        { license_key: data.licenseKey, instance_name: 'snapseditor' },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
      console.log(response)
      if (response.status === 200) {
        setIsLoading(false)
        toast.success('License activated successfully')
        onOpenChange(true)
      }
    } catch (error) {
      setIsLoading(false)
      console.error('Error:', error.response)
      setActivationError({ error: error.response.data.error })
      toast.error(error.response.data.error)
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
          Activate license
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 w-full">
              <p className="text-sm text-default-500">
                Your license key can be found in your email after purchasing the
                license.
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
        </ModalBody>
        <ModalFooter>
          <div className="flex gap-2 items-center py-4">
            <span className="text-sm text-default-500">
              Don&apos;t have a license key?
            </span>
            <Button variant="light" color="warning">
              Purchase license
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ActivateLicenseModal
