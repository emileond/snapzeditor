import { useEffect } from 'react'
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from 'react-compare-slider'
import { Chip, Progress } from '@nextui-org/react'
import { useAiImages } from '../context/AiImagesContext'

export default function AICanvasFeed() {
  const { images } = useAiImages()

  useEffect(() => {
    console.log(images)
  }, [images])

  return (
    <div className="w-full flex flex-col items-center justify-start overflow-auto">
      <div className="container mx-auto flex flex-col gap-5 sm:px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32 py-8">
        {images?.length > 0 &&
          images.map((image) =>
            image?.output && image.output.length > 1 ? (
              // Mapping starting from the second item (index 1) of the output array
              image.output.slice(1).map((output, idx) => (
                <ReactCompareSlider
                  key={`${image.id}-${idx + 1}`} // Adjusted key to consider the output index
                  itemOne={
                    <div className="w-full h-full flex items-center justify-center">
                      <Chip className="absolute left-2">Original</Chip>
                      <ReactCompareSliderImage
                        src={image.input}
                        alt="Original"
                      />
                    </div>
                  }
                  itemTwo={
                    <div className="w-full h-full flex items-center justify-center">
                      <Chip className="absolute right-2">AI Enhanced</Chip>
                      <ReactCompareSliderImage
                        src={output}
                        alt={`AI Enhanced ${idx + 1}`}
                      />
                    </div>
                  }
                />
              ))
            ) : (
              <div key={image.id} className="flex flex-col gap-2 w-full">
                <Progress isIndeterminate color="primary" size="sm" />
                <h4>{image?.status}</h4>
                <p className="whitespace-pre text-sm text-default-600">
                  {image?.logs}
                </p>
              </div>
            )
          )}
      </div>
    </div>
  )
}
