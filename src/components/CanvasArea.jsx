import CanvasComponent from './CanvasComponent'

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
  return (
    <div className="w-full flex items-center justify-center">
      <div ref={canvasRef}>
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
