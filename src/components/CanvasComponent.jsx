import { forwardRef } from 'react'
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
import CodeEditor from './CodeEditor'
import { useEditorMode } from '../context/EditorModeContext'

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
    const { mode } = useEditorMode()
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
          {imgFrame === 'macOS-dark' && imgVisibility && (
            <div className="flex items-center justify-between w-full h-8 bg-[#262a35]">
              <div className="flex gap-2 pl-4">
                <div className="flex items-center justify-center w-3 h-3 bg-[#ff5f56] rounded-full"></div>
                <div className="flex items-center justify-center w-3 h-3 bg-[#ffbd2e] rounded-full"></div>
                <div className="flex items-center justify-center w-3 h-3 bg-[#27c93f] rounded-full"></div>
              </div>
            </div>
          )}
          {imgFrame === 'macOS-light' && imgVisibility && (
            <div className="flex items-center justify-between w-full h-8 bg-[#f2f5f7]">
              <div className="flex gap-2 pl-4">
                <div className="flex items-center justify-center w-3 h-3 bg-[#ff5f56] rounded-full"></div>
                <div className="flex items-center justify-center w-3 h-3 bg-[#ffbd2e] rounded-full"></div>
                <div className="flex items-center justify-center w-3 h-3 bg-[#27c93f] rounded-full"></div>
              </div>
            </div>
          )}
          {imgFrame === 'windows-light' && imgVisibility && (
            <div className="flex items-center justify-end w-full h-8 bg-[#d0dbec]/80 backdrop-blur">
              <div className="flex gap-2 pr-4">
                <MdMinimize className="text-[#313131]" />
                <MdOutlineRectangle className="text-[#313131]" />
                <MdClose className="text-[#313131]" />
              </div>
            </div>
          )}
          {imgFrame === 'windows-dark' && imgVisibility && (
            <div className="flex items-center justify-end w-full h-8 bg-[#1e1e20]/80 backdrop-blur">
              <div className="flex gap-2 pr-4">
                <MdMinimize className="text-[#ffffff]" />
                <MdOutlineRectangle className="text-[#ffffff]" />
                <MdClose className="text-[#ffffff]" />
              </div>
            </div>
          )}
          {imgFrame === 'galaxy' && imgVisibility && (
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
          {mode === 'screenshot' && (
            <img src={imgSrc} alt="Uploaded image preview" />
          )}
          {mode === 'dev' && <CodeEditor />}
          {imgFrame === 'youtube' && imgVisibility && (
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
      </div>
    )
  }
)

CanvasComponent.displayName = 'CanvasComponent'

export default CanvasComponent
