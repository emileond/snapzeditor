import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  Kbd,
} from '@nextui-org/react'
import SampleImage from '/images/sample.png'
import { useDropzone } from 'react-dropzone'
import { useCallback, useEffect } from 'react'

export default function ImgEmptyState({
  loadImage,
  handleUpload,
  handlePaste,
}) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          loadImage(reader.result, file)
        }
      }
    },
    [loadImage]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  })

  useEffect(() => {
    window.addEventListener('paste', handlePaste)
    return () => {
      window.removeEventListener('paste', handlePaste)
    }
  }, [])

  return (
    <div className="flex justify-center z-20 absolute">
      <Card className="p-4">
        <CardHeader w="100%" className="justify-center">
          <h3>Add an image to get started</h3>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-2">
            <div
              {...getRootProps()}
              className={`flex flex-col items-center w-full h-50 m-auto dropzone ${
                isDragActive ? 'bg-[#262a35]' : 'transparent'
              } hover:bg-[#262a35] transition-colors duration-300 ease-in-out cursor-pointer border-2 border-dashed border-content4 rounded-lg`}
            >
              <input {...getInputProps()} />
              <Image
                src={'/empty-states/dark/14.svg'}
                width={200}
                height={200}
                className={`w-full `}
              />
            </div>
            <Button
              fullWidth
              variant="shadow"
              color="secondary"
              onClick={handleUpload}
            >
              Upload image
            </Button>
            <p className="text-center pt-1 text-default-500">or</p>
            <Button
              fullWidth
              variant="faded"
              onClick={() => loadImage(SampleImage)}
            >
              Try a sample image
            </Button>
          </div>
        </CardBody>
        <CardFooter>
          <p className="text-small text-default-500">
            Paste your image with <Kbd>cmd + v</Kbd> / <Kbd>ctrl + v</Kbd>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
