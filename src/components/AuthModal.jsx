import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../supabaseClient.js'

function AuthModal({ isOpen, onOpenChange }) {
  const clientUrl = import.meta.env.VITE_CLIENT_URL
  const customTheme = {
    ...ThemeSupa,
    dark: {
      colors: {
        brand: 'rgb(148, 85, 211)',
        brandAccent: 'rgb(148, 85, 211)',
        brandButtonText: 'white',
        defaultButtonBackground: '#2e2e2e',
        defaultButtonBackgroundHover: '#3e3e3e',
        defaultButtonBorder: '#3e3e3e',
        defaultButtonText: 'white',
        dividerBackground: '#2e2e2e',
        inputBackground: '#1e1e1e',
        inputBorder: '#3e3e3e',
        inputBorderHover: 'gray',
        inputBorderFocus: 'gray',
        inputLabelText: 'lightgray',
        inputText: 'white',
        inputPlaceholder: 'darkgray',
        anchorTextColor: '#66AAF9',
        anchorTextHoverColor: '#338EF7',
      },
    },
  }
  return (
    <Modal className="dark" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-2xl">Login to Snapseditor</h2>
          <p className="text-sm text-default-500">
            Access your saved projects from anywhere
          </p>
        </ModalHeader>

        <ModalBody>
          <Auth
            supabaseClient={supabase}
            appearance={{
              extend: true,
              theme: customTheme,
            }}
            providers={['google']}
            theme="dark"
            onlyThirdPartyProviders
            redirectTo={`${clientUrl}/app`}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AuthModal
