import {
  PiCaretDownBold,
  PiExportBold,
  PiFilePng,
  PiDownloadBold,
  PiCopy,
} from 'react-icons/pi'
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Divider,
  Image,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'
import UserMenu from './UserMenu'
import { useState } from 'react'

const TopBar = ({
  canvasWidth,
  canvasHeight,
  fileName,
  register,
  onExport,
  isExporting,
}) => {
  const [exportSize, setExportSize] = useState('1x')
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      id="topbar"
      className="flex justify-between items-center py-1 px-4 bg-content1 w-full z-10"
    >
      <div className="flex items-center gap-4">
        <Image src="/snapzeditor-icon.svg" width={32} height={32} />
      </div>
      <div className="flex flex-row gap-3 items-baseline">
        <p className="text-default-500 text-sm">File name</p>
        <Input
          size="sm"
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
        <Popover
          placement="bottom-end"
          className="dark"
          isOpen={isOpen}
          onOpenChange={(open) => setIsOpen(open)}
        >
          <PopoverTrigger>
            <Button
              isLoading={isExporting}
              color="primary"
              startContent={<PiExportBold fontSize="1.1rem" />}
            >
              Export
            </Button>
          </PopoverTrigger>
          <PopoverContent className="dark min-w-[300px]">
            <div className="dark flex flex-col gap-3 justify-start w-full py-3">
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
              <div className="dark flex flex-row items-center gap-2">
                <Dropdown className="dark">
                  <DropdownTrigger>
                    <Button size="xs" variant="faded">
                      {exportSize}
                      <PiCaretDownBold fontSize="1rem" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    className="dark"
                    selectionMode="single"
                    selectedKeys={exportSize}
                    onSelectionChange={(selectedKeys) =>
                      setExportSize(selectedKeys)
                    }
                  >
                    <DropdownItem
                      className="dark"
                      key="1"
                      description="Default"
                    >
                      1x
                    </DropdownItem>
                    <DropdownItem
                      className="dark"
                      key="2"
                      description="Export at 2x resolution"
                    >
                      2x
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <span className="text-default-500">
                  {canvasWidth} x {canvasHeight}
                </span>
              </div>
              <Divider />
              <div className="w-full flex flex-col items-center gap-2">
                <Button
                  color="primary"
                  className="w-full"
                  onClick={() => {
                    onExport({
                      type: 'download',
                      format: 'png',
                      size: exportSize,
                    })
                    setIsOpen(false)
                  }}
                >
                  <PiDownloadBold fontSize="1.1rem" />
                  Download
                </Button>
                <Button
                  color="primary"
                  variant="light"
                  className="w-full"
                  onClick={() => {
                    onExport({
                      type: 'clipboard',
                      format: 'png',
                      size: exportSize,
                    })
                    setIsOpen(false)
                  }}
                >
                  <PiCopy fontSize="1.1rem" />
                  Copy to clipboard
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <UserMenu />
      </div>
    </div>
  )
}

export default TopBar
