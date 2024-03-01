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

function LicenseManager({ isOpen, onOpenChange }) {
  const user = useUser()
  const [licenseInstances, setLicenseInstances] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [deactivateId, setDeactivateId] = useState()

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
      return
    }
    setLicenseInstances(data)
    setIsFetching(false)
  }

  //TODO: create a function to deactivate a license, and api endpoint to handle it
  //TODO: save slots data on activation and group instances by license

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
                    {licenseInstances.map((license, index) => (
                      <>
                        <div
                          key={license.id}
                          className="flex gap-2 justify-between items-center"
                        >
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1">
                              <p className="text-md">{license.instance_name}</p>
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
                              deactivateId === license.id && isConfirmationOpen
                            }
                            onOpenChange={(open) => setIsConfirmationOpen(open)}
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
                                    onClick={() => {
                                      setDeactivateId(null)
                                      setIsConfirmationOpen(false)
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button size="sm" color="danger">
                                    Deactivate
                                  </Button>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                        {index !== licenseInstances.length - 1 && <Divider />}
                      </>
                    ))}
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
