import { useState } from 'react'
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from 'react-compare-slider'
import { Chip, Button } from '@nextui-org/react'
import { useAiImages } from '../context/AiImagesContext'

export default function AICanvasFeed() {
  const { addImage, updateImageOutput } = useAiImages()

  // ai examples
  const aiExamples = [
    {
      description: 'Add depth and detail to your images',
      before: '/ai-examples/example1-before.webp',
      after: '/ai-examples/example1-after.webp',
    },
    {
      description: 'Upscale graphics and images',
      before: '/ai-examples/example2-before.webp',
      after: '/ai-examples/example2-after.webp',
    },
    {
      description: 'Enhance your photos',
      before: '/ai-examples/example3-before.webp',
      after: '/ai-examples/example3-after.webp',
    },
    {
      description: 'Bring your sketches to life',
      before: '/ai-examples/example4-before.webp',
      after: '/ai-examples/example4-after.webp',
    },
  ]

  const [aiExample, setAiExample] = useState(aiExamples[0])

  return (
    <div className="w-full flex flex-col items-center justify-start overflow-auto">
      <div className="container mx-auto flex flex-col gap-5 sm:px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32 py-8">
        <ReactCompareSlider
          itemOne={
            <div className="w-full h-full flex items-center justify-center">
              <Chip className="absolute left-2">Before</Chip>
              <ReactCompareSliderImage src={aiExample.before} alt="Original" />
            </div>
          }
          itemTwo={
            <div className="w-full h-full flex items-center justify-center">
              <Chip className="absolute right-2">After</Chip>
              <ReactCompareSliderImage src={aiExample.after} alt="Original" />
            </div>
          }
        />
        <ReactCompareSlider
          itemOne={
            <div className="w-full h-full flex items-center justify-center">
              <Chip className="absolute left-2">Before</Chip>
              <ReactCompareSliderImage src={aiExample.before} alt="Original" />
            </div>
          }
          itemTwo={
            <div className="w-full h-full flex items-center justify-center">
              <Chip className="absolute right-2">After</Chip>
              <ReactCompareSliderImage src={aiExample.after} alt="Original" />
            </div>
          }
        />
        <ReactCompareSlider
          itemOne={
            <div className="w-full h-full flex items-center justify-center">
              <Chip className="absolute left-2">Before</Chip>
              <ReactCompareSliderImage src={aiExample.before} alt="Original" />
            </div>
          }
          itemTwo={
            <div className="w-full h-full flex items-center justify-center">
              <Chip className="absolute right-2">After</Chip>
              <ReactCompareSliderImage src={aiExample.after} alt="Original" />
            </div>
          }
        />
      </div>
    </div>
  )
}
