import { useState, useRef, createRef, useEffect } from 'react'
import Moveable from 'react-moveable'
import Selecto from 'react-selecto'
import CanvasComponent from './CanvasComponent'
import { Button, Input, Textarea } from '@nextui-org/react'
import { PiTrash, PiTrashSimpleBold } from 'react-icons/pi'

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
  const [textElements, setTextElements] = useState([])
  const [selectedTarget, setSelectedTarget] = useState(null)
  const moveableRef = useRef(null)
  const selectoRef = useRef(null)

  // Function to add a new text element
  const addTextElement = () => {
    const newElement = {
      id: Date.now(),
      text: 'New Text',
      x: 100,
      y: 100,
      ref: createRef(),
      isEditing: false,
      fontSize: 16, // default font size
    }
    setTextElements([...textElements, newElement])
  }

  const updateText = (id, newText) => {
    setTextElements((elements) =>
      elements.map((el) => (el.id === id ? { ...el, text: newText } : el))
    )
  }

  const toggleEdit = (id, editing) => {
    setTextElements((elements) =>
      elements.map((el) => (el.id === id ? { ...el, isEditing: editing } : el))
    )
  }

  useEffect(() => {
    const deselect = (e) => {
      if (!e.target.classList.contains('target')) {
        setSelectedTarget(null)
      }
    }
    document.addEventListener('mousedown', deselect)
    return () => document.removeEventListener('mousedown', deselect)
  }, [])

  return (
    <div className="w-full flex items-center justify-center">
      <button onClick={addTextElement}>Add Text</button>
      <div
        ref={canvasRef}
        className="relative w-[800px] h-80"
        // deselect text when clicking on canvas
      >
        <Moveable
          ref={moveableRef}
          target={selectedTarget ? selectedTarget.ref.current : null}
          draggable={true}
          onDrag={({ target, left, top }) => {
            target.style.left = `${left}px`
            target.style.top = `${top}px`
          }}
          resizable={true}
          keepRatio={false}
          throttleResize={0}
          onResize={({ target, width, height }) => {
            // change font size
            target.style.fontSize = `${width / 5}px`
            target.style.width = `${width}px`
            target.style.height = `${height}px`
            target.style.transform = ''
          }}
          snappable={true}
          bounds={{ left: 0, top: 0, right: 0, bottom: 0, position: 'css' }}
        />
        <Selecto
          ref={selectoRef}
          dragContainer={canvasRef.current}
          selectableTargets={['.target']}
          selectByClick={true}
          selectFromInside={false}
          onSelect={(e) => {
            const selected = e.selected[0]
            setSelectedTarget(
              textElements.find((element) => element.ref.current === selected)
            )
          }}
        />
        {textElements.map((element) => (
          <div key={element.id}>
            <div
              ref={element.ref}
              className="target absolute z-10"
              onDoubleClick={() => toggleEdit(element.id, true)} // Use double-click for editing
              style={{
                position: 'absolute',
                left: element.x,
                top: element.y,
                fontSize: element.fontSize + 'px',
              }}
            >
              {element.isEditing ? (
                <input
                  type="text"
                  value={element.text}
                  onChange={(e) => updateText(element.id, e.target.value)}
                  onBlur={() => toggleEdit(element.id, false)}
                  autoFocus
                  style={{ fontSize: element.fontSize + 'px' }}
                />
              ) : (
                element.text
              )}
            </div>
          </div>
        ))}

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
    </div>
  )
}

export default CanvasArea
