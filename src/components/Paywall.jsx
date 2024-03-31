import {
  Button,
  Card,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Link,
} from '@nextui-org/react'
import { PiCheckCircleBold, PiCrownSimpleBold } from 'react-icons/pi'
import ChipPro from './ChipPro'
import axios from 'axios'

function Paywall({ isOpen, onOpenChange }) {
  async function getHelloWorld() {
    const response = await axios.get('/api/helloworld')

    return response.data
  }

  getHelloWorld().then((response) => {
    console.log(response)
  })

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="dark">
      <ModalContent>
        <ModalHeader className="pt-6">
          <h2 className="text-2xl font-bold ">
            Unlock Lifetime Access to SnapsEditor <ChipPro />
          </h2>
        </ModalHeader>
        <ModalBody className="py-4">
          <p className="mb-4 text-gray-200">
            Enjoy all premium features and future updates with a one-time
            purchase.
          </p>
          <Card>
            <div className="flex flex-col gap-4 p-4">
              <div className="flex gap-3">
                <div>
                  <PiCheckCircleBold
                    className="text-success-500"
                    fontSize="1.4rem"
                  />
                </div>
                <div>
                  <h4 className="font-bold">One-time purchase</h4>
                  <p className="text-gray-400">
                    No subscriptions. Pay once, enjoy forever.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div>
                  <PiCheckCircleBold
                    className="text-success-500"
                    fontSize="1.4rem"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Unlimited access</h4>
                  <p className="text-gray-400">
                    Unlock all PRO features and elevate your snapshots.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div>
                  <PiCheckCircleBold
                    className="text-success-500"
                    fontSize="1.4rem"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Cloud storage</h4>
                  <p className="text-gray-400">
                    Save your screenshots in the cloud for easy access and
                    sharing.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div>
                  <PiCheckCircleBold
                    className="text-success-500"
                    fontSize="1.4rem"
                  />
                </div>
                <div>
                  <h4 className="font-bold">All future updates</h4>
                  <p className="text-gray-400">
                    Get access to all future updates.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </ModalBody>
        <ModalFooter>
          <div className="flex flex-col gap-4 w-full">
            <Button
              className="hover:text-white"
              as={Link}
              href="https://snapseditor.lemonsqueezy.com/checkout/buy/9aadbed6-2db0-4f45-b0a1-2bd86bbc8955?media=0"
              isExternal
              color="secondary"
              variant="shadow"
              fullWidth
              startContent={<PiCrownSimpleBold fontSize="1.1rem" />}
            >
              Unlock PRO Now
            </Button>
            <Button
              variant="flat"
              onClick={() => {
                onOpenChange()
              }}
            >
              Maybe later
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default Paywall
