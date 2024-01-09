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

function UserMenu() {
  const user = useUser()
  const supabaseClient = useSupabaseClient()
  const [openAuthModal, setOpenAuthModal] = useState(false)
  const [openLicenseModal, setOpenLicenseModal] = useState(false)

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
          <DropdownMenu variant="flat">
            <DropdownSection>
              <DropdownItem isReadOnly isDisabled>
                {user.email}
              </DropdownItem>
            </DropdownSection>
            <DropdownItem
              href="https://emilio.lemonsqueezy.com/checkout/buy/43989818-785a-45e2-a7bf-652e13d71bd4?checkout[custom][user_id]=123"
              target="_blank"
              rel="noopener noreferrer"
              variant="shadow"
              color="primary"
              startContent={<PiCrownSimple className={iconClasses} />}
              className="text-white bg-primary hover:text-white"
            >
              Purchase license
            </DropdownItem>
            <DropdownItem
              startContent={<PiBarcode className={iconClasses} />}
              onClick={() => setOpenLicenseModal(true)}
            >
              Activate license
            </DropdownItem>
            <DropdownItem
              startContent={<PiUser className={iconClasses} />}
              onClick={handleSignOut}
            >
              Account
            </DropdownItem>
            <DropdownItem
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
        size="small"
        variant="ghost"
        onClick={() => setOpenAuthModal(true)}
      >
        Login / Sign up
      </Button>
      <AuthModal
        isOpen={openAuthModal}
        onOpenChange={() => setOpenAuthModal(false)}
      />
    </>
  )
}

export default UserMenu
