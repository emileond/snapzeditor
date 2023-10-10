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
import {
  PiAlienBold,
  PiHardDriveBold,
  PiMinus,
  PiRectangle,
  PiTerminalBold,
  PiWaveSawtooth,
  PiWaveSawtoothBold,
  PiWaveSineBold,
  PiX,
} from 'react-icons/pi'
import {
  MdMinimize,
  MdOutlineRectangle,
  MdClose,
  MdPause,
  MdSkipNext,
  MdVolumeUp,
  MdSettings,
  MdFullscreen,
  MdClosedCaption,
} from 'react-icons/md'

function CanvasComponent({
  canvasBg,
  sliderScale,
  shadow,
  borderRadius,
  rotationX,
  rotationY,
  canvasWidth,
  canvasHeight,
  imgFrame,
  snapzWatermark,
  customWatermark,
}) {
  const [imageSrc, setImageSrc] = useState(null)
  const [initialScale, setInitialScale] = useState(1)

  // Adjust these constants if necessary
  const MAX_WIDTH = canvasWidth / 2
  const MAX_HEIGHT = canvasHeight / 2
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
      className={`canvas relative flex items-center justify-center w-full h-full overflow-hidden`}
      style={{
        background: canvasBg?.style,
        width: `${MAX_WIDTH}px`,
        height: `${MAX_HEIGHT}px`,
      }}
    >
      {canvasBg?.imgSrc && (
        <img
          className="absolute top-0 w-full h-full object-cover"
          src={canvasBg?.imgSrc}
          alt="Custom watermark"
        />
      )}
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
          {imgFrame === 'macOS-dark' && (
            <div className="flex items-center justify-between w-full h-8 bg-[#262a35]">
              <div className="flex gap-2 pl-4">
                <div className="flex items-center justify-center w-3 h-3 bg-[#ff5f56] rounded-full"></div>
                <div className="flex items-center justify-center w-3 h-3 bg-[#ffbd2e] rounded-full"></div>
                <div className="flex items-center justify-center w-3 h-3 bg-[#27c93f] rounded-full"></div>
              </div>
            </div>
          )}
          {imgFrame === 'macOS-light' && (
            <div className="flex items-center justify-between w-full h-8 bg-[#f2f5f7]">
              <div className="flex gap-2 pl-4">
                <div className="flex items-center justify-center w-3 h-3 bg-[#ff5f56] rounded-full"></div>
                <div className="flex items-center justify-center w-3 h-3 bg-[#ffbd2e] rounded-full"></div>
                <div className="flex items-center justify-center w-3 h-3 bg-[#27c93f] rounded-full"></div>
              </div>
            </div>
          )}
          {imgFrame === 'windows-light' && (
            <div className="flex items-center justify-end w-full h-8 bg-[#d0dbec]/80 backdrop-blur">
              <div className="flex gap-2 pr-4">
                <MdMinimize className="text-[#313131]" />
                <MdOutlineRectangle className="text-[#313131]" />
                <MdClose className="text-[#313131]" />
              </div>
            </div>
          )}

          {imgFrame === 'windows-dark' && (
            <div className="flex items-center justify-end w-full h-8 bg-[#1e1e20]/80 backdrop-blur">
              <div className="flex gap-2 pr-4">
                <MdMinimize className="text-[#ffffff]" />
                <MdOutlineRectangle className="text-[#ffffff]" />
                <MdClose className="text-[#ffffff]" />
              </div>
            </div>
          )}
          {imgFrame === 'galaxy' && (
            // translucent navbar with a purple gradient background
            <div className="flex items-center justify-between w-full h-8 bg-gradient-to-r from-[#7f00ff]/30 to-[#e100ff]/30 backdrop-blur">
              <div className="flex gap-2 pl-4">
                <PiTerminalBold className="text-[#311b64]" />
              </div>
              <div className="flex gap-2 pr-4">
                <PiWaveSineBold className="text-[#311b64]" />
                <PiHardDriveBold className="text-[#311b64]" />
                <PiAlienBold className="text-[#311b64]" />
              </div>
            </div>
          )}
          <img src={imageSrc} alt="Uploaded image preview" />
          {imgFrame === 'youtube' && (
            <div className="w-full absolute bottom-0">
              <div className="flex flex-row w-full">
                <div className="w-full h-1 bg-danger" />
                <div className="w-full h-1 bg-gray-300" />
              </div>
              <div className="flex items-center justify-between  h-6 bg-[#000]/50">
                <div className="flex gap-2 pl-4">
                  <MdPause className="text-[#ffffff]" />
                  <MdSkipNext className="text-[#ffffff]" />
                  <MdVolumeUp className="text-[#ffffff]" />
                </div>
                <div className="flex gap-2 pr-4">
                  <MdClosedCaption className="text-[#ffffff]" />
                  <MdSettings className="text-[#ffffff]" />
                  <MdFullscreen className="text-[#ffffff]" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {snapzWatermark && (
        <div className="absolute bottom-0 right-0 m-4 bg-white/50 px-2 py-1 rounded-lg backdrop-blur-sm">
          <div className="flex gap-1">
            <Image src="/snapzeditor-icon.svg" width={16} height={16} />
            <span className="text-default text-xs">Made with </span>
            <span className="text-default text-xs font-semibold">
              SnapzEditor.com
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default CanvasComponent
