import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Link,
} from '@nextui-org/react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import AuthModal from './AuthModal'
import { PiBarcode, PiCrownSimple, PiPower, PiUser } from 'react-icons/pi'
import toast from 'react-hot-toast'
import ActivateLicenseModal from './ActivateLicenseModal'
import { useLicense } from '../context/LicenseContext'
import ChipPro from './ChipPro'

function UserMenu() {
  const user = useUser()
  const supabaseClient = useSupabaseClient()
  const [openAuthModal, setOpenAuthModal] = useState(false)
  const [authViewMode, setAuthViewMode] = useState()
  const [openLicenseModal, setOpenLicenseModal] = useState(false)
  const { isLicensed } = useLicense()

  const iconClasses =
    'text-xl text-default-500 pointer-events-none flex-shrink-0'

  const handleSignOut = () => {
    supabaseClient.auth.signOut()
    toast.success('Signed out successfully')
  }

  if (user) {
    return (
      <>
        <Dropdown className="dark">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              src={user.user_metadata.avatar_url}
            />
          </DropdownTrigger>
          <DropdownMenu variant="flat" aria-label="User menu">
            <DropdownSection>
              <DropdownItem
                isReadOnly
                className="text-default-500 hover:cursor-default py-3"
                endContent={isLicensed && <ChipPro />}
              >
                {user.email}
              </DropdownItem>
            </DropdownSection>
            <DropdownItem
              isReadOnly
              href="https://snapseditor.lemonsqueezy.com/checkout/buy/9aadbed6-2db0-4f45-b0a1-2bd86bbc8955?media=0"
              target="_blank"
              rel="noopener noreferrer"
              variant="shadow"
              color="primary"
              startContent={<PiCrownSimple className={iconClasses} />}
              className="text-white bg-primary hover:text-white py-2"
            >
              Purchase license
            </DropdownItem>
            <DropdownItem
              className="py-2"
              startContent={<PiBarcode className={iconClasses} />}
              onClick={() => setOpenLicenseModal(true)}
            >
              Activate license
            </DropdownItem>
            <DropdownItem
              className="py-2"
              startContent={<PiUser className={iconClasses} />}
              // onClick={handleSignOut}
            >
              Account
            </DropdownItem>
            <DropdownItem
              className="py-2"
              startContent={<PiPower className={iconClasses} />}
              onClick={handleSignOut}
            >
              Sign out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <ActivateLicenseModal
          isOpen={openLicenseModal}
          onOpenChange={() => setOpenLicenseModal(false)}
        />
      </>
    )
  }

  return (
    <>
      <Button
        variant="light"
        onClick={() => {
          setOpenAuthModal(true)
          setAuthViewMode('login')
        }}
      >
        Login
      </Button>
      <Button
        color="secondary"
        variant="solid"
        onClick={() => {
          setOpenAuthModal(true)
          setAuthViewMode('signup')
        }}
      >
        Sign up
      </Button>
      <AuthModal
        view={authViewMode}
        isOpen={openAuthModal}
        onOpenChange={() => setOpenAuthModal(false)}
      />
    </>
  )
}

export default UserMenu
