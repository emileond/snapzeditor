import { useEffect, useState, useRef } from 'react'
import './App.css'
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  Divider,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
  Tab,
  Tabs,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Select,
  SelectItem,
} from '@nextui-org/react'
import {
  PiExportBold,
  PiCaretDownBold,
  PiImageBold,
  PiArrowsOutSimpleBold,
  PiNotchesBold,
  PiCircleDashedBold,
  PiAlignCenterVerticalSimpleBold,
  PiAlignCenterHorizontalSimpleBold,
  PiSelectionBackgroundBold,
  PiFilePng,
  PiCopy,
  PiDownloadBold,
  PiTwitchLogo,
  PiInstagramLogo,
  PiFacebookLogo,
  PiTwitterLogo,
  PiYoutubeLogo,
  PiLinkedinLogo,
  PiTiktokLogo,
  PiFrameCorners,
  PiBrowserBold,
} from 'react-icons/pi'
import Slider from './components/Slider'
import CanvasComponent from './components/CanvasComponent'
import ColorPicker from './components/ColorPicker'
import GradientButtons from './components/GradientButtons'
import WallpaperPicker from './components/WallpaperPicker'
import { useForm, Controller } from 'react-hook-form'
import { toPng, toBlob } from 'html-to-image'

function App() {
  const [canvasBg, setCanvasBg] = useState(
    'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)'
  )
  const [imgScale, setImgScale] = useState(1.2)
  const [imgShadow, setImgShadow] = useState(50) // 0 means no shadow by default
  const [borderRadius, setBorderRadius] = useState(20)
  const [rotationX, setRotationX] = useState(0)
  const [rotationY, setRotationY] = useState(0)
  const [canvasWidth, setCanvasWidth] = useState(1800)
  const [canvasHeight, setCanvasHeight] = useState(1400)
  const [sizeError, setSizeError] = useState(false)
  const [fileName, setFileName] = useState('my-snapshot')
  const [imgFrame, setImgFrame] = useState('macOS-dark')

  const canvasRef = useRef(null)

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm()

  const watchedWidth = watch('inputWidth')
  const watchedHeight = watch('inputHeight')
  const watchedFileName = watch('inputFileName')

  const canvasTemplates = [
    {
      name: 'Default',
      width: 1800,
      height: 1400,
    },
    {
      name: 'Instagram post',
      width: 1080,
      height: 1080,
      icon: <PiInstagramLogo fontSize="1.2rem" />,
    },
    {
      name: 'Instagram story',
      width: 1080,
      height: 1920,
      icon: <PiInstagramLogo fontSize="1.2rem" />,
    },
    {
      name: 'TikTok',
      width: 1080,
      height: 1920,
      icon: <PiTiktokLogo fontSize="1.1rem" />,
    },
    {
      name: 'X/Twitter post',
      width: 1600,
      height: 900,
      icon: <PiTwitterLogo fontSize="1.2rem" />,
    },
    {
      name: 'Facebook',
      width: 1200,
      height: 630,
      icon: <PiFacebookLogo fontSize="1.2rem" />,
    },
    {
      name: 'LinkedIn post',
      width: 1200,
      height: 627,
      icon: <PiLinkedinLogo fontSize="1.2rem" />,
    },
    {
      name: 'YouTube thumbnail',
      width: 1280,
      height: 720,
      icon: <PiYoutubeLogo fontSize="1.2rem" />,
    },
    {
      name: 'Twitch',
      width: 1920,
      height: 1080,
      icon: <PiTwitchLogo fontSize="1.2rem" />,
    },
  ]

  // Debounce function using setTimeout and clearTimeout
  let debounceTimeout = null
  const debounce = (func, delay) => {
    return function (...args) {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout)
      }
      debounceTimeout = setTimeout(() => {
        func(...args)
      }, delay)
    }
  }

  const validateSizeDimensions = () => {
    let error = ''

    if (watchedWidth < 10) {
      error = 'Min width is 10px'
    } else if (watchedWidth > 4096) {
      error = 'Max width is 4096px'
    } else if (watchedHeight < 10) {
      error = 'Min height is 10px'
    } else if (watchedHeight > 4096) {
      error = 'Max height is 4096px'
    }

    setSizeError(error)

    // Return whether the values are valid
    return !error
  }

  function applyScaling(node) {
    // Actual displayed dimensions of the node
    const displayedWidth = node.offsetWidth
    const displayedHeight = node.offsetHeight

    // Calculate the scale factors
    const scaleX = canvasWidth / displayedWidth
    const scaleY = canvasHeight / displayedHeight
    const scale = Math.min(scaleX, scaleY)

    // Temporarily upscale the node for capturing
    node.style.transform = `scale(${scale})`
    node.style.transformOrigin = 'top left'

    return scale // return scale if you might need it for other purposes
  }

  const handleDownload = () => {
    let node = canvasRef.current

    applyScaling(node)

    // Capture the upscaled node as an image
    toPng(node, {
      width: canvasWidth,
      height: canvasHeight,
    })
      .then(function (dataUrl) {
        // Revert scaling after capturing to ensure the display remains unchanged
        node.style.transform = ''
        node.style.transformOrigin = ''

        // Download the image
        const link = document.createElement('a')
        link.download = `${fileName}.png`
        link.href = dataUrl
        link.click()
      })
      .catch(function (error) {
        console.error('Error capturing image:', error)

        // Ensure scaling is reverted even if there's an error
        node.style.transform = ''
        node.style.transformOrigin = ''
      })
  }

  const handleCopyToClipboard = () => {
    let node = canvasRef.current

    applyScaling(node)

    toBlob(node, {
      width: canvasWidth,
      height: canvasHeight,
    })
      .then((blob) => {
        const clipboardItem = new ClipboardItem({ [blob.type]: blob })
        return navigator.clipboard.write([clipboardItem])
      })
      .then(() => {
        // Success! The image is now in the clipboard.
        console.log('Image copied to clipboard!')

        // Revert scaling after copying to ensure the display remains unchanged
        node.style.transform = ''
        node.style.transformOrigin = ''
      })
      .catch((error) => {
        console.error('Error copying image to clipboard:', error)

        // Ensure scaling is reverted even if there's an error
        node.style.transform = ''
        node.style.transformOrigin = ''
      })
  }

  useEffect(() => {
    const updateDimensions = debounce(() => {
      const isValid = validateSizeDimensions()

      if (isValid) {
        setCanvasWidth(watchedWidth)
        setCanvasHeight(watchedHeight)
      }
    }, 300)

    updateDimensions()

    // Clean up the debounce function
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout)
      }
    }
  }, [watchedWidth, watchedHeight])

  useEffect(() => {
    // use debounce to prevent too many updates
    const updateFileName = debounce(() => {
      setFileName(watchedFileName)
    }, 300)

    updateFileName()

    // clean up the debounce function
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout)
      }
    }
  }, [watchedFileName])

  return (
    <div
      className={`w-full min-w-[1024px] max-w-[1600px] flex flex-col items-start mx-auto`}
    >
      <div className="flex justify-between py-2 px-4 bg-content1 w-full">
        <div className="flex items-center gap-2 ">
          <PiFrameCorners fontSize="1.3rem" />
          <Input
            {...register('inputWidth', {
              min: 10,
              max: 4096,
              valueAsNumber: true,
              validate: (value) => value >= 10 && value <= 4096,
            })}
            isInvalid={sizeError && true}
            type="number"
            size="sm"
            variant="bordered"
            placeholder="Width"
            endContent="px"
            className="w-24"
            defaultValue={canvasWidth}
          />
          <p className="text-default-500">x</p>
          <Input
            {...register('inputHeight', {
              min: 10,
              max: 4096,
              valueAsNumber: true,
              validate: (value) => value >= 10 && value <= 4096,
            })}
            isInvalid={sizeError && true}
            type="number"
            size="sm"
            variant="bordered"
            placeholder="Height"
            endContent="px"
            className="w-24"
            defaultValue={canvasHeight}
          />
          {sizeError && <p className="text-danger text-sm">{sizeError}</p>}
          <Dropdown className="dark">
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="faded">
                <PiCaretDownBold fontSize="1rem" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              {canvasTemplates.map((template) => (
                <DropdownItem
                  key={template.name}
                  startContent={template.icon && template.icon}
                  endContent={
                    <p className="text-default-400 text-xs">{`${template.width} x ${template.height}`}</p>
                  }
                  onClick={() => {
                    setValue('inputWidth', template.width)
                    setValue('inputHeight', template.height)
                  }}
                >
                  {template.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="flex flex-row gap-3 items-baseline">
          <p className="text-default-500 text-xs">File name</p>
          <Input
            {...register('inputFileName', {
              required: true,
            })}
            variant="underlined"
            className="w-48"
            defaultValue={fileName}
          />
        </div>
        <div className="flex gap-3">
          {/* <Button endContent={<PiCaretDownBold fontSize="1.1rem" />}>
            Presets
          </Button> */}
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <Button
                color="primary"
                startContent={<PiExportBold fontSize="1.1rem" />}
              >
                Export
              </Button>
            </PopoverTrigger>
            <PopoverContent className="dark min-w-[300px]">
              <div className="flex flex-col gap-3 justify-start w-full py-3">
                <h4>Export</h4>
                <div className="flex gap-2 items-center">
                  <PiFilePng fontSize="1.6rem" />
                  <div className="flex flex-col">
                    <span className="text-small">PNG</span>
                    <span className="text-tiny text-default-400">
                      High quality
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex flex-row items-center gap-2">
                    <Select
                      size="xs"
                      className="dark w-20"
                      defaultSelectedKeys={['1']}
                    >
                      <SelectItem
                        key="1"
                        className="dark bg-content1"
                        textValue="1x"
                      >
                        1x
                      </SelectItem>
                      <SelectItem
                        key="2"
                        className="dark bg-content1"
                        textValue="2x"
                      >
                        2x
                      </SelectItem>
                    </Select>
                    <span className="text-default-500">
                      {canvasWidth} x {canvasHeight}
                    </span>
                  </div>
                </div>
                <Divider />
                <div className="w-full flex flex-col items-center gap-1">
                  <Button
                    color="primary"
                    className="w-full"
                    onClick={handleDownload}
                  >
                    <PiDownloadBold fontSize="1.1rem" />
                    Download
                  </Button>
                  <Button
                    size="sm"
                    variant="light"
                    color="primary"
                    className="w-full"
                    onClick={handleCopyToClipboard}
                  >
                    <PiCopy fontSize="1.1rem" />
                    Copy to clipboard
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="w-full flex flex-row p-2">
        <div className="w-96 px-3">
          <Card className="h-full bg-content2 p-4 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <PiBrowserBold fontSize="1.1rem" />
                <h5>Frame</h5>
              </div>
              <Dropdown className="dark">
                <DropdownTrigger>
                  <Button size="sm" variant="faded">
                    {imgFrame}
                    <PiCaretDownBold fontSize="1rem" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => {
                      setImgFrame('macOS-dark')
                    }}
                  >
                    macOS dark
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      setImgFrame('macOS-light')
                    }}
                  >
                    macOS light
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      setImgFrame('windows-light')
                    }}
                  >
                    Windows light
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      setImgFrame('windows-dark')
                    }}
                  >
                    Windows dark
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      setImgFrame('youtube')
                    }}
                  >
                    YouTube
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      setImgFrame('galaxy')
                    }}
                  >
                    Galaxy
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      setImgFrame('none')
                    }}
                  >
                    None
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <Divider />
            <div>
              <div className="flex items-center gap-2">
                <PiSelectionBackgroundBold fontSize="1.1rem" />
                <h5>Background</h5>
              </div>
              <Tabs size="sm">
                <Tab title="Gradient">
                  <GradientButtons setCanvasBg={setCanvasBg} />
                </Tab>
                <Tab title="Wallpaper">
                  <WallpaperPicker setCanvasBg={setCanvasBg} />
                </Tab>
                <Tab title="Color">
                  <ColorPicker
                    onChange={(color) => {
                      setCanvasBg(color)
                    }}
                  />
                </Tab>
              </Tabs>
            </div>
            <Divider />
            <div>
              <div className="flex items-center gap-2">
                <PiArrowsOutSimpleBold fontSize="1.1rem" />
                <h5>Size</h5>
              </div>
              <Slider
                onValueChange={(value) => {
                  setImgScale(value)
                }}
                min={0.5}
                max={2.5}
                step={0.01}
                defaultValue={[1.2]}
              />
            </div>
            <Divider />
            <div>
              <div className="flex items-center gap-2">
                <PiNotchesBold fontSize="1.1rem" />
                <h5>Shadow</h5>
              </div>
              <Slider
                onValueChange={(value) => {
                  setImgShadow(value)
                }}
                min={0}
                max={100}
                step={1}
                defaultValue={[50]}
              />
            </div>
            <Divider />
            <div>
              <div className="flex items-center gap-2">
                <PiCircleDashedBold fontSize="1.1rem" />
                <h5>Rounded corners</h5>
              </div>
              <Slider
                onValueChange={(value) => {
                  setBorderRadius(value)
                }}
                min={0}
                max={50}
                step={1}
                defaultValue={[20]}
              />
            </div>
            <Divider />
            <div>
              <div className="flex items-center gap-2">
                <PiAlignCenterVerticalSimpleBold fontSize="1.1rem" />

                <h5>Rotate X</h5>
              </div>
              <Slider
                onValueChange={(value) => {
                  setRotationX(value)
                }}
                min={-15}
                max={15}
                step={1}
                defaultValue={[0]}
              />
            </div>
            <Divider />
            <div>
              <div className="flex items-center gap-2">
                <PiAlignCenterHorizontalSimpleBold fontSize="1.1rem" />
                <h5>Rotate Y</h5>
              </div>
              <Slider
                onValueChange={(value) => {
                  setRotationY(value)
                }}
                min={-15}
                max={15}
                step={1}
                defaultValue={[0]}
              />
            </div>
            {/* <div>
              <div className="flex items-center gap-2">
                <PiImageBold fontSize="1.1rem" />
                <h5>Inset</h5>
              </div>
            </div> */}
          </Card>
        </div>
        <div className="w-full flex items-center justify-center">
          <div ref={canvasRef}>
            <CanvasComponent
              canvasBg={canvasBg}
              sliderScale={imgScale}
              shadow={imgShadow}
              borderRadius={borderRadius}
              rotationX={rotationX}
              rotationY={rotationY}
              canvasWidth={canvasWidth}
              canvasHeight={canvasHeight}
              imgFrame={imgFrame}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
