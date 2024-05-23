import { useState } from 'react'
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from 'react-compare-slider'
import {
  Card,
  CardBody,
  Chip,
  Spinner,
  Button,
  Tooltip,
  CardHeader,
  CardFooter,
  Image,
  Progress,
} from '@nextui-org/react' // Assuming Text is available for textual feedback
import { useAiImages } from '../context/AiImagesContext'
import {
  PiDownloadSimpleBold,
  PiPlayCircleBold,
  PiTerminalBold,
} from 'react-icons/pi'
import CodeEditor from './CodeEditor'

export default function AICodeView() {
  const { images } = useAiImages()
  const [showLogs, setShowLogs] = useState(false)

  const downloadImage = async (url) => {
    try {
      const response = await fetch(url)
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`)

      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.setAttribute('download', 'download.png') // You can customize the download file name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl) // Clean up
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  // Helper function to render the content based on the image status
  const renderContentBasedOnStatus = (image) => {
    switch (image.status) {
      case 'starting':
        return (
          <>
            <Image src="/empty-states/dark/57.svg" width={100} height={100} />
            <h4>Starting server...</h4>
            <p className="text-default-500">
              This can take several minutes, depending on the server load.
            </p>
            <Progress
              size="sm"
              isIndeterminate
              aria-label="Loading..."
              className="max-w-md"
            />
          </>
        )
      case 'processing':
        return (
          <>
            <Image src="/empty-states/dark/ai.svg" width={140} height={140} />
            <h4>Processing image...</h4>
            <p className="text-default-500">
              Please do not refresh or close the window during the process.
            </p>
            <Progress
              size="sm"
              isIndeterminate
              aria-label="Loading..."
              className="max-w-md"
            />
          </>
        )
      case 'succeeded':
        // Normally, 'succeeded' status should come with an output,
        // so this case might not be needed if outputs are handled separately
        return (
          <>
            <h4>Image processing succeeded.</h4>
          </>
        )
      case 'failed':
        return (
          <>
            <Image src="/empty-states/dark/10.svg" width={100} height={100} />
            <h4>Image processing failed.</h4>
            <p className="text-default-500">
              {image?.errorMessage ||
                'Please try again or contact support if the issue persists.'}
            </p>
          </>
        )
      default:
        return <Spinner size="large" color="primary" />
    }
  }

  const examples = [
    {
      input: '/ai-examples/reimagine/1-input.png',
      output: '/ai-examples/reimagine/1-output.png',
      description: 'Transform images into new creations',
    },
    {
      input: '/ai-examples/reimagine/2-input.png',
      output: '/ai-examples/reimagine/2-output.png',
      description: 'Get interior design ideas',
    },
    {
      input: '/ai-examples/reimagine/3-input.png',
      output: '/ai-examples/reimagine/3-output.png',
      description: 'Create 3D characters and scenes',
    },
  ]

  return (
    <div className="w-full flex gap-3 justify-center">
      <Card className="w-full max-w-2xl mt-4">
        <CardHeader>
          <h5 className="text-default-500">Image</h5>
        </CardHeader>
        <CardBody></CardBody>
      </Card>
      <Card className="w-full max-w-2xl mt-4">
        <CardHeader>
          <h5 className="text-default-500">Code</h5>
        </CardHeader>
        <CardBody>
          <CodeEditor />
        </CardBody>
      </Card>
    </div>
  )
}
