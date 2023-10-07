/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from 'react'
import { Stage, Layer, Image as KonvaImage } from 'react-konva'
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
import Frame from './Frame'

function Canvas({ canvasBg }) {
  const [image, setImage] = useState(null)
  const [frameType, setFrameType] = useState(null) // To determine which frame to show

  const stageRef = useRef(null)

  // Adjust these constants if necessary
  const MAX_WIDTH = 800
  const MAX_HEIGHT = 600
  const MARGIN = 40

  const loadImage = (imgSrc) => {
    const img = new window.Image()
    img.src = imgSrc
    img.onload = () => {
      // Calculate the scale for the image with margin considerations
      let scale = 1
      const widthScale = (MAX_WIDTH - 3 * MARGIN) / img.width
      const heightScale = (MAX_HEIGHT - 2 * MARGIN) / img.height
      if (img.width > MAX_WIDTH || img.height > MAX_HEIGHT) {
        scale = Math.min(widthScale, heightScale)
      }

      // Calculate position to center the image
      const scaledWidth = img.width * scale
      const scaledHeight = img.height * scale
      const x = (MAX_WIDTH - scaledWidth) / 2
      const y = (MAX_HEIGHT - scaledHeight) / 2

      setImage({
        image: img,
        scaleX: scale,
        scaleY: scale,
        x: x,
        y: y,
      })
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
    const clipboardData = e.clipboardData || window.clipboardData
    const pastedData = clipboardData.getData('text')
    if (pastedData.startsWith('data:image/')) {
      loadImage(pastedData)
    }
  }

  useEffect(() => {
    window.addEventListener('paste', handlePaste)
    return () => {
      window.removeEventListener('paste', handlePaste)
    }
  }, [])

  return (
    <div className="relative">
      {!image && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Card className="p-4">
            <CardHeader w="100%" className="justify-center">
              <h3>Add an image to get started</h3>
            </CardHeader>
            <CardBody>
              <div width="100%" className="flex flex-col items-center">
                <Image
                  src="/empty-states/dark/14.svg"
                  width={200}
                  height={200}
                />
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
      <Stage
        ref={stageRef}
        width={MAX_WIDTH}
        height={MAX_HEIGHT}
        style={{ backgroundColor: canvasBg }}
      >
        <Layer>{image && <KonvaImage {...image} />}</Layer>
      </Stage>
      {frameType && image && (
        <Frame
          type={frameType}
          x={image.x}
          y={image.y}
          width={image.image.width * image.scaleX}
          height={image.image.height * image.scaleY}
        />
      )}
      <Button
        className="absolute bottom-4 right-4"
        onClick={() => setFrameType('phone')}
      >
        Add frame
      </Button>
    </div>
  )
}

export default Canvas
