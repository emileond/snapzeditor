/* eslint-disable react/prop-types */
import {
  Button,
  Image,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarItem,
} from '@nextui-org/react'
import Illustration from '/images/hero-illustration.svg'
import UserMenu from './UserMenu'
import { useUser } from '@supabase/auth-helpers-react'

export default function Layout({ children }) {
  const user = useUser()
  return (
    <>
      <Navbar
        className="dark bg-[rgb(15,23,42)]"
        maxWidth="2xl"
        shouldHideOnScroll
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <Image src="/snapzeditor-icon.svg" width={32} height={32} />
            <h4 className="ml-2 font-bold">Snapseditor</h4>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            <Image src="/snapzeditor-icon.svg" width={32} height={32} />
            <h4 className="ml-2 font-bold">Snapseditor</h4>
          </NavbarBrand>
          <NavbarItem>
            <Link href="/#features" color="foreground">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/#download" color="foreground">
              Download
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/#pricing" color="foreground">
              Pricing
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            {user && (
              <Button
                variant="shadow"
                color="primary"
                size="sm"
                onClick={() => {
                  window.location.href = '/app'
                }}
              >
                Go to app
              </Button>
            )}
          </NavbarItem>
          <UserMenu />
        </NavbarContent>
      </Navbar>
      {/* <header className="w-full flex justify-center bg-background py-4"></header> */}
      <main className="flex flex-col items-center dark text-foreground w-[100vw] h-[100vh] bg-[rgb(15,23,42)]">
        {/* Set Illustration as background */}
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{ opacity: 0.8 }}
        >
          <img
            src={Illustration}
            className="object-cover w-full h-120 opacity-50"
            // alt="Illustration"
          />
        </div>

        {children}
      </main>
    </>
  )
}
