import { useState, useRef, createRef, useEffect } from 'react'
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
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from '@nextui-org/react'
import {
  PiArrowCounterClockwiseBold,
  PiArrowUpRightBold,
  PiCaretDownBold,
  PiCircleBold,
  PiCommandBold,
  PiKeyboardBold,
  PiShapes,
  PiShapesBold,
  PiTextTBold,
  PiTrash,
  PiTrashSimpleBold,
} from 'react-icons/pi'
import ColorPicker from './ColorPicker'

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
}) => {
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

  // useEffect to update the canvas when the props change
  const [editorExport, setEditorExport] = useState()

  // export editor
  async function exportEditor() {
    const data = await editor.export.toJson()
    return setEditorExport(data)
  }

  // if canvasWidth or canvasHeight changes, save the current board shapes to state, and remove the board, then re-add the board with the new dimensions
  useEffect(() => {
    if (editor) {
      // console.log(editor)
      // const shapes = editor.board.shapes
      // setBoardShapes(shapes)
      exportEditor()
      // editor.reset()
    }
  }, [canvasWidth, canvasHeight])

  useEffect(() => {
    if (editor) {
      editor.snapGrid.enable()
      setupEditorListeners()
    }
  }, [editor])

  // if editorExport changes, load the new board
  useEffect(() => {
    if (editorExport && editor) {
      const stringifiedConfig = JSON.stringify({
        stage: {
          attrs: {
            width: canvasWidth / 2,
            height: canvasHeight / 2,
            x: 0,
            y: 0,
          },
          filters: [],
          className: 'Stage',
        },
        layer: {
          attrs: {
            x: 0,
            y: 0,
            width: canvasWidth / 2,
            height: canvasHeight / 2,
          },
          filters: [],
          className: 'Layer',
        },
        background: {
          image: {
            attrs: {
              x: 0,
              y: 0,
            },
            filters: [],
            className: 'Image',
            zIndex: 0,
          },
          overlay: {
            attrs: {
              x: 0,
              y: 0,
            },
            filters: [],
            className: 'Rect',
            zIndex: 1,
          },
        },
        shapes: editorExport.shapes,
      })
      editor.load(stringifiedConfig)
      setupEditorListeners()
    }
  }, [editorExport, editor])

  // shortcuts modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div
        ref={canvasRef}
        className="relative"
        style={{
          width: canvasWidth / 2,
          height: canvasHeight / 2,
          background: canvasBg.style,
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
          canvasBg={canvasBg}
          sliderScale={imgScale}
          shadow={imgShadow}
          borderRadius={borderRadius}
          rotationX={rotationX}
          rotationY={rotationY}
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
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
                // size="sm"
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
