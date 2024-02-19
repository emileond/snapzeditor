import { Button } from '@nextui-org/react'
import { useState } from 'react'
import { PiMagicWandBold, PiUploadBold } from 'react-icons/pi'
import { createApi } from 'unsplash-js'
import ChipPro from './ChipPro'

const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
})

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
  const [isUnsplashLoading, setIsUnsplashLoading] = useState(false)
  const [isUploadLoading, setIsUploadLoading] = useState(false)
  const [unsplashCredits, setUnsplashCredits] = useState(null)

  const handleWallpaperClick = (index) => {
    setSelectedWallpaperIndex(index)
    setCanvasBg({ style: null, imgSrc: wallpapers[index] })
    setUnsplashCredits(null)
  }

  const handleRandomWallpaperClick = async () => {
    setIsUnsplashLoading(true)
    try {
      await unsplash.photos
        .getRandom({
          query: 'shapes wallpaper',
          count: 1,
        })
        .then((result) => {
          if (result.errors) {
            console.error('error occurred: ', result.errors[0])
            return
          }
          const photo = result.response[0]
          setCanvasBg({ style: null, imgSrc: photo.urls.full })
          setUnsplashCredits({
            name: photo.user.name,
            username: photo.user.username,
          })
        })
    } catch (error) {
      console.error(error)
    }
    setIsUnsplashLoading(false)
  }

  const handleUploadWallpaperClick = () => {
    setIsUploadLoading(true)
    // handle upload logic here
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/jpeg, image/png, image/jpg'
    input.onchange = () => {
      const reader = new FileReader()
      const file = input.files[0]
      reader.readAsDataURL(file)
      reader.onload = () => {
        setCanvasBg({ style: null, imgSrc: reader.result })
        setIsUploadLoading(false)
        setUnsplashCredits(null)
      }
    }
    // handle cancel
    input.oncancel = () => {
      return setIsUploadLoading(false)
    }
    input.click()
  }

  return (
    <>
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
      <div className="pt-4 flex flex-col items-center gap-4">
        <div className="flex items-center justify-start gap-2 w-full">
          <h6 className="font-medium text-sm text-default-600">
            Custom wallpaper
          </h6>
          <ChipPro />
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            isLoading={isUnsplashLoading}
            variant="ghost"
            onClick={handleRandomWallpaperClick}
            startContent={<PiMagicWandBold fontSize="1.1rem" />}
            // endContent={<ChipPro />}
          >
            Pick random
          </Button>
          <Button
            size="sm"
            isLoading={isUploadLoading}
            variant="ghost"
            onClick={handleUploadWallpaperClick}
            startContent={<PiUploadBold fontSize="1.1rem" />}
            // endContent={<ChipPro />}
          >
            Upload
          </Button>
        </div>
        {unsplashCredits && (
          <span className="text-default-500 text-xs">
            Photo by{' '}
            <a
              href={`https://unsplash.com/@${unsplashCredits?.username}`}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              {unsplashCredits?.name}
            </a>{' '}
            on{' '}
            <a
              href="https://unsplash.com/"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Unsplash
            </a>
          </span>
        )}
      </div>
    </>
  )
}

export default WallpaperPicker
