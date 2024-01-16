/* eslint-disable react/prop-types */
import { Button, Chip } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()
  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-6xl font-bold py-4 mb-4">
          Beautify your screenshots, instantly.
        </h1>
        <p className="text-lg text-slate-300 mb-10">
          Don't just share screenshots; share stories and build your brand. With
          Snaps Editor, your screenshots transform from simple images to
          eye-catching visuals.
        </p>
        <div className="max-w-xs mx-auto sm:max-w-none sm:inline-flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4 py-4">
          <Button color="primary" variant="shadow" size="lg">
            Download
          </Button>
          <Button
            color="default"
            href="/app"
            variant="ghost"
            size="lg"
            endContent={<Chip color="success">Free, no signup</Chip>}
            onClick={() => {
              navigate('/app')
            }}
          >
            Try it now
          </Button>
        </div>
      </div>
    </section>
  )
}
