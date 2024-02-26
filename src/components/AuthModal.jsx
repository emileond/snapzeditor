import { Modal, ModalBody, ModalContent } from '@nextui-org/react'
import AuthForm from './AuthForm.jsx'

function AuthModal({ isOpen, onOpenChange, view }) {
  return (
    <Modal className="dark" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalBody>
          <AuthForm viewMode={view} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AuthModal
