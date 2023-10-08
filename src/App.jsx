import { useState } from 'react'
import './App.css'
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  Divider,
  Input,
  Tab,
  Tabs,
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
} from 'react-icons/pi'
import Slider from './components/Slider'
import CanvasComponent from './components/CanvasComponent'
import ColorPicker from './components/ColorPicker'
import GradientButtons from './components/GradientButtons'
import WallpaperPicker from './components/WallpaperPicker'

function App() {
  const [canvasBg, setCanvasBg] = useState(
    'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)'
  )
  const [imgScale, setImgScale] = useState(1)
  const [imgShadow, setImgShadow] = useState(50) // 0 means no shadow by default
  const [borderRadius, setBorderRadius] = useState(20)
  const [rotationX, setRotationX] = useState(0)
  const [rotationY, setRotationY] = useState(0)

  return (
    <div className="min-w-[80vw]">
      <div className="flex justify-between py-2 px-4 bg-content1 ">
        <div className="flex items-center gap-1 ">
          <Input
            size="sm"
            variant="bordered"
            placeholder="Width"
            endContent="px"
            className="w-24"
          />
          <p>*</p>
          <Input
            size="sm"
            variant="bordered"
            placeholder="Height"
            endContent="px"
            className="w-24"
          />
        </div>
        <div className="flex gap-3">
          <Button endContent={<PiCaretDownBold fontSize="1.1rem" />}>
            Presets
          </Button>
          <Button
            color="primary"
            startContent={<PiExportBold fontSize="1.1rem" />}
          >
            Export
          </Button>
        </div>
      </div>
      <div className="flex flex-row p-2">
        <div className="w-96 px-3">
          <Card className="h-full bg-content2 p-4 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <PiImageBold fontSize="1.1rem" />
                <h5>Frame</h5>
              </div>
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
            {/* <div>
              <div className="flex items-center gap-2">
                <PiImageBold fontSize="1.1rem" />
                <h5>Inset</h5>
              </div>
            </div> */}
          </Card>
        </div>
        <CanvasComponent
          canvasBg={canvasBg}
          sliderScale={imgScale}
          shadow={imgShadow}
          borderRadius={borderRadius}
          rotationX={rotationX}
          rotationY={rotationY}
        />
        {/* <PixieStage
          canvasBg={canvasBg}
          sliderScale={imgScale}
          shadow={imgShadow}
          borderRadius={borderRadius}
        /> */}
        {/* <Canvas canvasBg={canvasBg} sliderScale={imgScale} shadow={imgShadow} /> */}
      </div>
    </div>
  )
}

export default App
