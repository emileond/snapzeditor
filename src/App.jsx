import { useEffect, useState, useRef } from 'react'
import './App.css'
import { useForm } from 'react-hook-form'
import ExportOverlay from './components/ExportOverlay'
import TopBar from './components/TopBar'
import ToolBar from './components/ToolBar'
import CanvasArea from './components/CanvasArea'

function App() {
  const [canvasBg, setCanvasBg] = useState({
    style: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    imgSrc: null,
  })
  const [imgScale, setImgScale] = useState(1.2)
  const [imgShadow, setImgShadow] = useState(50) // 0 means no shadow by default
  const [borderRadius, setBorderRadius] = useState(20)
  const [rotationX, setRotationX] = useState(0)
  const [rotationY, setRotationY] = useState(0)
  const [canvasWidth, setCanvasWidth] = useState(1800)
  const [canvasHeight, setCanvasHeight] = useState(1400)
  const [sizeError, setSizeError] = useState(false)
  const [fileName, setFileName] = useState('my-snapshot')
  const [imgFrame, setImgFrame] = useState('macOS-dark')
  const [snapzWatermark, setSnapzWatermark] = useState(true)
  const [customWatermarkToggle, setCustomWatermarkToggle] = useState(false)
  const [customWatermarkImg, setCustomWatermarkImg] = useState()
  const [customWatermarkText, setCustomWatermarkText] = useState()
  const [showOverlay, setShowOverlay] = useState(false)

  const canvasRef = useRef(null)

  const { register, watch, setValue } = useForm()

  const watchedWidth = watch('inputWidth')
  const watchedHeight = watch('inputHeight')
  const watchedFileName = watch('inputFileName')

  // Debounce function using setTimeout and clearTimeout
  let debounceTimeout = null
  const debounce = (func, delay) => {
    return function (...args) {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout)
      }
      debounceTimeout = setTimeout(() => {
        func(...args)
      }, delay)
    }
  }

  const validateSizeDimensions = () => {
    let error = ''

    if (watchedWidth < 10) {
      error = 'Min width is 10px'
    } else if (watchedWidth > 4096) {
      error = 'Max width is 4096px'
    } else if (watchedHeight < 10) {
      error = 'Min height is 10px'
    } else if (watchedHeight > 4096) {
      error = 'Max height is 4096px'
    }

    setSizeError(error)

    // Return whether the values are valid
    return !error
  }

  useEffect(() => {
    const updateDimensions = debounce(() => {
      const isValid = validateSizeDimensions()

      if (isValid) {
        setCanvasWidth(watchedWidth)
        setCanvasHeight(watchedHeight)
      }
    }, 300)

    updateDimensions()

    // Clean up the debounce function
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout)
      }
    }
  }, [watchedWidth, watchedHeight])

  useEffect(() => {
    // use debounce to prevent too many updates
    const updateFileName = debounce(() => {
      setFileName(watchedFileName)
    }, 300)

    updateFileName()

    // clean up the debounce function
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout)
      }
    }
  }, [watchedFileName])

  return (
    <div className={`flex flex-col items-start mx-auto bg-background h-dvh`}>
      <TopBar
        canvasRef={canvasRef}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        fileName={fileName}
        register={register}
        setShowOverlay={setShowOverlay}
      />
      <div className="w-full flex flex-row p-2 h-full min-h-[700px] min-w-[900px]">
        {showOverlay && (
          <div className="absolute w-full h-full z-50">
            <ExportOverlay isVisible />
          </div>
        )}
        <ToolBar
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          sizeError={sizeError}
          register={register}
          setValue={setValue}
          imgFrame={imgFrame}
          setCanvasBg={setCanvasBg}
          setImgScale={setImgScale}
          setImgShadow={setImgShadow}
          setBorderRadius={setBorderRadius}
          setRotationX={setRotationX}
          setRotationY={setRotationY}
          setImgFrame={setImgFrame}
          snapzWatermark={snapzWatermark}
          setSnapzWatermark={setSnapzWatermark}
          customWatermarkToggle={customWatermarkToggle}
          setCustomWatermarkToggle={setCustomWatermarkToggle}
          setCustomWatermarkImg={setCustomWatermarkImg}
          setCustomWatermarkText={setCustomWatermarkText}
        />
        <CanvasArea
          canvasRef={canvasRef}
          canvasBg={canvasBg}
          imgScale={imgScale}
          imgShadow={imgShadow}
          borderRadius={borderRadius}
          rotationX={rotationX}
          rotationY={rotationY}
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          imgFrame={imgFrame}
          snapzWatermark={snapzWatermark}
          customWatermarkToggle={customWatermarkToggle}
          customWatermarkImg={customWatermarkImg}
          customWatermarkText={customWatermarkText}
        />
      </div>
    </div>
  )
}

export default App
