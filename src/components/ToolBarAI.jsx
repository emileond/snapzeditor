import { useEffect, useState } from 'react'
import {
  PiMagicWandBold,
  PiSparkleBold,
  PiSunDimBold,
  PiSelectionInverseBold,
  PiMagicWandDuotone,
} from 'react-icons/pi'
import { Button, Card, Divider, useDisclosure } from '@nextui-org/react'
import Slider from './Slider'
import { useLicense } from '../context/LicenseContext'
import Paywall from './Paywall'

const ToolBarAI = () => {
  const { isLicensed } = useLicense()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [selectedTab, setSelectedTab] = useState('image')

  return (
    <>
      <Paywall isOpen={isOpen} onOpenChange={onOpenChange} />
      <div id="toolbar" className="w-80 min-w-[340px] px-3">
        <Card className="h-full overflow-auto bg-content1 p-4 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-default-600">
            <PiMagicWandDuotone fontSize="1.3rem" />
            <h4 className="font-semibold">AI Image Enhancer</h4>
          </div>
          <p className="text-default-500 text-sm text-left">
            Enhance your images with AI and achieve new levels of creativity and
            quality.
          </p>
          {/* <Tabs
            className="mb-2"
            color="primary"
            fullWidth
            selectedKey={selectedTab}
            onSelectionChange={setSelectedTab}
          >
            <Tab
              key="image"
              title={
                <div className="flex items-center space-x-2">
                  <PiImageBold fontSize="1.3rem" />
                  <span>Image</span>
                </div>
              }
              className="flex flex-col gap-4"
            > */}
          {/* <Divider />
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
                startContent={<PiArrowCounterClockwiseBold fontSize="1rem" />}
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
          </div> */}
          <Divider />
          <div>
            <div className="flex items-center gap-2">
              <PiSparkleBold fontSize="1.1rem" />
              <h5>Creativity</h5>
            </div>
            <Slider
              onValueChange={() => {}}
              min={0.5}
              max={2.5}
              step={0.01}
              defaultValue={[1]}
            />
          </div>
          <Divider />
          <div>
            <div className="flex items-center gap-2">
              <PiSunDimBold fontSize="1.1rem" />
              <h5>HDR</h5>
            </div>
            <Slider
              onValueChange={() => {}}
              min={0}
              max={100}
              step={1}
              defaultValue={[50]}
            />
          </div>
          <Divider />
          <div>
            <div className="flex items-center gap-2">
              <PiSelectionInverseBold fontSize="1.1rem" />
              <h5>Resemblance</h5>
            </div>
            <Slider
              onValueChange={() => {}}
              min={0}
              max={50}
              step={1}
              defaultValue={[20]}
            />
          </div>
          {/* </Tab>
          </Tabs> */}
          <Button
            color="secondary"
            variant="faded"
            startContent={<PiMagicWandBold fontSize="1.1rem" />}
          >
            Coming soon
          </Button>
        </Card>
      </div>
    </>
  )
}

export default ToolBarAI
