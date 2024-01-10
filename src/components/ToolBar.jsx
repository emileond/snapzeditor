import {
  PiBrowserBold,
  PiSelectionBackgroundBold,
  PiCaretDownBold,
  PiArrowsOutSimpleBold,
  PiNotchesBold,
  PiCircleDashedBold,
  PiAlignCenterVerticalSimpleBold,
  PiFrameCorners,
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
} from '@nextui-org/react'
import Slider from './Slider'
import GradientButtons from './GradientButtons'
import WallpaperPicker from './WallpaperPicker'
import ColorPicker from './ColorPicker'

const ToolBar = ({
  imgFrame,
  setCanvasBg,
  setImgScale,
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
}) => {
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

  return (
    <div id="toolbar" className="w-96 px-3">
      <Card className="h-full overflow-auto bg-content1 p-4">
        <Tabs className="mb-2" color="primary" fullWidth>
          <Tab
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
                  size="xs"
                  variant="bordered"
                  placeholder="Height"
                  endContent="px"
                  classNames={{
                    input: 'w-full',
                    inputWrapper: ['min-h-9', 'h-9'],
                  }}
                  defaultValue={canvasHeight}
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
            </div>
            <Divider />
            <div className="flex flex-col items-start gap-2">
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
              </div>

              <Switch
                size="sm"
                color="secondary"
                defaultSelected={snapzWatermark}
                onChange={() => setSnapzWatermark(!snapzWatermark)}
              >
                SnapzEditor watermark
              </Switch>

              <Switch
                size="sm"
                color="secondary"
                defaultSelected={customWatermarkToggle}
                onChange={() =>
                  setCustomWatermarkToggle(!customWatermarkToggle)
                }
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
            title={
              <div className="flex items-center space-x-2">
                <PiImageBold fontSize="1.3rem" />
                <span>Image</span>
              </div>
            }
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col items-start gap-2">
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
            <Divider />
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
            </div>
          </Tab>
        </Tabs>
      </Card>
    </div>
  )
}

export default ToolBar
