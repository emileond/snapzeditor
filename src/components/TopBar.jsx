import {
  PiCaretDownBold,
  PiExportBold,
  PiFilePng,
  PiDownloadBold,
  PiCopy,
  PiTextTBold,
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
import { toPng, toBlob } from 'html-to-image'
import toast from 'react-hot-toast'
import UserMenu from './UserMenu'
import { useState } from 'react'

const TopBar = ({
  canvasRef, // Add this prop
  canvasWidth,
  canvasHeight,
  fileName,
  register,
  setShowOverlay, // Passed from parent component
}) => {
  const [exportSize, setExportSize] = useState('1x')

  const displayToast = (variant, text) => {
    const style = {
      background: '#1d1d1d',
      color: '#fff',
    }
    switch (variant) {
      case 'success':
        toast.success(text, {
          style,
        })
        break
      case 'error':
        toast.error(text, {
          style,
        })
        break
      default:
        toast(text, {
          style,
        })
        break
    }
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
    setShowOverlay(true) // Show overlay when download starts
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

        setShowOverlay(false) // Hide overlay on success
        displayToast('success', 'Image downloaded!')
      })
      .catch(function (error) {
        console.error('Error capturing image:', error)

        // Ensure scaling is reverted even if there's an error
        node.style.transform = ''
        node.style.transformOrigin = ''

        setShowOverlay(false) // Hide overlay on error
        displayToast('error', 'Error, please try again')
      })
  }

  const handleCopyToClipboard = () => {
    setShowOverlay(true)
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
        // Revert scaling after copying to ensure the display remains unchanged
        node.style.transform = ''
        node.style.transformOrigin = ''
        setShowOverlay(false)
        displayToast('success', 'Image copied to clipboard!')
      })
      .catch((error) => {
        console.error('Error copying image to clipboard:', error)

        // Ensure scaling is reverted even if there's an error
        node.style.transform = ''
        node.style.transformOrigin = ''
        setShowOverlay(false)
        displayToast('error', 'Error, please try again')
      })
  }

  return (
    <div
      id="topbar"
      className="flex justify-between items-center py-1 px-4 bg-content1 w-full"
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
        <Popover placement="bottom-end" className="dark">
          <PopoverTrigger>
            <Button
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
                  onClick={handleDownload}
                >
                  <PiDownloadBold fontSize="1.1rem" />
                  Download
                </Button>
                <Button
                  color="primary"
                  variant="light"
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
        <UserMenu />
      </div>
    </div>
  )
}

export default TopBar
