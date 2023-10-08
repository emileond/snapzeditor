import { useDropzone } from 'react-dropzone'
import { useState, useEffect, useCallback } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Image,
} from '@nextui-org/react'
import { Kbd } from '@nextui-org/react'
import SampleImage from '/images/sample.png'

function CanvasComponent({
  canvasBg,
  sliderScale,
  shadow,
  borderRadius,
  rotationX,
  rotationY,
}) {
  const [imageSrc, setImageSrc] = useState(null)
  const [initialScale, setInitialScale] = useState(1)

  // Adjust these constants if necessary
  const MAX_WIDTH = 1000
  const MAX_HEIGHT = 800
  const MARGIN = 20

  const loadImage = (imgSrc) => {
    const img = new window.Image()
    img.src = imgSrc
    img.onload = () => {
      let aspectScale

      // Compute the width and height scale factors
      const widthScale = (MAX_WIDTH - 2 * MARGIN) / img.width
      const heightScale = (MAX_HEIGHT - 2 * MARGIN) / img.height

      // Check if image dimensions are smaller than canvas
      if (
        img.width <= MAX_WIDTH - 2 * MARGIN &&
        img.height <= MAX_HEIGHT - 2 * MARGIN
      ) {
        aspectScale = 1 // Use the original image size
      } else {
        // Use the smallest scale value to ensure the image fits inside the canvas bounds
        aspectScale = Math.min(widthScale, heightScale)
      }

      setInitialScale(aspectScale)
      setImageSrc(imgSrc)
    }
  }

  const handleUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = () => {
      const reader = new FileReader()
      reader.readAsDataURL(input.files[0])
      reader.onload = () => {
        loadImage(reader.result)
      }
    }
    input.click()
  }

  const handlePaste = (e) => {
    console.log('Paste event triggered!')

    const clipboardData = e.clipboardData || window.clipboardData
    if (!clipboardData) {
      return
    }

    // Check for items (modern browsers)
    if (clipboardData.items) {
      const items = clipboardData.items
      for (let i = 0; i < items.length; i++) {
        // If the item is an image
        if (items[i].type.indexOf('image') !== -1) {
          // Convert the clipboard item to a blob
          const blob = items[i].getAsFile()
          const reader = new FileReader()

          reader.onload = (event) => {
            loadImage(event.target.result)
          }

          // Read the blob as a data URL
          reader.readAsDataURL(blob)
          break
        }
      }
    } else if (clipboardData.files && clipboardData.files.length > 0) {
      // Check for files (older browsers)
      const file = clipboardData.files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        loadImage(event.target.result)
      }

      reader.readAsDataURL(file)
    }
  }

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          loadImage(reader.result)
        }
      }
    },
    [loadImage]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  useEffect(() => {
    window.addEventListener('paste', handlePaste)
    return () => {
      window.removeEventListener('paste', handlePaste)
    }
  }, [])

  return (
    <div
      className="canvas relative flex items-center justify-center bg-content4 w-full h-full min-h-[60vh] overflow-hidden"
      style={{
        background: canvasBg,
      }}
    >
      {!imageSrc && (
        <div className="flex justify-center">
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
                <p className="pt-1 text-default-500">or</p>
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
                Or paste your image with <Kbd>cmd + v</Kbd> /{' '}
                <Kbd>ctrl + v</Kbd>
              </p>
            </CardFooter>
          </Card>
        </div>
      )}

      {imageSrc && (
        <div
          className={`flex flex-col overflow-hidden
          `}
          style={{
            borderRadius: `${borderRadius}px`,
            transform: `scale(${
              initialScale * sliderScale
            }) perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(0deg)`,
            boxShadow: `rgba(0, 0, 0, 0.6) 0px ${shadow}px ${
              shadow * 0.9
            }px 0px`,
          }}
        >
          <img
            src={imageSrc}
            alt="Uploaded preview"
            style={
              {
                //   boxShadow: `0 ${shadow * 8}px ${shadow * 2}px rgba(0,0,0,0.5)`,
              }
            }
          />
        </div>
      )}
    </div>
  )
}

export default CanvasComponent
