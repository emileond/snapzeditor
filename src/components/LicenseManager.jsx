import {
  Button,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useUser } from '@supabase/auth-helpers-react'
import { useFingerprint } from '../context/FingerprintContext'
import axios from 'axios'
import { displayToast } from '../utils/displayToast'

function LicenseManager({ isOpen, onOpenChange }) {
  const user = useUser()
  const fingerprint = useFingerprint()
  const [licenseInstances, setLicenseInstances] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [deactivateId, setDeactivateId] = useState()
  const [isLoading, setIsLoading] = useState(false)

  // get license from supabase
  async function getLicense() {
    setIsFetching(true)
    const { data, error } = await supabase
      .from('license_instances')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
    if (error) {
      setIsFetching(false)
      console.error(error)
      displayToast('error', 'An error occurredm, please try again later.')
      return
    }
    setLicenseInstances(data)
    setIsFetching(false)
    return
  }

  const baseUrl =
    'https://snapseditor-main-e4a52d7.d2.zuplo.dev/licenses/deactivate'

  const viededingueUrl =
    'https://snapseditor-main-e4a52d7.d2.zuplo.dev/licenses/viededingue/deactivate'

  const handleDeactivate = async (license_key, instance_id, vendor) => {
    setIsLoading(true)
    let url = ''
    switch (vendor) {
      case 'viededingue':
        url = viededingueUrl
        break
      default:
        url = baseUrl
    }

    try {
      const response = await axios.post(
        url,
        {
          license_key,
          instance_id,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
      if (response?.data?.deactivated) {
        displayToast('success', 'Device deactivated.')
        await getLicense()
      }
    } catch (error) {
      console.error(error)
      displayToast('error', 'An error occurred, please try again later.')
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (isOpen && user) {
      getLicense()
    }
  }, [isOpen, user])

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="dark"
        size="2xl"
      >
        <ModalContent>
          <ModalHeader>
            <div className="flex flex-col items-start gap-1">
              <h2 className="text-xl font-bold ">License manager</h2>
              <p className="text-default-500 text-sm mb-4">
                Deactivate a license seat to free up space for another device.
              </p>
            </div>
          </ModalHeader>
          <ModalBody>
            {licenseInstances.length === 0 && !isFetching ? (
              <p>No licenses found.</p>
            ) : (
              <div>
                {isFetching ? (
                  <div className="flex justify-center items-center">
                    <Spinner />
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {Object.entries(
                      licenseInstances.reduce((acc, license) => {
                        if (!acc[license.license_key]) {
                          acc[license.license_key] = {
                            licenses: [],
                            activation_usage: license.activation_usage,
                            activation_limit: license.activation_limit,
                          }
                        }
                        acc[license.license_key].licenses.push(license)
                        return acc
                      }, {})
                    ).map(
                      ([key, { licenses, activation_limit }], groupIndex) => (
                        <div key={key} className="flex flex-col gap-4">
                          <div className="flex items-center gap-2 justify-between">
                            <h4 className="text-default-400 text-md font-medium">
                              License:{' '}
                              {
                                // show only the first 5 characters of the license key, everything else with *
                                key.slice(0, 5) + '*'.repeat(key.length * 0.4)
                              }
                            </h4>
                            <Chip variant="bordered" size="sm">
                              {licenses.length}/{activation_limit} used
                            </Chip>
                          </div>
                          {licenses.map((license) => (
                            <div
                              key={license.id}
                              className="flex gap-3 justify-between items-center"
                            >
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-1">
                                  <p className="text-md">
                                    {license.instance_name}
                                    {license.device_id === fingerprint &&
                                      ' (this device)'}
                                  </p>
                                  <Chip
                                    color="success"
                                    size="sm"
                                    variant="dot"
                                    className="border-none"
                                  />
                                </div>
                                <p className="text-sm text-default-500">
                                  Activated on{' '}
                                  {new Date(
                                    license.created_at
                                  ).toLocaleDateString()}{' '}
                                  -{' '}
                                  {new Date(
                                    license.created_at
                                  ).toLocaleTimeString()}
                                </p>
                              </div>
                              <Popover
                                className="dark"
                                placement="bottom-end"
                                isOpen={
                                  deactivateId === license.id &&
                                  isConfirmationOpen
                                }
                                onOpenChange={(open) => {
                                  open
                                    ? setIsConfirmationOpen(open)
                                    : setDeactivateId(null)
                                }}
                              >
                                <PopoverTrigger>
                                  <Button
                                    size="sm"
                                    variant="solid"
                                    onClick={() => {
                                      setDeactivateId(license.id)
                                    }}
                                  >
                                    Deactivate
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                  <div className="flex flex-col gap-4 p-2">
                                    <h4>Deactivate device</h4>
                                    <p>
                                      Are you sure you want to deactivate this
                                      device?
                                    </p>
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        isDisabled={isLoading}
                                        onClick={() => {
                                          setDeactivateId(null)
                                          setIsConfirmationOpen(false)
                                        }}
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        size="sm"
                                        color="danger"
                                        isLoading={isLoading}
                                        onClick={() =>
                                          handleDeactivate(
                                            key,
                                            license.instance_id,
                                            license.vendor
                                          )
                                        }
                                      >
                                        Deactivate
                                      </Button>
                                    </div>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            </div>
                          ))}
                          {groupIndex !==
                            Object.entries(licenseInstances).length - 1 && (
                            <Divider />
                          )}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            )}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LicenseManager
