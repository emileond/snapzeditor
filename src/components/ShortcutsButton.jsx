import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Kbd,
  useDisclosure,
} from '@nextui-org/react'

function ShortcutsButton() {
  const { isOpen, onOpenChange } = useDisclosure()

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="dark">
      <ModalContent>
        <ModalHeader>Shortcuts</ModalHeader>
        <ModalBody className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Kbd>del</Kbd>
            <span className="text-default-500">Delete selected shape</span>
          </div>
          <div className="flex gap-2">
            <Kbd> esc</Kbd>
            <span className="text-default-500">Deselect all shapes</span>
          </div>
          <div className="flex gap-2">
            <Kbd>shift</Kbd>
            <span className="text-default-500">
              Hold to scale proportionally
            </span>
          </div>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}

export default ShortcutsButton
