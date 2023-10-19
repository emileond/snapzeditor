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

export default function Layout({ children }) {
  return (
    <>
      <Navbar
        className="dark bg-background/8"
        maxWidth="2xl"
        shouldHideOnScroll
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <img
              src="/snapzeditor-logo-w.svg"
              alt="SnapzEditor Logo"
              className="w-[140px]"
            />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            <img
              src="/snapzeditor-logo-w.svg"
              alt="SnapzEditor Logo"
              className="w-[140px]"
            />
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
            <Button as={Link} href="#" variant="light">
              Login
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="secondary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      {/* <header className="w-full flex justify-center bg-background py-4"></header> */}
      <main className="dark text-foreground w-[100vw] h-[100vh]">
        {/* Illustration */}
        <div className="grow">
          <div
            className="hidden md:block absolute  left-1/2 

            transform -translate-x-1/3
          
          pointer-events-none -z-10 w-full"
            aria-hidden="true"
          >
            <Image
              src={Illustration}
              className="max-w-none w-full"
              priority
              alt="Hero Illustration"
            />
          </div>
        </div>

        {children}
      </main>
    </>
  )
}
