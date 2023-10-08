/* eslint-disable react/prop-types */
import { Button } from '@nextui-org/react'
import * as SliderBase from '@radix-ui/react-slider'
import { useState } from 'react'

export default function Slider({
  onValueChange,
  min,
  max,
  step,
  defaultValue,
}) {
  const [sliderValue, setSliderValue] = useState(defaultValue)

  const handleValueChange = (val) => {
    setSliderValue(val) // Update local state
    if (onValueChange) {
      onValueChange(val[0])
    }
  }

  const handleReset = () => {
    setSliderValue(defaultValue) // Reset local state to the default value
    if (onValueChange) {
      onValueChange(defaultValue[0])
    }
  }

  return (
    <div className="flex flex-row items-center gap-3">
      <SliderBase.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={sliderValue} // Bind the slider's value to the local state
        min={min}
        max={max}
        step={step}
        onValueChange={handleValueChange}
      >
        <SliderBase.Track className="bg-content4 relative grow rounded-full h-[3px]">
          <SliderBase.Range className="absolute bg-secondary rounded-full h-full" />
        </SliderBase.Track>
        <SliderBase.Thumb
          className="block w-5 h-5 bg-secondary rounded-full shadow-lg outline-none cursor-pointer"
          aria-label="Volume"
        />
      </SliderBase.Root>
      <Button size="sm" variant="ghost" onClick={handleReset}>
        Reset
      </Button>
    </div>
  )
}
