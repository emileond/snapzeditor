import ColorPicker from './ColorPicker'
import { useEffect, useState } from 'react'

function GradientButtons({ setCanvasBg }) {
  const [gradientFrom, setGradientFrom] = useState()
  const [gradientTo, setGradientTo] = useState()

  const gradients = [
    { from: '#84fab0', to: '#8fd3f4' },
    { from: '#1a3eb3', to: '#a5a5f8' },
    { from: '#f8dc7f', to: '#f7a690' },
    { from: '#f093fb', to: '#f5576c' },
    { from: '#5ee7df', to: '#b490ca' },
    { from: '#adb7df', to: '#e2c3d4' },
    { from: '#a6c0fe', to: '#f68084' },
    { from: '#fccb90', to: '#d57eeb' },
    { from: '#e0c3fc', to: '#8ec5fc' },
    { from: '#efe5c6', to: '#d7fd85' },
    { from: '#96fbc4', to: '#f9f586' },
    { from: '#667eea', to: '#764ba2' },
    { from: '#f43b47', to: '#453a94' },
    { from: '#191970', to: '#00FFFF' },
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
  }, [gradientFrom, gradientTo])

  return (
    <div>
      <div className="flex gap-3 pb-2">
        <ColorPicker
          onChange={(color) => setGradientFrom(color)}
          defaultColor={'#84fab0'}
        />
        <ColorPicker
          onChange={(color) => setGradientTo(color)}
          defaultColor={'#8fd3f4'}
        />
      </div>
      <div className="flex gap-2 flex-wrap">
        {gradients.map((gradient, index) => (
          <button
            key={index}
            className={`w-8 h-8 block cursor-pointer border border-content4 rounded-lg hover:border-slate-300 transition-border ${
              gradient.from === gradientFrom && gradient.to === gradientTo
                ? 'ring-2 ring-offset-2 ring-content4'
                : ''
            }`}
            style={{
              background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
            }}
            onClick={() => handleGradientClick(gradient)}
          ></button>
        ))}
      </div>
    </div>
  )
}

export default GradientButtons
