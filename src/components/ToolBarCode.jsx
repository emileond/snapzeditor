import { useEffect, useState } from 'react'
import {
  PiMagicWandBold,
  PiSparkleBold,
  PiSunDimBold,
  PiMagicWandDuotone,
  PiCubeBold,
  PiBuildingsBold,
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

const ToolBarCode = () => {
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

  const languages = [
    {
      key: 'js',
      name: 'JavaScript',
      icon: <PiCubeBold fontSize="1.1rem" />,
    },
    {
      key: 'ts',
      name: 'TypeScript',
      icon: <PiCubeBold fontSize="1.1rem" />,
    },
  ]

  const frameworks = [
    {
      key: 'react',
      name: 'React',
      icon: <PiBuildingsBold fontSize="1.1rem" />,
    },
    {
      key: 'vue',
      name: 'Vue',
      icon: <PiBuildingsBold fontSize="1.1rem" />,
    },
    {
      key: 'angular',
      name: 'Angular',
      icon: <PiBuildingsBold fontSize="1.1rem" />,
    },
    {
      key: 'svelte',
      name: 'Svelte',
      icon: <PiBuildingsBold fontSize="1.1rem" />,
    },
    {
      key: 'next',
      name: 'Next.js',
      icon: <PiBuildingsBold fontSize="1.1rem" />,
    },
    {
      key: 'nuxt',
      name: 'Nuxt.js',
      icon: <PiBuildingsBold fontSize="1.1rem" />,
    },
    {
      key: 'solid',
      name: 'Solid.js',
      icon: <PiBuildingsBold fontSize="1.1rem" />,
    },
  ]

  const [useCase, setUseCase] = useState(useCaseOptions[0])
  const [aiCredits, setAiCredits] = useState(0)

  const onSubmit = async (data) => {
    if (!license?.isLicensed) return onOpen()
    if (!inputImage) return setImgError('Image is required')

    setIsLoading(true)
    // Prepare the JSON payload
    const payload = {
      image: inputImage.src, // Base64 string of the image
      prompt: `${useCase.basePrompt} ${data.prompt}${
        useCase.key === 'interior'
          ? `in ${interiorDesignStyle} architecture style`
          : ','
      } ${data?.attributes}, ${useCase.baseAttributes}`,
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
            <h4 className="font-semibold">AI Code</h4>
            <ChipPro />
          </div>
          <p className="text-default-500 text-sm text-left">
            Generate code from images.
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
                aria-label="Use case"
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
                <Select
                  defaultSelectedKeys={[interiorDesignStyle]}
                  aria-label="Interior design style"
                >
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

export default ToolBarCode
