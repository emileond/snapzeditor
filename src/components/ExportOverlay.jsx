import { Spinner } from '@nextui-org/react'

const ExportOverlay = ({ isVisible }) => {
  return (
    <div
      className={`${
        isVisible ? 'flex' : 'hidden'
      } w-full h-full bg-black z-50 justify-center items-center`}
    >
      <Spinner size="lg" color="secondary" label="Exporting..." />
    </div>
  )
}

export default ExportOverlay
