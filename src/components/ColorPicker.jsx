import { useState, useEffect } from 'react'
import { Input } from '@nextui-org/react'

function ColorPicker({ onChange, defaultColor = '#FFFFFF' }) {
  const [color, setColor] = useState(defaultColor)

  useEffect(() => {
    setColor(defaultColor)
  }, [defaultColor])

  const handleColorChange = (e) => {
    const newColor = e.target.value
    setColor(newColor)
    if (onChange) {
      onChange(newColor.startsWith('#') ? newColor : '#' + newColor)
    }
  }

  return (
    <div className="flex items-center gap-1">
      <label
        className="w-8 h-8 block cursor-pointer bg-transparent border border-content4 rounded-lg"
        style={{ backgroundColor: color }}
      >
        <input
          type="color"
          className="opacity-0 w-full h-full cursor-pointer hover:border-slate-300 transition-all"
          value={color}
          onChange={handleColorChange}
        />
      </label>
      <Input
        size="sm"
        variant="bordered"
        startContent="#"
        className="w-20"
        placeholder={
          defaultColor.startsWith('#')
            ? defaultColor.substring(1)
            : defaultColor
        }
        value={color.startsWith('#') ? color.substring(1) : color}
        onChange={(e) => handleColorChange(e)}
      />
    </div>
  )
}

export default ColorPicker
