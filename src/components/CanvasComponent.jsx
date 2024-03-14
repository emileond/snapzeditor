import { forwardRef, useCallback, useState } from 'react'
import { Button } from '@nextui-org/react'
import {
  PiAlienBold,
  PiHardDriveBold,
  PiTerminalBold,
  PiWaveSineBold,
} from 'react-icons/pi'
import {
  MdMinimize,
  MdOutlineRectangle,
  MdClose,
  MdPause,
  MdSkipNext,
  MdVolumeUp,
  MdSettings,
  MdFullscreen,
  MdClosedCaption,
} from 'react-icons/md'
import { useCanvasBg } from '../context/CanvasBgContext'
import ReactCodeMirror from '@uiw/react-codemirror'
import { loadLanguage } from '@uiw/codemirror-extensions-langs'
import { createTheme } from '@uiw/codemirror-themes'
import { tags as t } from '@lezer/highlight'
import stripIndent from 'strip-indent'

const CanvasComponent = forwardRef(
  (
    {
      shadow,
      borderRadius,
      rotationX,
      rotationY,
      imgFrame,
      imgVisibility,
      imgSrc,
      imgScale,
      imgPosition,
      sliderScale,
    },
    ref
  ) => {
    const positionsMap = {
      'top-left': 'items-start justify-start',
      'top-center': 'items-start justify-center',
      'top-right': 'items-start justify-end',
      'left-center': 'items-center justify-start',
      center: 'items-center justify-center',
      'right-center': 'items-center justify-end',
      'bottom-left': 'items-end justify-start',
      'bottom-center': 'items-end justify-center',
      'bottom-right': 'items-end justify-end',
    }

    const position = positionsMap[imgPosition]

    const { canvasBg } = useCanvasBg()

    const myTheme = createTheme({
      dark: 'dark',
      settings: {
        background: '',
        backgroundImage: '',
        foreground: '#EAEAEA',
        caret: '#AEAFAD',
        selection: '#D6D6D6',
        selectionMatch: '#D6D6D6',
        gutterBackground: '#FFFFFF',
        gutterForeground: '#4D4D4C',
        gutterBorder: '#dddddd',
        gutterActiveForeground: '',
        lineHighlight: '#EFEFEF',
      },
      styles: [
        { tag: t.comment, color: '#787b80' },
        { tag: t.definition(t.typeName), color: '#194a7b' },
        { tag: t.typeName, color: '#194a7b' },
        { tag: t.tagName, color: '#008a02' },
        { tag: t.variableName, color: '#1a00db' },
      ],
    })

    const [codeMirrorValue, setCodeMirrorValue] = useState(
      `console.log('hello world!');`
    )

    const onCMChange = useCallback((val) => {
      setCodeMirrorValue(val)
    }, [])

    const formatCode = () => setCodeMirrorValue(stripIndent(codeMirrorValue))

    return (
      <div
        ref={ref}
        className={`canvas flex ${position} w-full h-full overflow-hidden`}
        style={{
          background: canvasBg?.style,
        }}
      >
        {canvasBg?.imgSrc && (
          <img
            className="absolute top-0 w-full h-full object-cover"
            src={canvasBg?.imgSrc}
            alt="Custom watermark"
          />
        )}
        {
          // imgSrc &&
          imgVisibility && (
            <div
              id="snap-container"
              className={`flex flex-col overflow-hidden
          `}
              style={{
                borderRadius: `${borderRadius}px`,
                transform: `scale(${
                  imgScale * sliderScale
                }) perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(0deg)`,
                boxShadow: `rgba(0, 0, 0, 0.6) 0px ${shadow}px ${
                  shadow * 0.9
                }px 0px`,
              }}
            >
              {imgFrame === 'macOS-dark' && (
                <div className="flex items-center justify-between w-full h-8 bg-[#262a35]">
                  <div className="flex gap-2 pl-4">
                    <div className="flex items-center justify-center w-3 h-3 bg-[#ff5f56] rounded-full"></div>
                    <div className="flex items-center justify-center w-3 h-3 bg-[#ffbd2e] rounded-full"></div>
                    <div className="flex items-center justify-center w-3 h-3 bg-[#27c93f] rounded-full"></div>
                  </div>
                </div>
              )}
              {imgFrame === 'macOS-light' && (
                <div className="flex items-center justify-between w-full h-8 bg-[#f2f5f7]">
                  <div className="flex gap-2 pl-4">
                    <div className="flex items-center justify-center w-3 h-3 bg-[#ff5f56] rounded-full"></div>
                    <div className="flex items-center justify-center w-3 h-3 bg-[#ffbd2e] rounded-full"></div>
                    <div className="flex items-center justify-center w-3 h-3 bg-[#27c93f] rounded-full"></div>
                  </div>
                </div>
              )}
              {imgFrame === 'windows-light' && (
                <div className="flex items-center justify-end w-full h-8 bg-[#d0dbec]/80 backdrop-blur">
                  <div className="flex gap-2 pr-4">
                    <MdMinimize className="text-[#313131]" />
                    <MdOutlineRectangle className="text-[#313131]" />
                    <MdClose className="text-[#313131]" />
                  </div>
                </div>
              )}
              {imgFrame === 'windows-dark' && (
                <div className="flex items-center justify-end w-full h-8 bg-[#1e1e20]/80 backdrop-blur">
                  <div className="flex gap-2 pr-4">
                    <MdMinimize className="text-[#ffffff]" />
                    <MdOutlineRectangle className="text-[#ffffff]" />
                    <MdClose className="text-[#ffffff]" />
                  </div>
                </div>
              )}
              {imgFrame === 'galaxy' && (
                // translucent navbar with a purple gradient background
                <div className="flex items-center justify-between w-full h-8 bg-gradient-to-r from-[#7f00ff]/30 to-[#e100ff]/30 backdrop-blur">
                  <div className="flex gap-2 pl-4">
                    <PiTerminalBold className="text-[#311b64]" />
                  </div>
                  <div className="flex gap-2 pr-4">
                    <PiWaveSineBold className="text-[#311b64]" />
                    <PiHardDriveBold className="text-[#311b64]" />
                    <PiAlienBold className="text-[#311b64]" />
                  </div>
                </div>
              )}
              {/* <img src={imgSrc} alt="Uploaded image preview" /> */}
              <div className="bg-content1/[.88] p-4 text-left overflow-hidden">
                <Button onClick={formatCode}>Format</Button>
                <ReactCodeMirror
                  extensions={[loadLanguage('jsx')]}
                  value={codeMirrorValue}
                  theme={myTheme}
                  minWidth="400px"
                  minHeight="400px"
                  height="100%"
                  style={{ fontSize: '16px' }}
                  basicSetup={{
                    lineNumbers: false,
                    foldGutter: false,
                    highlightActiveLineGutter: false,
                    highlightSpecialChars: false,
                    allowMultipleSelections: false,
                    highlightActiveLine: false,
                    indentOnInput: true,
                  }}
                  onChange={onCMChange}
                />
              </div>
              {imgFrame === 'youtube' && (
                <div className="w-full absolute bottom-0">
                  <div className="flex flex-row w-full">
                    <div className="w-full h-1 bg-danger" />
                    <div className="w-full h-1 bg-gray-300" />
                  </div>
                  <div className="flex items-center justify-between  h-6 bg-[#000]/50">
                    <div className="flex gap-2 pl-4">
                      <MdPause className="text-[#ffffff]" />
                      <MdSkipNext className="text-[#ffffff]" />
                      <MdVolumeUp className="text-[#ffffff]" />
                    </div>
                    <div className="flex gap-2 pr-4">
                      <MdClosedCaption className="text-[#ffffff]" />
                      <MdSettings className="text-[#ffffff]" />
                      <MdFullscreen className="text-[#ffffff]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        }
      </div>
    )
  }
)

CanvasComponent.displayName = 'CanvasComponent'

export default CanvasComponent
