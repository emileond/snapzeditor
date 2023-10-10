import { useState } from 'react'

const ITEMS = 8

const wallpapers = Array.from(
  { length: ITEMS },
  (_, i) => `/images/wallpapers/${i + 1}.jpg`
)

const thumbnails = Array.from(
  { length: ITEMS },
  (_, i) => `/images/wallpapers/thumb-${i + 1}.jpg`
)

function WallpaperPicker({ setCanvasBg }) {
  const [selectedWallpaperIndex, setSelectedWallpaperIndex] = useState(null)

  const handleWallpaperClick = (index) => {
    setSelectedWallpaperIndex(index)
    setCanvasBg({ style: null, imgSrc: wallpapers[index] })
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {thumbnails.map((thumbnail, index) => (
        <button
          key={index}
          className={`w-8 h-8 block cursor-pointer border border-content4 rounded-lg hover:border-slate-300 transition-border ${
            selectedWallpaperIndex === index
              ? 'ring-2 ring-offset-2 ring-content4'
              : ''
          }`}
          style={{
            backgroundImage: `url(${thumbnail})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          onClick={() => handleWallpaperClick(index)}
        ></button>
      ))}
    </div>
  )
}

export default WallpaperPicker
