import {
  PiFrameCorners,
  PiCaretDownBold,
  PiExportBold,
  PiFilePng,
  PiDownloadBold,
  PiCopy,
  PiInstagramLogo,
  PiTiktokLogo,
  PiTwitterLogo,
  PiFacebookLogo,
  PiLinkedinLogo,
  PiYoutubeLogo,
  PiTwitchLogo,
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
  Select,
  SelectItem,
} from '@nextui-org/react'
import { toPng, toBlob } from 'html-to-image'
import toast from 'react-hot-toast'
import UserMenu from './UserMenu'
import { useState } from 'react'

const TopBar = ({
  canvasRef, // Add this prop
  canvasWidth,
  canvasHeight,
  sizeError,
  fileName,
  register,
  setValue,
  setShowOverlay, // Passed from parent component
}) => {
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
      <div className="flex items-center gap-2 ">
        <Image src="/snapzeditor-icon.svg" width={32} height={32} />
        <PiFrameCorners className="ml-3" fontSize="1.3rem" />
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
          className="w-28"
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
          className="w-28"
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
                      {exportSize}x
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
