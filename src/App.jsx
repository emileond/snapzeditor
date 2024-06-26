import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import './App.css'
import { useForm } from 'react-hook-form'
import ExportOverlay from './components/ExportOverlay'
import TopBar from './components/TopBar'
import CanvasArea from './components/CanvasArea'
import toast from 'react-hot-toast'
import { useUser } from '@supabase/auth-helpers-react'
import { useCheckLicense } from './hooks/useLicenseCheck'
import { useFingerprint } from './context/FingerprintContext'
import { useLicense } from './context/LicenseContext'
import ToolBarScreenshot from './components/ToolBarScreenshot'
import ToolBarDev from './components/ToolBarDev'
import { useEditorMode } from './context/EditorModeContext'
import ToolBarAI from './components/ToolBarAI'
import EditorLinks from './components/EditorLinks'
import AICanvasFeed from './components/AICanvasFeed'
import { editorModes } from './components/editorModes'

function useQuery() {
  const { search } = useLocation()
  return new URLSearchParams(search)
}

function App() {
  const user = useUser()
  const query = useQuery()
  const urlMode = query.get('mode')
  const navigate = useNavigate()
  const { mode, setMode } = useEditorMode()
  const fingerprint = useFingerprint()
  const { checkLicense } = useCheckLicense()
  const { license } = useLicense()
  const [imgVisibility, setImgVisibility] = useState(true)
  const [triggerReplaceImage, setTriggerReplaceImage] = useState(false)
  const [imgScale, setImgScale] = useState(1)
  const [imgPosition, setImgPosition] = useState('center')
  const [imgShadow, setImgShadow] = useState(50) // 0 means no shadow by default
  const [borderRadius, setBorderRadius] = useState(20)
  const [rotationX, setRotationX] = useState(0)
  const [rotationY, setRotationY] = useState(0)
  const [canvasWidth, setCanvasWidth] = useState(1800)
  const [canvasHeight, setCanvasHeight] = useState(1400)
  const [sizeError, setSizeError] = useState(false)
  const [fileName, setFileName] = useState(
    `snap-${Intl.DateTimeFormat('sv-SE').format(Date.now())}`
  )
  const [imgFrame, setImgFrame] = useState('macOS-dark')
  const [snapzWatermark, setSnapzWatermark] = useState(
    license?.isLicensed ? false : true
  )
  const [customWatermarkToggle, setCustomWatermarkToggle] = useState(false)
  const [customWatermarkImg, setCustomWatermarkImg] = useState()
  const [customWatermarkText, setCustomWatermarkText] = useState()
  const [isExporting, setIsExporting] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const canvasRef = useRef(null)

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
    }, 200)

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

  // export functionality
  const [startExport, setStartExport] = useState()

  const handleExport = (options) => {
    setIsExporting(true)
    setStartExport(options)
  }

  const handleExported = () => {
    setIsExporting(false)
    displayToast('success', 'Image exported')
    setStartExport(null)
  }

  const [extractText, setExtractText] = useState(false)
  const [isOCRLoading, setIsOCRLoading] = useState(false)
  const [ocrResult, setOcrResult] = useState(null)

  const handleExtractText = (val) => {
    setIsOCRLoading(true)
    setExtractText(val)
  }

  const handleExtractedText = (lines) => {
    setIsOCRLoading(false)

    setOcrResult(lines)
  }

  useEffect(() => {
    if (user?.id && fingerprint) {
      checkLicense(user, fingerprint)
    }
  }, [user, fingerprint])

  useEffect(() => {
    console.log('urlMode', urlMode)
    if (urlMode) {
      // check if the mode is valid (exists as a mode in editorModes)
      const modeExists = editorModes.some((item) => item.mode === urlMode)
      if (modeExists) {
        setMode(urlMode)
      } else {
        navigate('/app?mode=screenshot')
      }
    } else {
      setMode(mode)
    }
  }, [urlMode, setMode])

  return (
    <div
      className={`dark flex flex-col items-start mx-auto bg-background h-dvh`}
    >
      <TopBar
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        fileName={fileName}
        register={register}
        onExport={handleExport}
        isExporting={isExporting}
      />
      <div className="w-full flex flex-row p-2 h-full min-h-[700px] min-w-[900px]">
        {isExporting && (
          <div className="absolute w-full h-full z-50">
            <ExportOverlay isVisible />
          </div>
        )}
        {mode === 'dev' && (
          <ToolBarDev
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            sizeError={sizeError}
            register={register}
            setValue={setValue}
            imgFrame={imgFrame}
            setImgScale={setImgScale}
            setImgPosition={setImgPosition}
            imgPosition={imgPosition}
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
        )}
        {mode === 'screenshot' && (
          <ToolBarScreenshot
            imgVisibility={imgVisibility}
            setImgVisibility={setImgVisibility}
            onReplaceImage={() => {
              setTriggerReplaceImage(true)
            }}
            imageLoaded={imageLoaded}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            sizeError={sizeError}
            register={register}
            setValue={setValue}
            imgFrame={imgFrame}
            setImgScale={setImgScale}
            setImgPosition={setImgPosition}
            imgPosition={imgPosition}
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
            handleExtractText={handleExtractText}
            isOCRLoading={isOCRLoading}
            ocrResult={ocrResult}
          />
        )}
        {mode === 'ai' && (
          <>
            <ToolBarAI />
            <AICanvasFeed />
          </>
        )}
        {mode !== 'ai' && (
          <CanvasArea
            canvasRef={canvasRef}
            imgScale={imgScale}
            imgPosition={imgPosition}
            imgShadow={imgShadow}
            borderRadius={borderRadius}
            rotationX={rotationX}
            rotationY={rotationY}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            imgFrame={imgFrame}
            imgVisibility={imgVisibility}
            snapzWatermark={snapzWatermark}
            customWatermarkToggle={customWatermarkToggle}
            customWatermarkImg={customWatermarkImg}
            customWatermarkText={customWatermarkText}
            startExport={startExport}
            onExported={handleExported}
            extractText={extractText}
            onExtractedText={handleExtractedText}
            onImageLoaded={(file) => {
              setImageLoaded(file)
              setTriggerReplaceImage(false)
            }}
            triggerReplaceImage={triggerReplaceImage}
            onCancelUpload={() => {
              setTriggerReplaceImage(false)
            }}
            fileName={fileName}
          />
        )}
        <div className="absolute bottom-4 right-4">
          <EditorLinks />
        </div>
      </div>
    </div>
  )
}

export default App
