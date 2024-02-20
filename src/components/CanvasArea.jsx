import { useState, useRef, useEffect, useCallback } from 'react'
import CanvasComponent from './CanvasComponent'
import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Kbd,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  Image,
} from '@nextui-org/react'
import {
  PiArrowCounterClockwiseBold,
  PiArrowSquareDownBold,
  PiArrowSquareUpBold,
  PiArrowUpRightBold,
  PiCaretDownBold,
  PiCircleBold,
  PiShapesBold,
  PiStickerBold,
  PiTextAaBold,
  PiTextTBold,
  PiTrashSimpleBold,
} from 'react-icons/pi'
import ColorPicker from './ColorPicker'
import useDebounce from '../hooks/useDebounce'
import { toBlob, toPng } from 'html-to-image'
import { createWorker } from 'tesseract.js'
import ImgEmptyState from './ImgEmptyState'
import { Rnd } from 'react-rnd'
import EditableText from './EditableText'
import { useHotkeys } from 'react-hotkeys-hook'

const CanvasArea = ({
  canvasRef,
  canvasBg,
  imgScale,
  imgPosition,
  imgShadow,
  borderRadius,
  rotationX,
  rotationY,
  canvasWidth,
  canvasHeight,
  imgFrame,
  imgVisibility,
  snapzWatermark,
  customWatermarkToggle,
  customWatermarkImg,
  customWatermarkText,
  startExport,
  onExported,
  extractText,
  onExtractedText,
  onImageLoaded,
  triggerReplaceImage,
  fileName,
}) => {
  const [scaledWidth, setScaledWidth] = useState(0)
  const [scaledHeight, setScaledHeight] = useState(0)
  const wrapperRef = useRef()
  const canvasComponentRef = useRef()
  const stickers = 28

  // Debounce the dimensions
  const debouncedWidth = useDebounce(canvasWidth, 200)
  const debouncedHeight = useDebounce(canvasHeight, 200)

  const [selectedShape, setSelectedShape] = useState(null)

  const [selectedElement, setSelectedElement] = useState(null)
  const [hideHandles, setHideHandles] = useState(false)
  const handleStyles = {
    border: '2px solid #5c7cfa',
    backgroundColor: '#fff',
    width: '16px',
    height: '16px',
    borderRadius: '30%',
  }

  // Shortcuts
  useHotkeys('esc', () => {
    setSelectedElement(null)
  })

  useHotkeys('delete', () => {
    if (selectedElement) {
      deleteAnnotation(selectedElement)
    }
  })

  // hot key for duplicating the selected element
  useHotkeys('meta+d', () => {
    if (selectedElement) {
      const duplicatedElement = {
        ...selectedElement,
        id: `${selectedElement.id}-${Date.now()}`,
        text: `${selectedElement.text} (copy)`,
      }
      setRenderedAnnotations([...renderedAnnotations, duplicatedElement])
    }
  })

  const createCircle = () => {
    const newAnnotations = [
      ...renderedAnnotations,
      {
        id: `circle-${Date.now()}`,
        type: 'circle',
        fill: '#000',
      },
    ]
    setRenderedAnnotations(newAnnotations)

    setSelectedElement(
      newAnnotations.length > 0
        ? {
            id: newAnnotations[newAnnotations.length - 1].id,
            index: newAnnotations.length - 1,
            type: 'circle',
          }
        : null
    )
  }

  const createRectangle = () => {
    const newAnnotations = [
      ...renderedAnnotations,
      {
        id: `rectangle-${Date.now()}`,
        type: 'rectangle',
        fill: '#000',
      },
    ]
    setRenderedAnnotations(newAnnotations)

    setSelectedElement(
      newAnnotations.length > 0
        ? {
            id: newAnnotations[newAnnotations.length - 1].id,
            index: newAnnotations.length - 1,
            type: 'rectangle',
          }
        : null
    )
  }

  const createArrow = () => {
    return
  }

  const createLabel = () => {
    const newAnnotations = [
      ...renderedAnnotations,
      {
        id: `label-${Date.now()}`,
        type: 'label',
        text: 'Double click to edit',
        size: 'lg',
        color: '#000',
        weight: '500',
      },
    ]

    setRenderedAnnotations(newAnnotations)

    setSelectedElement(
      newAnnotations.length > 0
        ? {
            id: newAnnotations[newAnnotations.length - 1].id,
            index: newAnnotations.length - 1,
            type: 'label',
          }
        : null
    )
  }

  const [renderedAnnotations, setRenderedAnnotations] = useState([])

  const createSticker = (n) => {
    const newAnnotations = [
      ...renderedAnnotations,
      {
        id: `sticker-${n}-${Date.now()}`,
        type: 'sticker',
        src: `/stickers/${n}.svg`,
      },
    ]
    setRenderedAnnotations(newAnnotations)

    setSelectedElement(
      newAnnotations.length > 0
        ? {
            id: newAnnotations[newAnnotations.length - 1].id,
            index: newAnnotations.length - 1,
            type: 'sticker',
          }
        : null
    )
  }

  const deleteAnnotation = (element) => {
    const newAnnotations = renderedAnnotations.filter(
      (el) => el.id !== element.id
    )
    setRenderedAnnotations(newAnnotations)
    setSelectedElement(null)
  }

  const updateShape = (attr, val) => {
    return
  }

  const updateText = (element, attr, val) => {
    // update the element in the array
    const newAnnotations = renderedAnnotations.map((el) =>
      el.id === element.id ? { ...el, [attr]: val } : el
    )

    // update the state
    setRenderedAnnotations(newAnnotations)

    // update the selected element
    setSelectedElement({
      ...element,
      [attr]: val,
    })
  }

  const resizeCanvas = () => {
    const wrapper = wrapperRef.current
    if (wrapper) {
      const maxWidth = wrapper.clientWidth
      const maxHeight = wrapper.clientHeight

      let newWidth = debouncedWidth
      let newHeight = debouncedHeight

      // Keep reducing the size by 10% until it fits within the maximum dimensions
      while (newWidth > maxWidth || newHeight > maxHeight) {
        newWidth *= 0.85 // Reduce width by 10%
        newHeight *= 0.85 // Reduce height by 10%
      }

      // Apply Math.floor to avoid subpixel rendering issues and to ensure the canvas is not larger than the max dimensions
      newWidth = Math.floor(newWidth)
      newHeight = Math.floor(newHeight)

      setScaledWidth(newWidth)
      setScaledHeight(newHeight)
    }
  }

  // Resize the canvas when the window is resized, or when user changes the canvas dimensions
  useEffect(() => {
    window.addEventListener('resize', resizeCanvas)
    resizeCanvas() // Initial setup

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [debouncedWidth, debouncedHeight])

  // shortcuts modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleExport = async (options) => {
    if (canvasRef.current) {
      if (options.type === 'download') {
        try {
          const dataUrl = await toPng(canvasRef.current, {
            canvasWidth: canvasWidth,
            canvasHeight: canvasHeight,
          })

          // Trigger download
          const link = document.createElement('a')
          link.download = `${fileName}.png`
          link.href = dataUrl
          link.click()
        } catch (err) {
          console.error('Could not export to PNG:', err)
        }
      } else if (options.type === 'clipboard') {
        try {
          const blob = await toBlob(canvasRef.current, {
            canvasWidth: canvasWidth,
            canvasHeight: canvasHeight,
          })

          const clipboardItem = new ClipboardItem({ [blob.type]: blob })
          await navigator.clipboard.write([clipboardItem])
        } catch (err) {
          console.error('Could not export to clipboard:', err)
        }
      }
    }
    onExported(true)
  }

  // OCR
  async function doOCR(lang = 'eng') {
    const worker = await createWorker(lang)
    const data = (await worker.recognize(imageSrc)).data.lines

    const filteredData = data.filter((line) => line.confidence >= 85)

    await worker.terminate()

    onExtractedText(filteredData)
  }

  useEffect(() => {
    if (extractText) {
      doOCR(extractText)
    }
  }, [extractText])

  useEffect(() => {
    if (startExport?.type) {
      handleExport(startExport)
    }
  }, [startExport])

  const [imageSrc, setImageSrc] = useState(null)
  const [initialScale, setInitialScale] = useState(1)

  const loadImage = useCallback(
    (imgSrc, file) => {
      const img = new window.Image()
      img.src = imgSrc
      img.onload = () => {
        let aspectScale

        const MARGIN = 16

        // Compute the available width and height for the image within the canvas
        const availableWidth = scaledWidth - MARGIN * 2
        const availableHeight = scaledHeight - MARGIN * 2

        // Compute the width and height scale factors
        const widthScale = availableWidth / img.width
        const heightScale = availableHeight / img.height

        // Determine the scale factor based on the smaller of the two to ensure the image fits within the canvas
        aspectScale = Math.min(widthScale, heightScale)

        // If the image is smaller than the canvas minus margins, don't scale it up
        if (aspectScale > 1) {
          aspectScale = 1
        }

        setInitialScale(aspectScale)
        setImageSrc(imgSrc)
        onImageLoaded({ loaded: true, data: file })
      }
    },
    [scaledWidth, scaledHeight]
  )

  const handleUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/jpeg, image/png, image/jpg'
    input.onchange = () => {
      const reader = new FileReader()
      const file = input.files[0]
      reader.readAsDataURL(file)
      reader.onload = () => {
        loadImage(reader.result, file)
      }
    }
    // handle cancel
    input.oncancel = () => {
      return
    }
    input.click()
  }

  useEffect(() => {
    if (triggerReplaceImage) {
      handleUpload()
    }
  }, [triggerReplaceImage])

  const handlePaste = (e) => {
    const clipboardData = e.clipboardData || window.Clipboard
    if (!clipboardData) {
      return
    }

    // Check for items (modern browsers)
    if (clipboardData.items) {
      const items = clipboardData.items
      for (let i = 0; i < items.length; i++) {
        // If the item is an image
        if (items[i].type.indexOf('image') !== -1) {
          // Convert the clipboard item to a blob
          const blob = items[i].getAsFile()
          const reader = new FileReader()

          reader.onload = (event) => {
            loadImage(event.target.result)
          }

          // Read the blob as a data URL
          reader.readAsDataURL(blob)
          break
        }
      }
    } else if (clipboardData.files && clipboardData.files.length > 0) {
      // Check for files (older browsers)
      const file = clipboardData.files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        loadImage(event.target.result)
      }

      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    const handleClickOnCanvas = (e) => {
      if (wrapperRef.current) {
        // check if the selected element contains class dnd-element or annotation-edit-mode
        if (
          e.target.closest('.dnd-element') ||
          e.target.closest('.annotation-edit-mode')
        ) {
          setHideHandles(false)
          return
        } else {
          setSelectedElement(null)
          setHideHandles(false)
        }
      }
    }
    document.addEventListener('click', handleClickOnCanvas)
    document.addEventListener('contextmenu', handleClickOnCanvas)
    return () => {
      document.removeEventListener('click', handleClickOnCanvas)
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      // className="w-full flex flex-col items-center justify-center overflow-hidden"
      className="w-full flex flex-col items-center justify-center"
    >
      {!imageSrc && (
        <ImgEmptyState
          loadImage={loadImage}
          handleUpload={handleUpload}
          handlePaste={handlePaste}
        />
      )}
      <div
        ref={canvasRef}
        className="relative flex items-center justify-center"
        style={{
          width: scaledWidth,
          height: scaledHeight,
        }}
      >
        {snapzWatermark && (
          <div className="absolute bottom-0 right-0 m-6 bg-white/80 px-2 py-1 rounded-lg z-20">
            <div className="flex flex-col">
              <span className="text-default text-sm">Made with </span>
              <div className="flex gap-2 items-center">
                <Image src="/snapzeditor-icon.svg" width={20} height={20} />
                <span className="text-default text-sm font-semibold">
                  snapseditor.com
                </span>
              </div>
            </div>
          </div>
        )}
        {customWatermarkToggle && (
          <div className="absolute bottom-0 right-0 m-6 bg-white/80 px-2 py-1 rounded-lg z-20">
            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                {customWatermarkImg && (
                  <Image src={customWatermarkImg} width={20} height={20} />
                )}
                {customWatermarkText && (
                  <span className="text-default text-sm font-semibold">
                    {customWatermarkText}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
        {renderedAnnotations.map((element, i) => {
          return (
            <Rnd
              key={element.id}
              className="dnd-element"
              default={{
                x: 0,
                y: 0,
              }}
              style={{
                zIndex: 1,
                border:
                  selectedElement?.id === element.id
                    ? '2px solid #5c7cfa'
                    : 'none',
              }}
              bounds="parent"
              lockAspectRatio={element?.type === 'sticker' ? true : false}
              resizeHandleStyles={
                selectedElement?.id === element.id && !hideHandles
                  ? {
                      topRight: {
                        ...handleStyles,
                      },
                      topLeft: {
                        ...handleStyles,
                      },
                      bottomRight: {
                        ...handleStyles,
                      },
                      bottomLeft: {
                        ...handleStyles,
                      },
                    }
                  : {}
              }
              onMouseDown={() => setSelectedElement(element)}
            >
              {element?.type === 'sticker' && (
                <div
                  style={{
                    backgroundImage: `url(${element?.src})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    padding: '50px',
                  }}
                />
              )}
              {element?.type === 'label' && (
                <div
                  style={{
                    padding: '8px',
                  }}
                >
                  <EditableText
                    color={element?.color}
                    size={element?.size}
                    weight={element?.weight}
                    initialText={element?.text}
                    onEdit={(isEditing) => {
                      if (isEditing) {
                        setHideHandles(true)
                      }
                    }}
                    onChange={(text) => {
                      updateText(element, 'text', text)
                    }}
                  />
                </div>
              )}
              {element?.type === 'circle' && (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    padding: '50px',
                    borderRadius: '50%',
                    backgroundColor: element?.fill,
                  }}
                />
              )}
              {element?.type === 'rectangle' && (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: element?.fill,
                  }}
                />
              )}
            </Rnd>
          )
        })}
        <CanvasComponent
          ref={canvasComponentRef}
          canvasBg={canvasBg}
          imgSrc={imageSrc}
          imgScale={initialScale}
          imgPosition={imgPosition}
          sliderScale={imgScale}
          shadow={imgShadow}
          borderRadius={borderRadius}
          rotationX={rotationX}
          rotationY={rotationY}
          imgFrame={imgFrame}
          imgVisibility={imgVisibility}
          snapzWatermark={snapzWatermark}
          customWatermark={customWatermarkToggle}
          customWatermarkImg={customWatermarkImg}
          customWatermarkText={customWatermarkText}
        />
      </div>
      <div className="w-fit flex min-h-14 mt-4">
        <div className="w-full h-full flex gap-4 items-center bg-content2 rounded-lg px-4">
          {selectedElement ? (
            <div className="annotation-edit-mode flex gap-4 items-center">
              <h6 className="text-default-600 text-sm font-medium">
                Edit {selectedElement.type}
              </h6>
              <Divider orientation="vertical" className="h-6" />
              <div className="flex gap-2 items-center">
                <span className="text-sm text-white">Color:</span>
                <ColorPicker
                  editAnnotation
                  onChange={(color) => {
                    const type = selectedElement.type
                    switch (type) {
                      case 'circle':
                        updateShape('fill', color)
                        break
                      case 'arrow':
                        updateShape('stroke', color)
                        break
                      case 'label':
                        updateText(selectedElement, 'color', color)

                        break
                      default:
                        break
                    }
                  }}
                  defaultColor={selectedElement?.color}
                  showInput={false}
                />
              </div>
              {selectedElement?.type === 'label' && (
                <>
                  <Dropdown className="dark">
                    <DropdownTrigger>
                      <Button
                        size="sm"
                        variant="ghost"
                        startContent={<PiTextAaBold fontSize="1.1rem" />}
                        endContent={<PiCaretDownBold fontSize="1.1rem" />}
                      >
                        Size
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Size"
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={[selectedElement?.size]}
                      onSelectionChange={(selectedKeys) => {
                        updateText(selectedElement, 'size', selectedKeys[0])
                      }}
                    >
                      <DropdownItem
                        key="xs"
                        onClick={() =>
                          updateText(selectedElement, 'size', 'xs')
                        }
                      >
                        Extra small
                      </DropdownItem>
                      <DropdownItem
                        key="sm"
                        onClick={() =>
                          updateText(selectedElement, 'size', 'sm')
                        }
                      >
                        Small
                      </DropdownItem>
                      <DropdownItem
                        key="md"
                        onClick={() =>
                          updateText(selectedElement, 'size', 'md')
                        }
                      >
                        Medium
                      </DropdownItem>
                      <DropdownItem
                        key="lg"
                        onClick={() =>
                          updateText(selectedElement, 'size', 'lg')
                        }
                      >
                        Large
                      </DropdownItem>
                      <DropdownItem
                        key="xl"
                        onClick={() =>
                          updateText(selectedElement, 'size', 'xl')
                        }
                      >
                        Extra large
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Dropdown className="dark">
                    <DropdownTrigger>
                      <Button
                        size="sm"
                        variant="ghost"
                        startContent={<PiTextTBold fontSize="1.1rem" />}
                        endContent={<PiCaretDownBold fontSize="1.1rem" />}
                      >
                        Weight
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Weight"
                      selectionMode="single"
                      selectedKeys={[selectedElement?.weight]}
                      onSelectionChange={(selectedKeys) => {
                        updateText(selectedElement, 'weight', selectedKeys[0])
                      }}
                    >
                      <DropdownItem
                        key="200"
                        onClick={() =>
                          updateText(selectedElement, 'weight', '200')
                        }
                      >
                        Thin
                      </DropdownItem>
                      <DropdownItem
                        key="300"
                        onClick={() =>
                          updateText(selectedElement, 'weight', '300')
                        }
                      >
                        Light
                      </DropdownItem>
                      <DropdownItem
                        key="400"
                        onClick={() =>
                          updateText(selectedElement, 'weight', '400')
                        }
                      >
                        Regular
                      </DropdownItem>
                      <DropdownItem
                        key="500"
                        onClick={() =>
                          updateText(selectedElement, 'weight', '500')
                        }
                      >
                        Medium
                      </DropdownItem>
                      <DropdownItem
                        key="700"
                        onClick={() =>
                          updateText(selectedElement, 'weight', '700')
                        }
                      >
                        Bold
                      </DropdownItem>
                      <DropdownItem
                        key="900"
                        onClick={() =>
                          updateText(selectedElement, 'weight', '800')
                        }
                      >
                        Black
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </>
              )}
              <Button
                variant="light"
                onClick={() => {
                  const index = renderedAnnotations.findIndex(
                    (el) => el.id === selectedElement.id
                  )
                  const newAnnotations = [
                    ...renderedAnnotations.slice(0, index),
                    ...renderedAnnotations.slice(index + 1),
                    selectedElement,
                  ]
                  setRenderedAnnotations(newAnnotations)
                }}
                startContent={<PiArrowSquareUpBold fontSize="1.1rem" />}
              >
                Move up
              </Button>
              <Button
                variant="light"
                onClick={() => {
                  const index = renderedAnnotations.findIndex(
                    (el) => el.id === selectedElement.id
                  )
                  const newAnnotations = [
                    selectedElement,
                    ...renderedAnnotations.slice(0, index),
                    ...renderedAnnotations.slice(index + 1),
                  ]
                  setRenderedAnnotations(newAnnotations)
                }}
                startContent={<PiArrowSquareDownBold fontSize="1.1rem" />}
              >
                Move down
              </Button>
              <Button
                color="danger"
                variant="light"
                onClick={() => {
                  deleteAnnotation(selectedElement)
                }}
                startContent={<PiTrashSimpleBold fontSize="1.1rem" />}
              >
                Delete
              </Button>
            </div>
          ) : (
            <>
              <Dropdown className="dark">
                <DropdownTrigger>
                  <Button
                    size="sm"
                    variant="ghost"
                    startContent={<PiShapesBold fontSize="1.1rem" />}
                    endContent={<PiCaretDownBold fontSize="1.1rem" />}
                  >
                    Shapes
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Add shape"
                  selectionMode="single"
                  selectedKeys={selectedShape}
                  onSelectionChange={(selectedKeys) =>
                    setSelectedShape(selectedKeys)
                  }
                >
                  <DropdownItem
                    key="circle"
                    onClick={createCircle}
                    startContent={<PiCircleBold fontSize="1.1rem" />}
                  >
                    Circle
                  </DropdownItem>
                  <DropdownItem
                    key="arrow"
                    onClick={createArrow}
                    startContent={<PiArrowUpRightBold fontSize="1.1rem" />}
                  >
                    Arrow
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Button
                size="sm"
                variant="ghost"
                startContent={<PiTextTBold fontSize="1.1rem" />}
                onClick={createLabel}
              >
                Text
              </Button>
              <Popover className="dark">
                <PopoverTrigger>
                  <Button
                    size="sm"
                    variant="ghost"
                    startContent={<PiStickerBold fontSize="1.1rem" />}
                  >
                    Stickers
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-wrap gap-2 max-w-[200px]">
                    {Array.from(Array(stickers).keys()).map((i) => (
                      <Button
                        key={i}
                        size="sm"
                        variant="ghost"
                        onClick={() => createSticker(i + 1)}
                        isIconOnly
                      >
                        <img
                          src={`/stickers/${i + 1}.svg`}
                          alt={`Sticker ${i + 1}`}
                          className="w-6 h-6"
                        />
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              <Button
                size="sm"
                variant="ghost"
                startContent={<PiArrowCounterClockwiseBold fontSize="1.1rem" />}
                onClick={() => {
                  setRenderedAnnotations([])
                }}
              >
                Reset
              </Button>
              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                className="dark"
              >
                <ModalContent>
                  <ModalHeader>Shortcuts</ModalHeader>
                  <ModalBody className="flex flex-col gap-4">
                    <div className="flex gap-2">
                      <Kbd>del</Kbd>
                      <span className="text-default-500">
                        Delete selected shape
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Kbd> esc</Kbd>
                      <span className="text-default-500">
                        Deselect all shapes
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Kbd>shift</Kbd>
                      <span className="text-default-500">
                        Hold to scale proportionally
                      </span>
                    </div>
                  </ModalBody>
                  <ModalFooter />
                </ModalContent>
              </Modal>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CanvasArea
