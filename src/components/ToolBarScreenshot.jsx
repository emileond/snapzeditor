import { useEffect, useState } from 'react'
import {
  PiBrowserBold,
  PiSelectionBackgroundBold,
  PiCaretDownBold,
  PiArrowsOutSimpleBold,
  PiNotchesBold,
  PiCircleDashedBold,
  PiAlignCenterVerticalSimpleBold,
  PiAlignCenterHorizontalSimpleBold,
  PiFrameCornersBold,
  PiGhostBold,
  PiInstagramLogo,
  PiTiktokLogo,
  PiTwitterLogo,
  PiFacebookLogo,
  PiLinkedinLogo,
  PiYoutubeLogo,
  PiTwitchLogo,
  PiImageBold,
  PiScanBold,
  PiFileImageBold,
  PiArrowCounterClockwiseBold,
  PiEyeBold,
  PiEyeClosedBold,
  PiDotsNineBold,
} from 'react-icons/pi'
import {
  Button,
  Card,
  Divider,
  Dropdown,
  Input,
  Switch,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tab,
  Tabs,
  CardHeader,
  CardBody,
  CardFooter,
  useDisclosure,
} from '@nextui-org/react'
import Slider from './Slider'
import GradientButtons from './GradientButtons'
import WallpaperPicker from './WallpaperPicker'
import ColorPicker from './ColorPicker'
import ChipPro from './ChipPro'
import PositionSelector from './PositionSelector'
import { useLicense } from '../context/LicenseContext'
import Paywall from './Paywall'
import { useCanvasBg } from '../context/CanvasBgContext'

const ToolBarScreenshot = ({
  imageLoaded,
  imgVisibility,
  setImgVisibility,
  onReplaceImage,
  imgFrame,
  setImgScale,
  setImgPosition,
  imgPosition,
  setImgShadow,
  setBorderRadius,
  setRotationX,
  setRotationY,
  setImgFrame,
  snapzWatermark,
  setSnapzWatermark,
  customWatermarkToggle,
  setCustomWatermarkToggle,
  setCustomWatermarkImg,
  setCustomWatermarkText,
  canvasWidth,
  canvasHeight,
  sizeError,
  register,
  setValue,
  handleExtractText,
  isOCRLoading,
  ocrResult,
}) => {
  const { isLicensed } = useLicense()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { setCanvasBg } = useCanvasBg()

  const handleWatermarkUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/png, image/jpeg, image/webp'

    input.onchange = (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setCustomWatermarkImg(e.target.result)
        }
        reader.readAsDataURL(file)
      }
      input.oncancel = () => {
        return
      }
    }

    // Simulate a click on the input element to open the file dialog
    input.click()
  }

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

  const [ocrLanguage, setOcrLanguage] = useState('eng')

  const supportedLanguages = [
    { label: 'English', value: 'eng' },
    { label: 'Spanish', value: 'spa' },
    { label: 'French', value: 'fra' },
    { label: 'German', value: 'deu' },
    { label: 'Italian', value: 'ita' },
    { label: 'Portuguese', value: 'por' },
    { label: 'Dutch', value: 'nld' },
  ]

  const [selectedTab, setSelectedTab] = useState('canvas')

  useEffect(() => {
    if (imageLoaded) {
      setSelectedTab('image')
    } else {
      setSelectedTab('canvas')
    }
  }, [imageLoaded])

  const handleDefaultWatermarkToggle = (e) => {
    if (isLicensed) {
      setSnapzWatermark(!snapzWatermark)
    } else {
      onOpen()
    }
  }

  const handleCustomWatermarkToggle = () => {
    if (isLicensed) {
      setCustomWatermarkToggle(!customWatermarkToggle)
    } else {
      onOpen()
    }
  }

  return (
    <>
      <Paywall isOpen={isOpen} onOpenChange={onOpenChange} />

      <div id="toolbar" className="w-80 min-w-[340px] px-3">
        <Card className="h-full overflow-auto bg-content1 p-4">
          <Tabs
            className="mb-2"
            color="primary"
            fullWidth
            selectedKey={selectedTab}
            onSelectionChange={setSelectedTab}
          >
            <Tab
              key="canvas"
              title={
                <div className="flex items-center space-x-2">
                  <PiFrameCornersBold fontSize="1.3rem" />
                  <span>Canvas</span>
                </div>
              }
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                  <PiArrowsOutSimpleBold fontSize="1.1rem" />
                  <h5>Size</h5>
                </div>
                <div className="flex gap-2 items-center">
                  <Input
                    {...register('inputWidth', {
                      min: 10,
                      max: 4096,
                      valueAsNumber: true,
                      validate: (value) => value >= 10 && value <= 4096,
                    })}
                    isInvalid={sizeError && true}
                    type="number"
                    size="xs"
                    variant="bordered"
                    placeholder="Width"
                    endContent="px"
                    classNames={{
                      input: 'w-full',
                      inputWrapper: ['min-h-9', 'h-9'],
                    }}
                    value={canvasWidth}
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
                    size="xs"
                    variant="bordered"
                    placeholder="Height"
                    endContent="px"
                    classNames={{
                      input: 'w-full',
                      inputWrapper: ['min-h-9', 'h-9'],
                    }}
                    value={canvasHeight}
                  />
                  {sizeError && (
                    <p className="text-danger text-sm">{sizeError}</p>
                  )}
                  <Dropdown className="dark">
                    <DropdownTrigger>
                      <Button isIconOnly size="sm" variant="faded">
                        <PiCaretDownBold fontSize="1rem" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Templates">
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
              </div>
              <Divider />
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                  <PiSelectionBackgroundBold fontSize="1.1rem" />
                  <h5>Background</h5>
                </div>
                <Tabs size="sm" fullWidth>
                  <Tab title="Gradient">
                    <GradientButtons />
                  </Tab>
                  <Tab title="Wallpaper">
                    <WallpaperPicker />
                  </Tab>
                  <Tab title="Color">
                    <ColorPicker
                      onChange={(color) => {
                        setCanvasBg({ style: color, imgSrc: null })
                      }}
                    />
                  </Tab>
                </Tabs>
              </div>
              <Divider />
              <div className="flex flex-col gap-2 items-start">
                <div className="flex items-center gap-2">
                  <PiGhostBold fontSize="1.1rem" />
                  <h5>Watermark</h5>
                  <ChipPro />
                </div>
                <Switch
                  size="sm"
                  color="secondary"
                  isSelected={snapzWatermark}
                  onChange={handleDefaultWatermarkToggle}
                >
                  SnapsEditor watermark
                </Switch>

                <Switch
                  size="sm"
                  color="secondary"
                  isSelected={customWatermarkToggle}
                  onChange={handleCustomWatermarkToggle}
                >
                  Custom watermark
                </Switch>
                {customWatermarkToggle && (
                  // add custom image upload
                  <div className="flex flex-col gap-2 items-start w-full">
                    <span className="text-sm">Watermark icon</span>
                    <Button
                      size="sm"
                      variant="shadow"
                      onClick={handleWatermarkUpload}
                    >
                      Upload
                    </Button>
                    <span className="text-sm">Watermark text</span>
                    <Input
                      className="w-full"
                      variant="faded"
                      size="sm"
                      placeholder="Add your text"
                      onChange={(e) => setCustomWatermarkText(e.target.value)}
                    />
                  </div>
                )}
              </div>
              <Divider />
            </Tab>
            <Tab
              key="image"
              title={
                <div className="flex items-center space-x-2">
                  <PiImageBold fontSize="1.3rem" />
                  <span>Image</span>
                </div>
              }
              className="flex flex-col gap-4"
            >
              <Divider />
              <div className="flex flex-col items-start gap-3">
                <div className="flex items-center gap-2">
                  <PiFileImageBold fontSize="1.1rem" />
                  <h5>File</h5>
                  <p className="text-start text-default-600 text-sm truncate w-52">
                    {imageLoaded.loaded && imageLoaded.data
                      ? imageLoaded.data.name
                      : 'Screenshot'}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2 w-full">
                  <Button
                    size="sm"
                    variant="faded"
                    startContent={
                      <PiArrowCounterClockwiseBold fontSize="1rem" />
                    }
                    onClick={onReplaceImage}
                  >
                    Replace
                  </Button>
                  <Button
                    size="sm"
                    variant="faded"
                    startContent={
                      imgVisibility ? (
                        <PiEyeClosedBold fontSize="1rem" />
                      ) : (
                        <PiEyeBold fontSize="1rem" />
                      )
                    }
                    onClick={() => setImgVisibility(!imgVisibility)}
                  >
                    {imgVisibility ? 'Hide' : 'Show'}
                  </Button>
                </div>
              </div>
              <Divider />
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                  <PiBrowserBold fontSize="1.1rem" />
                  <h5>Frame</h5>
                </div>
                <Dropdown className="dark">
                  <DropdownTrigger>
                    <Button
                      size="sm"
                      variant="faded"
                      endContent={<PiCaretDownBold />}
                    >
                      {imgFrame}
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
                  defaultValue={[1]}
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
              <Divider />
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <PiDotsNineBold fontSize="1.1rem" />
                  <h5>Position</h5>
                </div>
                <PositionSelector
                  onChange={(pos) =>
                    isLicensed ? setImgPosition(pos) : onOpen()
                  }
                  position={imgPosition}
                />
                <ChipPro />
              </div>

              {/* <Divider />
            <div>
              <div className="flex items-center gap-2">
                <PiFrameCornersBold fontSize="1.1rem" />
                <h5>Inset</h5>
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
            </div> */}
              <Divider />
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                  <PiScanBold fontSize="1.1rem" />
                  <h5>Extract text</h5>
                  <ChipPro />
                </div>
                <div className="flex items-center gap-2">
                  <Dropdown className="dark">
                    <DropdownTrigger>
                      <Button
                        size="sm"
                        variant="faded"
                        disabled={isOCRLoading}
                        endContent={<PiCaretDownBold />}
                      >
                        {ocrLanguage}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Languages">
                      {supportedLanguages.map((language) => (
                        <DropdownItem
                          key={language.value}
                          value={language.value}
                          onClick={() => setOcrLanguage(language.value)}
                        >
                          {language.label}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                  <Button
                    size="sm"
                    onClick={() =>
                      isLicensed ? handleExtractText(ocrLanguage) : onOpen()
                    }
                    isLoading={isOCRLoading}
                  >
                    Extract
                  </Button>
                </div>
                {ocrResult && (
                  <Card className="w-full max-h-200 border border-content3">
                    <CardHeader className="py-2">
                      <p className="text-tiny uppercase font-bold">Result</p>
                    </CardHeader>
                    <CardBody className="pt-1 pb-2">
                      <div className="flex flex-col gap-1">
                        {ocrResult?.map((line) => (
                          <p
                            key={line?.text}
                            className="text-default-600 text-sm"
                          >
                            {line?.text}
                          </p>
                        ))}
                      </div>
                    </CardBody>
                    <CardFooter>
                      <Button
                        size="sm"
                        variant="faded"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            ocrResult.map((line) => line.text).join('\n')
                          )
                        }}
                      >
                        Copy
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </div>
            </Tab>
          </Tabs>
        </Card>
      </div>
    </>
  )
}

export default ToolBarScreenshot
