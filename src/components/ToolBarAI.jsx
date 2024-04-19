import { useEffect, useState } from 'react'
import {
  PiMagicWandBold,
  PiSparkleBold,
  PiSunDimBold,
  PiMagicWandDuotone,
  PiCubeBold,
  PiBuildingsBold,
  PiPaintBrushBold,
  PiCardsBold,
  PiImagesBold,
  PiCoinVerticalBold,
  PiCrownSimpleBold,
  PiArrowSquareOutBold,
  PiWarehouseBold,
  PiCouchBold,
} from 'react-icons/pi'
import {
  Button,
  Card,
  Chip,
  Divider,
  Input,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from '@nextui-org/react'
import { useLicense } from '../context/LicenseContext'
import Paywall from './Paywall'
import axios from 'axios'
import ImageInput from './ImageInput'
import HelpIndicator from './HelpIndicator'
import { useForm } from 'react-hook-form'
import { useAiImages } from '../context/AiImagesContext'
import { useCheckAiCredits } from '../hooks/useCheckAiCredits'
import { displayToast } from '../utils/displayToast'
import ChipPro from './ChipPro'

const ToolBarAI = () => {
  const { license } = useLicense()
  const { checkAiCredits } = useCheckAiCredits()
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [inputImage, setInputImage] = useState(null)
  const { addImage, updateImage } = useAiImages()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)
  const [imgError, setImgError] = useState()
  const [runCount, setRunCount] = useState(0)

  const creditsCost = watch('num_samples') * 4

  const interiorDesignStyles = [
    'modern',
    'minimalist',
    'vintage',
    'retro',
    'industrial',
    'bohemian',
    'scandinavian',
    'rustic',
    'shabby chic',
    'mid-century modern',
    'contemporary',
    'traditional',
    'futuristic',
    'art deco',
    'mediterranean',
    'tropical',
    'coastal',
    'mexican',
  ]

  const dayTimes = ['morning', 'afternoon', 'evening', 'night']

  const [interiorDesignStyle, setInteriorDesignStyle] = useState(
    interiorDesignStyles[0]
  )
  const [dayTime, setDayTime] = useState(dayTimes[0])

  const useCaseOptions = [
    {
      icon: <PiMagicWandBold fontSize="1.3rem" color="grey" />,
      name: 'General use',
      description: 'Transform images to any style',
      key: 'general',
      basePrompt: 'A photo of',
      baseAttributes: '4k photo, highly detailed',
      negativePrompt:
        'anime, cartoon, graphic, text, painting, crayon, graphite, abstract, glitch, deformed, mutated, ugly, disfigured',
    },
    {
      icon: <PiBuildingsBold fontSize="1.3rem" color="grey" />,
      name: 'Interior design',
      description: 'Get ideas for interior and exterior design',
      key: 'interior',
      basePrompt: 'An shot of',
      baseAttributes: `designed by a professional interior designer, add decoration, add furniture, 4k photo, highly detailed, realistic`,
      negativePrompt:
        'empty, plain, boring, anime, cartoon, graphic, text, painting, crayon, graphite, abstract, glitch, deformed, mutated, ugly, disfigured',
    },
    // {
    //   icon: <PiPaintBrushBold fontSize="1.3rem" color="grey" />,
    //   name: 'Illustration',
    //   description: 'Create illustrations and concept art',
    //   key: 'illustration',
    //   basePrompt: 'A 2d illustration of',
    //   baseAttributes: 'illustration, highly detailed, 4k photo',
    //   negativePrompt:
    //     'text, abstract, glitch, deformed, mutated, ugly, disfigured',
    // },
    {
      icon: <PiCubeBold fontSize="1.3rem" color="grey" />,
      name: '3D Design',
      description: 'Create 3D characters and scenes',
      key: '3d',
      basePrompt: 'A 3D model of',
      baseAttributes: 'pixar style, 4k photo, highly detailed',
      negativePrompt:
        'anime, graphic, text, painting, crayon, graphite, abstract, glitch, deformed, mutated, ugly, disfigured',
    },
  ]

  const [useCase, setUseCase] = useState(useCaseOptions[0])
  const [aiCredits, setAiCredits] = useState(0)

  async function checkPredictionStatus(predictionId) {
    setRunCount(runCount + 1)
    let processingStartTime = null // Track when we start processing
    const timeout = 120000 // 2 minutes in milliseconds
    let status = 'starting'
    let updateCount = 0 // Initialize an update counter

    // Use an outer loop to continuously check until we're done or need to cancel
    while (status !== 'succeeded') {
      const controller = new AbortController() // Create a new instance of AbortController

      try {
        const response = await axios.get(
          `/api/get-prediction?prediction_id=${predictionId}`,
          {
            signal: controller.signal, // Use the signal in the request
          }
        )

        const prediction = response.data
        const logs = prediction.logs
        status = prediction.status

        // Increment the update counter every time the status is checked and still 'processing'
        if (status === 'processing') {
          updateCount++
          updateImage(predictionId, { status, logs, updateCount })

          // Record the start time once when the status first switches to "processing"
          if (processingStartTime === null) {
            processingStartTime = Date.now()
          }
        }

        if (status === 'succeeded') {
          updateImage(predictionId, { status, output: prediction.output, logs })
          displayToast('success', 'Image generated successfully')
          break
        }

        if (status === 'failed') {
          console.error('Prediction failed:', response.data)
          displayToast('error', 'Failed to generate image, credits refunded')
          updateImage(predictionId, { status, logs })
          break
        }

        if (processingStartTime && Date.now() - processingStartTime > timeout) {
          await axios.post(`/api/cancel-prediction/${predictionId}`)
          break
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.error('Request canceled:', error.message)
        } else {
          console.error('Failed to check prediction status:', error)
          break
        }
      } finally {
        // Cancel the request if still pending after 5 seconds
        setTimeout(() => controller.abort(), 5000)
      }

      // Avoid starting a new loop iteration immediately
      await new Promise((resolve) => setTimeout(resolve, 5000))
    }
    setIsLoading(false)
  }

  const onSubmit = async (data) => {
    if (!license?.isLicensed) return onOpen()
    if (!inputImage) return setImgError('Image is required')

    setIsLoading(true)
    // Prepare the JSON payload
    const payload = {
      image: inputImage.src, // Base64 string of the image
      prompt: `${useCase.basePrompt} ${data.prompt} ${
        useCase.key === 'interior' &&
        `in ${interiorDesignStyle} architecture style`
      }${data?.attributes}, ${useCase.baseAttributes}`,
      num_samples: data.num_samples,
      negative_prompt: `${useCase.negativePrompt}`,
      license_key: license?.deviceLicense?.license_key,
    }

    try {
      const response = await axios.post('/api/create-prediction', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.data.error) {
        console.error('Error:', response.data.error)
        setIsLoading(false)
        return displayToast('error', response.data.error)
      }

      addImage({
        id: response.data.id,
        input: inputImage.src,
        output: null,
        status: response.data.status,
        logs: response.data.logs,
      })
      displayToast('info', 'Image generation started')
      return checkPredictionStatus(response.data.id)
    } catch (error) {
      console.error('Error creating prediction:', error)
      setIsLoading(false)
      return displayToast('error', error.message)
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (license?.isLicensed && license?.deviceLicense?.license_key) {
        const credits = await checkAiCredits(
          license?.deviceLicense?.license_key
        )
        setAiCredits(credits?.balance || 0)
      }
      if (!license?.isLicensed) {
        setAiCredits(0)
      }
    }
    fetchData()
  }, [license.isLicensed, license.deviceLicense?.license_key, runCount])

  return (
    <>
      <Paywall isOpen={isOpen} onOpenChange={onOpenChange} />
      <div id="toolbar" className="w-80 min-w-[340px] px-3">
        <Card
          as="form"
          className="h-full overflow-auto bg-content1 p-4 flex flex-col gap-3 text-left"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex items-center gap-2 text-default-600">
            <PiMagicWandDuotone fontSize="1.3rem" />
            <h4 className="font-semibold">AI Reimagine</h4>
            <ChipPro />
          </div>
          <p className="text-default-500 text-sm text-left">
            Transform images using an image reference and your ideas.
          </p>
          {!license?.isLicensed ? (
            <div className="flex flex-col gap-2">
              <Button
                color="warning"
                variant="faded"
                fullWidth
                startContent={<PiCrownSimpleBold fontSize="1.1rem" />}
                endContent={<PiArrowSquareOutBold fontSize="1.2rem" />}
                onClick={onOpen}
              >
                Buy a license
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <Chip
                color="warning"
                variant="faded"
                startContent={<PiCoinVerticalBold fontSize="1.1rem" />}
              >
                <span className="text-sm font-semibold text-default-600">
                  {aiCredits.toLocaleString()} AI credits
                </span>
              </Chip>
            </div>
          )}
          <Divider />
          <ImageInput
            onChange={(img) => {
              setInputImage(img), img && img.src && setImgError()
            }}
          />
          {imgError && <p className="text-tiny text-danger">{imgError}</p>}
          <Divider />
          <div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <PiSparkleBold fontSize="1.1rem" />
                <h5>Use case</h5>
              </div>
              <Select
                startContent={useCase.icon}
                defaultSelectedKeys={[useCase.key]}
              >
                {useCaseOptions.map((option) => (
                  <SelectItem
                    key={option.key}
                    value={option}
                    startContent={option.icon}
                    description={option.description}
                    onClick={() => setUseCase(option)}
                  >
                    {option.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <Divider />
          {useCase.key === 'interior' && (
            <>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <PiWarehouseBold fontSize="1.1rem" />
                  <h5>Design Style</h5>
                </div>
                <Select defaultSelectedKeys={[interiorDesignStyle]}>
                  {interiorDesignStyles.map((option) => (
                    <SelectItem
                      key={option}
                      value={option}
                      onClick={() => setInteriorDesignStyle(option)}
                    >
                      {option}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <Divider />
            </>
          )}
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-2">
              {useCase.key === 'interior' ? (
                <PiCouchBold fontSize="1.1rem" />
              ) : (
                <PiSunDimBold fontSize="1.1rem" />
              )}
              <h5>{useCase.key === 'interior' ? 'Room type' : 'Prompt'} </h5>
              <HelpIndicator
                content={`Provide a description of the ${
                  useCase.key === 'interior'
                    ? 'room you want to redesign, example: a bedroom'
                    : 'image you want to generate, example: a futuristic car'
                }`}
              />
            </div>
            <Textarea
              placeholder={`i.e. A ${
                useCase.key === 'interior' ? 'living room' : 'race car'
              }`}
              {...register('prompt', {
                required: 'Prompt is required',
                shouldUnregister: true,
              })}
              isInvalid={errors?.prompt && true}
              errorMessage={errors?.prompt?.message}
            />
          </div>
          <Divider />
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-2">
              <PiCardsBold fontSize="1.1rem" />
              <h5>Attributes</h5>
              <HelpIndicator
                content="
              You can provide additional instructions to generate images with specific characteristics. For example, yellow color, big size, etc."
              />
            </div>
            <Textarea
              placeholder="i.e. Purple color, futuristic"
              {...register('attributes', {
                required: false,
                shouldUnregister: true,
              })}
            />
          </div>
          <Divider />
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-2">
              <PiImagesBold fontSize="1.1rem" />
              <h5>Samples</h5>
              <HelpIndicator content="The number of images to generate (max 3). More samples will cost more credits, but you will get more options to choose from." />
            </div>
            <Input
              type="number"
              placeholder="Number of samples"
              defaultValue={1}
              min={1}
              max={3}
              {...register('num_samples', {
                required: 'Number of samples is required',
                shouldUnregister: true,
                validate: (value) =>
                  (value >= 1 && value <= 3) ||
                  'Number of samples must be between 1 and 3',
              })}
              isInvalid={errors?.num_samples && true}
              errorMessage={errors?.num_samples?.message}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              fullWidth
              variant={inputImage ? 'shadow' : 'flat'}
              color="secondary"
              startContent={<PiMagicWandBold fontSize="1.1rem" />}
              isLoading={isLoading}
            >
              Generate ({creditsCost} credits)
            </Button>
          </div>
        </Card>
      </div>
    </>
  )
}

export default ToolBarAI
