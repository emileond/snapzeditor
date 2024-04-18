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
  Image,
  Progress,
} from '@nextui-org/react' // Assuming Text is available for textual feedback
import { useAiImages } from '../context/AiImagesContext'
import {
  PiCloudArrowUpBold,
  PiDownloadSimpleBold,
  PiSlidersHorizontalBold,
  PiTerminalBold,
  PiTrashSimpleBold,
} from 'react-icons/pi'

export default function AICanvasFeed() {
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
            <Image src="/empty-states/dark/time.svg" width={100} height={100} />
            <h4>Sending image to the server...</h4>
            <p className="text-default-500">
              This can take several minutes, depending on the server load.
            </p>
          </>
        )
      case 'processing':
        return (
          <>
            <Image src="/empty-states/dark/ai.svg" width={140} height={140} />
            <h4>Processing image...</h4>
            <p className="text-default-500">
              Do not refresh or close the window.
            </p>
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
            <h4>Image processing failed.</h4>
            <p className="text-error">
              {image?.errorMessage ||
                'Please try again or contact support if the issue persists.'}
            </p>
          </>
        )
      default:
        return <Spinner size="large" color="primary" />
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-start overflow-auto">
      <div className="container mx-auto flex flex-col gap-5 sm:px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32 py-8">
        {images?.length > 0 &&
          images.map((image) =>
            image?.output && image.output.length > 1 ? (
              image.output.slice(1).map((output, idx) => (
                <div
                  key={`${image.id}-${idx + 1}`}
                  className="relative w-full h-full"
                >
                  <div className="flex gap-2 absolute top-3 right-3 z-10">
                    {/* <Tooltip content="Use image as reference">
                      <Button size="sm" isIconOnly variant="faded">
                        <PiSlidersHorizontalBold fontSize="1.1rem" />
                      </Button>
                    </Tooltip> */}
                    <Tooltip content="Download generated image">
                      <Button
                        size="sm"
                        isIconOnly
                        variant="faded"
                        onClick={() => downloadImage(output)}
                      >
                        <PiDownloadSimpleBold fontSize="1.1rem" />
                      </Button>
                    </Tooltip>
                    {/* <Tooltip content="Upload to cloud">
                      <Button size="sm" isIconOnly variant="faded" isDisabled>
                        <PiCloudArrowUpBold fontSize="1.1rem" />
                      </Button>
                    </Tooltip> */}
                    {/* <Tooltip content="Delete">
                      <Button
                        size="sm"
                        isIconOnly
                        variant="faded"
                        color="danger"
                        onClick={null}
                      >
                        <PiTrashSimpleBold fontSize="1.1rem" />
                      </Button>
                    </Tooltip> */}
                  </div>
                  <ReactCompareSlider
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
                        <Chip className="absolute right-2">AI Generated</Chip>
                        <ReactCompareSliderImage
                          src={output}
                          alt={`AI Enhanced ${idx + 1}`}
                        />
                      </div>
                    }
                  />
                </div>
              ))
            ) : (
              <Card key={image.id} className="w-full h-full">
                <CardBody className="w-full h-full min-h-[400px]">
                  <div className="flex flex-col items-center justify-center gap-3 py-4 w-full h-full">
                    {renderContentBasedOnStatus(image)}
                    <Progress
                      size="sm"
                      isIndeterminate
                      aria-label="Loading..."
                      className="max-w-md"
                    />
                    <Button
                      startContent={<PiTerminalBold fontSize="1rem" />}
                      size="sm"
                      variant="light"
                      onClick={() => setShowLogs(!showLogs)}
                    >
                      {showLogs ? 'Hide' : 'Show'} logs
                    </Button>
                    {showLogs && (
                      <div className="min-w-[400px] h-[120px] bg-content2 rounded-lg p-2 text-left overflow-auto">
                        <p className="text-default-500 text-sm whitespace-pre p-2">
                          {image?.logs}
                        </p>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            )
          )}
      </div>
    </div>
  )
}
