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

  return (
    <div id="toolbar" className="w-96 px-3">
      <Card className="h-full overflow-auto bg-content2 p-4 gap-2">
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
                  setCanvasBg({ style: color, imgSrc: null })
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
            onChange={() => setCustomWatermarkToggle(!customWatermarkToggle)}
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
      </Card>
    </div>
  )
}

export default ToolBar
