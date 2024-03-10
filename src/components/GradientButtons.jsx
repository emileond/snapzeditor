import { PiCheckBold } from 'react-icons/pi'
import ColorPicker from './ColorPicker'
import { useEffect, useState } from 'react'

function GradientButtons({ setCanvasBg }) {
  const [gradientFrom, setGradientFrom] = useState()
  const [gradientTo, setGradientTo] = useState()

  const gradients = [
    { from: '#ff9966', to: '#ff5e62' }, // Yellow to soft orange
    { from: '#ff9a8b', to: '#ff6a88' }, // Red to pinkish-red
    { from: '#feada6', to: '#f5efef' }, // Soft orange to off-white
    { from: '#fccb90', to: '#d57eeb' }, // Soft orange to lavender
    { from: '#ffe259', to: '#ffa751' }, // Yellow to soft orange
    { from: '#f6d365', to: '#fda085' }, // Yellow to soft red
    { from: '#ffecd2', to: '#fcb69f' }, // Peach to light orange (duplicated for placeholder)
    { from: '#efe5c6', to: '#d7fd85' }, // Light yellow to light green
    { from: '#96fbc4', to: '#f9f586' }, // Soft green to pale yellow
    { from: '#d4fc79', to: '#96e6a1' }, // Lime green to light green
    { from: '#84fab0', to: '#8fd3f4' }, // Teal to light blue
    { from: '#5ee7df', to: '#b490ca' }, // Turquoise to soft purple
    { from: '#88d3ce', to: '#6e45e2' }, // Teal to purple
    { from: '#191970', to: '#00FFFF' }, // Deep blue to cyan
    { from: '#1a3eb3', to: '#a5a5f8' }, // Blue to light periwinkle
    { from: '#667eea', to: '#764ba2' }, // Royal blue to purple
    { from: '#adb7df', to: '#e2c3d4' }, // Soft blue to soft pink
    { from: '#a6c0fe', to: '#f68084' }, // Light blue to soft red
    { from: '#f093fb', to: '#f65f6F' }, // Bright pink to soft red
    { from: '#e0c3fc', to: '#8ec5fc' }, // Lavender to sky blue
    { from: '#d9afd9', to: '#97d9e1' }, // Soft purple to soft blue
  ]

  const handleGradientClick = (gradient) => {
    setGradientFrom(gradient.from)
    setGradientTo(gradient.to)
  }

  useEffect(() => {
    if (gradientFrom && gradientTo) {
      setCanvasBg({
        style: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
        imgSrc: null,
      })
    }
  }, [gradientFrom, gradientTo, setCanvasBg])

  // on first render, set a random gradient as default
  useEffect(() => {
    const randomGradient =
      gradients[Math.floor(Math.random() * gradients.length)]
    setGradientFrom(randomGradient.from)
    setGradientTo(randomGradient.to)
  }, [])

  return (
    <div>
      <div className="flex gap-3 pb-2">
        <ColorPicker
          onChange={(color) => setGradientFrom(color)}
          defaultColor={gradientFrom}
        />
        <ColorPicker
          onChange={(color) => setGradientTo(color)}
          defaultColor={gradientTo}
        />
      </div>
      <div className="flex gap-2 flex-wrap">
        {gradients.map((gradient, index) => (
          <button
            key={index}
            className={`w-8 h-8 block cursor-pointer border border-content4 rounded-lg hover:border-slate-300 transition-border  ${
              gradient.from === gradientFrom && gradient.to === gradientTo
                ? 'ring-2 ring-offset-2 ring-content4'
                : ''
            }`}
            style={{
              background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
            }}
            onClick={() => handleGradientClick(gradient)}
          >
            {gradient.from === gradientFrom && gradient.to === gradientTo && (
              <div className="flex items-center justify-center">
                <PiCheckBold className="text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default GradientButtons
