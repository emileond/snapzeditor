import { useState } from 'react'
import './App.css'
import Canvas from './components/Canvas'
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
import { PiExportBold, PiCaretDownBold, PiImageBold } from 'react-icons/pi'

function App() {
  const [canvasBg, setCanvasBg] = useState('lightblue')

  return (
    <div>
      <div className="flex justify-between py-2 px-4 bg-content1">
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
      <div className="flex flex-row p-2 gap-3">
        <div className="w-80">
          <Card className="h-full bg-content2 py-2">
            <Accordion
              defaultExpandedKeys="all"
              selectionMode="multiple"
              isCompact
            >
              <AccordionItem
                key="1"
                startContent={<PiImageBold fontSize="1.1rem" />}
                title="Background"
              >
                <Tabs size="sm">
                  <Tab title="Gradient">
                    <Button
                      size="sm"
                      color="primary"
                      onClick={() =>
                        setCanvasBg(
                          canvasBg === 'lightblue' ? 'lightgreen' : 'lightblue'
                        )
                      }
                    >
                      Change color
                    </Button>
                  </Tab>
                  <Tab title="Wallpaper">
                    <Button
                      size="sm"
                      color="primary"
                      onClick={() =>
                        setCanvasBg(
                          canvasBg === 'lightblue' ? 'lightgreen' : 'lightblue'
                        )
                      }
                    >
                      Change color
                    </Button>
                  </Tab>
                  <Tab title="Color">
                    <Input
                      id="nativeColorPicker1"
                      type="color"
                      value="#6590D5"
                    />
                  </Tab>
                </Tabs>
              </AccordionItem>
              <AccordionItem
                startContent={<PiImageBold fontSize="1.1rem" />}
                title="Frame"
              >
                <Button>Browser</Button>
                <Button>Phone</Button>
                <Button>Desktop</Button>
              </AccordionItem>
            </Accordion>
          </Card>
        </div>
        <Canvas canvasBg={canvasBg} />
      </div>
    </div>
  )
}

export default App
