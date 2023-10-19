/* eslint-disable react/prop-types */
import { Button, Image, Link } from '@nextui-org/react'

export default function Hero() {
  return (
    <section className="relative ">
      <div className="py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-6xl font-bold py-4 mb-4" data-aos="fade-up">
            Beautify your screenshots, instantly.
          </h1>
          {/* <p className="text-md text-slate-400 mb-10">
            Our landing page template works on all devices, so you only have to
            set it up once, and get beautiful results forever.
          </p> */}
          <div className="max-w-xs mx-auto sm:max-w-none sm:inline-flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4 py-4">
            <Button color="primary" variant="shadow" size="lg">
              Download
            </Button>
            <Button as={Link} href="/#app" variant="ghost" size="lg">
              Try it
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
