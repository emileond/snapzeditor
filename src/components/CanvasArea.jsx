import { useState, useRef, useEffect } from 'react'
import CanvasComponent from './CanvasComponent'
import usePikaso from 'pikaso-react-hook'
import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
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
} from '@nextui-org/react'
import {
  PiArrowCounterClockwiseBold,
  PiArrowUpRightBold,
  PiCaretDownBold,
  PiCircleBold,
  PiCommandBold,
  PiShapesBold,
  PiStickerBold,
  PiTextTBold,
  PiTrashSimpleBold,
} from 'react-icons/pi'
import ColorPicker from './ColorPicker'
import useDebounce from '../hooks/useDebounce'
import { toBlob, toPng } from 'html-to-image'

const CanvasArea = ({
  canvasRef,
  canvasBg,
  imgScale,
  imgShadow,
  borderRadius,
  rotationX,
  rotationY,
  canvasWidth,
  canvasHeight,
  imgFrame,
  snapzWatermark,
  customWatermarkToggle,
  customWatermarkImg,
  customWatermarkText,
  startExport,
  onExported,
}) => {
  const [scaledWidth, setScaledWidth] = useState(0)
  const [scaledHeight, setScaledHeight] = useState(0)
  const wrapperRef = useRef()
  const canvasComponentRef = useRef()
  const stickers = 28

  // Debounce the dimensions
  const debouncedWidth = useDebounce(canvasWidth, 300)
  const debouncedHeight = useDebounce(canvasHeight, 300)

  const [showPopover, setShowPopover] = useState(false)
  const [selectedShape, setSelectedShape] = useState(null)
  const [defaultColor, setDefaultColor] = useState('#FFFFFF')

  const [ref, editor] = usePikaso({
    selection: {
      keyboard: {
        map: {
          delete: 'Delete',
        },
      },
      transformer: {
        borderStroke: '#338ef7',
        borderStrokeWidth: 2,
        anchorSize: 10,
        anchorFill: '#fff',
        anchorStrokeWidth: 2,
        anchorStroke: '#338ef7',
      },
    },
    snapToGrid: {
      strokeWidth: 1,
      stroke: '#9353d3',
      dash: [4, 4],
    },
    measurement: {
      enabled: true,
      background: {
        fill: '#006FEE',
      },
      text: {
        padding: 5,
        fill: '#fff',
        fontSize: 14,
      },
    },
  })

  const setupEditorListeners = () => {
    if (!editor) return

    editor.on('selection:change', (event) => {
      if (event.shapes.length === 1) {
        const type = event.shapes[0].type
        setSelectedShape(type)
        switch (type) {
          case 'circle':
            setDefaultColor(event.shapes[0].node.getAttrs().fill)
            break
          case 'arrow':
            setDefaultColor(event.shapes[0].node.getAttrs().stroke)
            break
          case 'label':
            setDefaultColor(event.shapes[0].node.children[1].getAttrs().fill)
            break
          default:
            break
        }
        setShowPopover(true)
      } else {
        setShowPopover(false)
      }
    })
  }
  const createCircle = () => {
    editor.shapes.circle.insert({
      x: 200,
      y: 200,
      radius: 50,
      fill: '#180828',
    })
  }

  const createArrow = () => {
    editor.shapes.arrow.insert({
      points: [50, 50, 300, 50],
      stroke: '#180828',
      strokeWidth: 10,
    })
  }

  const createLabel = () => {
    editor.shapes.label.insert({
      container: { x: 200, y: 200 },
      tag: { fill: 'transparent' },
      text: { text: 'New text', fontSize: 32, fill: '#180828' },
    })
  }

  const createSticker = (n) => {
    editor.shapes.image.insert(`/stickers/${n}.svg`, {
      scaleX: 0.25,
      scaleY: 0.25,
    })
  }

  const updateShape = (attr, val) => {
    editor.board.selection.shapes[0].update({ [attr]: val })
  }

  const updateText = (section, attr, val) => {
    if (section === 'tag') {
      editor.board.selection.shapes[0].node.children[0].setAttr(attr, val)
    }
    if (section === 'text') {
      editor.board.selection.shapes[0].node.children[1].setAttr(attr, val)
    }
  }

  const resetEditor = () => {
    editor.reset()
    setupEditorListeners()
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

  useEffect(() => {
    window.addEventListener('resize', resizeCanvas)
    resizeCanvas() // Initial setup

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [debouncedWidth, debouncedHeight])

  useEffect(() => {
    console.log('dimensions', scaledWidth, scaledHeight)
    if (editor) {
      editor?.board?.stage?.size({
        width: scaledWidth,
        height: scaledHeight,
      })
      editor.board.stage.draw()
      console.log('stage size', editor.board.stage.getSize())
    }
  }, [scaledWidth, scaledHeight])

  useEffect(() => {
    if (editor) {
      editor.snapGrid.enable()
      setupEditorListeners()
    }
  }, [editor])

  // shortcuts modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleExport = async (options) => {
    if (canvasRef.current) {
      canvasComponentRef.current.style.width = `${canvasWidth}px`
      canvasComponentRef.current.style.height = `${canvasHeight}px`

      canvasRef.current.style.width = `${canvasWidth}px`
      canvasRef.current.style.height = `${canvasHeight}px`

      // calculate the scale factor
      const scale = canvasWidth / scaledWidth
      editor.board.stage.scale({ x: scale, y: scale })
      editor.board.stage.size({
        width: canvasWidth,
        height: canvasHeight,
      })

      if (options.type === 'download') {
        try {
          // Use the original aspect ratio for scaling
          const dataUrl = await toPng(canvasRef.current, {
            width: canvasWidth,
            height: canvasHeight,
          })

          // Trigger download
          const link = document.createElement('a')
          link.download = 'exported-image.png'
          link.href = dataUrl
          link.click()
        } catch (err) {
          console.error('Could not export to PNG:', err)
        }
      } else if (options.type === 'clipboard') {
        try {
          const blob = await toBlob(canvasRef.current, {
            width: canvasWidth,
            height: canvasHeight,
          })

          const clipboardItem = new ClipboardItem({ [blob.type]: blob })
          await navigator.clipboard.write([clipboardItem])
        } catch (err) {
          console.error('Could not export to clipboard:', err)
        }
      }
    }
    // Revert scaling after capturing to ensure the display remains unchanged
    editor.board.stage.scale({ x: 1, y: 1 })
    editor.board.stage.size({
      width: scaledWidth,
      height: scaledHeight,
    })
    editor.board.stage.draw()
    canvasComponentRef.current.style.width = `${scaledWidth}px`
    canvasComponentRef.current.style.height = `${scaledHeight}px`

    canvasRef.current.style.width = `${scaledWidth}px`
    canvasRef.current.style.height = `${scaledHeight}px`
    onExported(true)
  }

  useEffect(() => {
    if (startExport?.type) {
      handleExport(startExport)
    }
  }, [startExport])

  return (
    <div
      ref={wrapperRef}
      className="w-full flex flex-col items-center justify-center overflow-hidden"
    >
      <div
        ref={canvasRef}
        className="relative"
        style={{
          width: scaledWidth,
          height: scaledHeight,
          // background: canvasBg.style,
        }}
      >
        <div
          ref={ref}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        />
        <CanvasComponent
          ref={canvasComponentRef}
          canvasBg={canvasBg.style}
          sliderScale={imgScale}
          shadow={imgShadow}
          borderRadius={borderRadius}
          rotationX={rotationX}
          rotationY={rotationY}
          canvasWidth={scaledWidth}
          canvasHeight={scaledHeight}
          imgFrame={imgFrame}
          snapzWatermark={snapzWatermark}
          customWatermark={customWatermarkToggle}
          customWatermarkImg={customWatermarkImg}
          customWatermarkText={customWatermarkText}
        />
      </div>
      <div className="w-fit flex min-h-14 mt-4">
        <div className="w-full h-full flex gap-4 items-center bg-content2 rounded-lg px-4">
          {showPopover ? (
            <>
              <h6 className="text-default-700 text-sm font-medium">
                Edit {editor?.board?.selection?.shapes[0]?.type}
              </h6>
              <Divider orientation="vertical" className="h-6" />
              <div className="flex gap-2 items-center">
                <span className="text-default-500 text-sm">Color:</span>
                <ColorPicker
                  onChange={(color) => {
                    const shape = editor.board.selection.shapes[0].type
                    switch (shape) {
                      case 'circle':
                        updateShape('fill', color)
                        break
                      case 'arrow':
                        updateShape('stroke', color)
                        break
                      case 'label':
                        updateText('text', 'fill', color)

                        break
                      default:
                        break
                    }
                  }}
                  defaultColor={defaultColor}
                  showInput={false}
                />
              </div>
              {selectedShape === 'circle' && (
                <div className="flex gap-2 items-center">
                  <span className="text-default-500 text-sm">Stroke:</span>
                  <ColorPicker
                    onChange={(color) => {
                      updateShape('stroke', color)
                    }}
                    defaultColor={defaultColor}
                    showInput={false}
                  />
                </div>
              )}
              {selectedShape === 'label' && (
                <div className="flex gap-2 items-center">
                  <span className="text-default-500 text-sm">Size:</span>
                  <Input
                    type="number"
                    size="xs"
                    variant="bordered"
                    placeholder="Font size"
                    classNames={{
                      input: 'w-12',
                      inputWrapper: ['min-h-9', 'h-9'],
                    }}
                    defaultValue={
                      editor.board.selection.shapes[0].node.children[1].getAttrs()
                        .fontSize
                    }
                    onChange={(e) =>
                      updateText(
                        'text',
                        'fontSize',
                        parseInt(e.target.value) || 32
                      )
                    }
                  />
                </div>
              )}
              <Button
                color="danger"
                variant="light"
                onClick={() => editor.board.selection.shapes[0].delete()}
              >
                <PiTrashSimpleBold fontSize="1rem" />
                Delete
              </Button>
            </>
          ) : (
            <>
              <h6 className="text-default-700 text-sm font-medium">
                Annotations
              </h6>
              <Dropdown className="dark">
                <DropdownTrigger>
                  <Button
                    size="sm"
                    variant="ghost"
                    startContent={<PiShapesBold fontSize="1.1rem" />}
                    endContent={<PiCaretDownBold fontSize="1.1rem" />}
                  >
                    Add shape
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
                Add text
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
                onClick={resetEditor}
              >
                Reset
              </Button>
              <Button
                size="sm"
                variant="flat"
                startContent={<PiCommandBold fontSize="1.1rem" />}
                onPress={onOpen}
              >
                Shortcuts
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
