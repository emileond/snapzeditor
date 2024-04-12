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
  Skeleton,
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

  // Helper function to render the content based on the image status
  const renderContentBasedOnStatus = (image) => {
    switch (image.status) {
      case 'starting':
        return (
          <>
            <h4>Sending image to the server for processing...</h4>
            <p className="text-default-500">
              This can take a few minutes, depending on the server load.
            </p>
          </>
        )
      case 'processing':
        return (
          <>
            <h4>Image processing in progress...</h4>
            <p className="text-default-500">
              This might take a while, do not refresh or close the window.
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
                    <Tooltip content="Use image as reference">
                      <Button size="sm" isIconOnly variant="faded">
                        <PiSlidersHorizontalBold fontSize="1.1rem" />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Download generated image">
                      <Button size="sm" isIconOnly variant="faded">
                        <PiDownloadSimpleBold fontSize="1.1rem" />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Upload to cloud">
                      <Button size="sm" isIconOnly variant="faded" isDisabled>
                        <PiCloudArrowUpBold fontSize="1.1rem" />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Delete">
                      <Button
                        size="sm"
                        isIconOnly
                        variant="faded"
                        color="danger"
                        onClick={null}
                      >
                        <PiTrashSimpleBold fontSize="1.1rem" />
                      </Button>
                    </Tooltip>
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
                    <Spinner size="large" color="primary" />
                    {renderContentBasedOnStatus(image)}
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
