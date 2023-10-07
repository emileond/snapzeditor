/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from 'react'
import { Stage, Layer, Image as KonvaImage } from 'react-konva'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from '@nextui-org/react'
import { Kbd } from '@nextui-org/react'

function Canvas({ canvasBg }) {
  const [image, setImage] = useState(null)
  const stageRef = useRef(null)

  // Adjust these constants if necessary
  const MAX_WIDTH = 800
  const MAX_HEIGHT = 600

  const loadImage = (imgSrc) => {
    const img = new window.Image()
    img.src = imgSrc
    img.onload = () => {
      // Calculate the scale for the image
      let scale = 1
      const widthScale = MAX_WIDTH / img.width
      const heightScale = MAX_HEIGHT / img.height
      if (img.width > MAX_WIDTH || img.height > MAX_HEIGHT) {
        scale = Math.min(widthScale, heightScale)
      }
      setImage({
        image: img,
        scaleX: scale,
        scaleY: scale,
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
          <Card>
            <CardHeader>
              <div className="flex flex-col items-start">
                <p className="text-md">Add an image to get started</p>
              </div>
            </CardHeader>
            <CardBody>
              <Button onClick={handleUpload}>Upload image</Button>
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
    </div>
  )
}

export default Canvas
