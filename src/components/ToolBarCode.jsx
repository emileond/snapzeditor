import { useEffect, useState } from 'react'
import {
  PiMagicWandBold,
  PiMagicWandDuotone,
  PiCoinVerticalBold,
  PiCrownSimpleBold,
  PiArrowSquareOutBold,
} from 'react-icons/pi'
import {
  Button,
  Card,
  Chip,
  Divider,
  Select,
  SelectItem,
  useDisclosure,
} from '@nextui-org/react'
import { useLicense } from '../context/LicenseContext'
import Paywall from './Paywall'
import axios from 'axios'
import ImageInput from './ImageInput'
import { useForm, Controller } from 'react-hook-form'
import { useAiImages } from '../context/AiImagesContext'
import { useCheckAiCredits } from '../hooks/useCheckAiCredits'
import { displayToast } from '../utils/displayToast'
import ChipPro from './ChipPro'
import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiVuedotjs,
  SiAngular,
  SiSvelte,
  SiSolid,
  SiNextdotjs,
  SiNuxtdotjs,
  SiMui,
  SiAntdesign,
  SiChakraui,
  SiNextui,
  SiAtlassian,
  SiRadixui,
  SiBootstrap,
  SiMaterialdesign,
  SiVuetify,
  SiBuefy,
} from 'react-icons/si'
import { LuComponent } from 'react-icons/lu'

const ToolBarCode = () => {
  const { license } = useLicense()
  const { checkAiCredits } = useCheckAiCredits()
  const { addImage } = useAiImages()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)
  const [imgError, setImgError] = useState()
  const [runCount, setRunCount] = useState(0)

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [inputImage, setInputImage] = useState(null)
  const [aiCredits, setAiCredits] = useState(0)

  const creditsCost = watch('num_samples') * 4

  const languages = [
    {
      key: 'js',
      name: 'JavaScript',
      icon: <SiJavascript fontSize="1.1rem" color="#f0db4f" />,
    },
    {
      key: 'ts',
      name: 'TypeScript',
      icon: <SiTypescript fontSize="1.1rem" color="#3178c6" />,
    },
  ]

  const frameworks = [
    {
      key: 'react',
      name: 'React',
      icon: <SiReact fontSize="1.1rem" color="#61dafb" />,
    },
    {
      key: 'vue',
      name: 'Vue',
      icon: <SiVuedotjs fontSize="1.1rem" color="#41b883" />,
    },
    {
      key: 'angular',
      name: 'Angular',
      icon: <SiAngular fontSize="1.1rem" color="#dd0031" />,
    },
    {
      key: 'svelte',
      name: 'Svelte',
      icon: <SiSvelte fontSize="1.1rem" color="#ff3e00" />,
    },
    {
      key: 'solid',
      name: 'Solid.js',
      icon: <SiSolid fontSize="1.1rem" color="#3c4888" />,
    },
  ]

  const uiLibraries = [
    {
      key: 'antd',
      framework: 'react',
      name: 'Ant Design',
      icon: <SiAntdesign fontSize="1.1rem" />,
    },
    {
      key: 'arkui',
      framework: 'react',
      name: 'Ark UI',
      icon: <LuComponent fontSize="1.1rem" />,
    },
    {
      key: 'atlaskit',
      framework: 'react',
      name: 'Atlaskit',
      icon: <SiAtlassian fontSize="1.1rem" />,
    },
    {
      key: 'chakra',
      framework: 'react',
      name: 'Chakra UI',
      icon: <SiChakraui fontSize="1.1rem" />,
    },
    {
      key: 'fluentui',
      framework: 'react',
      name: 'Fluent UI',
      icon: <LuComponent fontSize="1.1rem" />,
    },
    {
      key: 'mui',
      framework: 'react',
      name: 'MUI',
      icon: <SiMui fontSize="1.1rem" />,
    },
    {
      key: 'nextui',
      framework: 'react',
      name: 'NextUI',
      icon: <SiNextui fontSize="1.1rem" />,
    },
    {
      key: 'radix',
      framework: 'react',
      name: 'Radix UI',
      icon: <SiRadixui fontSize="1.1rem" />,
    },
    {
      key: 'reactbootstrap',
      framework: 'react',
      name: 'React Bootstrap',
      icon: <SiBootstrap fontSize="1.1rem" />,
    },
    {
      key: 'clarity',
      framework: 'angular',
      name: 'Clarity',
      icon: <LuComponent fontSize="1.1rem" />,
    },
    {
      key: 'material',
      framework: 'angular',
      name: 'Angular Material',
      icon: <SiMaterialdesign fontSize="1.1rem" />,
    },
    {
      key: 'nebular',
      framework: 'angular',
      name: 'Nebular',
      icon: <LuComponent fontSize="1.1rem" />,
    },
    {
      key: 'primeng',
      framework: 'angular',
      name: 'PrimeNG',
      icon: <LuComponent fontSize="1.1rem" />,
    },
    {
      key: 'taiga',
      framework: 'angular',
      name: 'Taiga UI',
      icon: <LuComponent fontSize="1.1rem" />,
    },
    {
      key: 'arkui',
      framework: 'vue',
      name: 'Ark UI',
      icon: <LuComponent fontSize="1.1rem" />,
    },
    {
      key: 'buefy',
      framework: 'vue',
      name: 'Buefy',
      icon: <SiBuefy fontSize="1.1rem" />,
    },
    {
      key: 'primevuw',
      framework: 'vue',
      name: 'PrimeVue',
      icon: <LuComponent fontSize="1.1rem" />,
    },
    {
      key: 'vuetify',
      framework: 'vue',
      name: 'Vuetify',
      icon: <SiVuetify fontSize="1.1rem" />,
    },
    {
      key: 'attractions',
      framework: 'svelte',
      name: 'Attractions',
      icon: <LuComponent fontSize="1.1rem" />,
    },
    {
      key: 'svelteui',
      framework: 'svelte',
      name: 'Svelte UI',
      icon: <LuComponent fontSize="1.1rem" />,
    },
    {
      key: 'arkui',
      framework: 'solid',
      name: 'Ark UI',
      icon: <LuComponent fontSize="1.1rem" />,
    },
    {
      key: 'kovalte',
      framework: 'solid',
      name: 'Kovalte',
      icon: <LuComponent fontSize="1.1rem" />,
    },
    {
      key: 'solidui',
      framework: 'solid',
      name: 'Solid UI',
      icon: <LuComponent fontSize="1.1rem" />,
    },
    {
      key: 'suid',
      framework: 'solid',
      name: 'SUID',
      icon: <LuComponent fontSize="1.1rem" />,
    },
  ]

  const filteredUiLibs = uiLibraries.filter(
    (lib) => lib.framework === watch('framework')
  )

  const onSubmit = async (data) => {
    console.log('data:', data)
    if (!license?.isLicensed) return onOpen()
    if (!inputImage) return setImgError('Image is required')

    setIsLoading(true)
    // Prepare the JSON payload
    const payload = {
      // image: inputImage.src, // Base64 string of the image
      // prompt: `${useCase.basePrompt} ${data.prompt}${
      //   useCase.key === 'interior'
      //     ? `in ${interiorDesignStyle} architecture style`
      //     : ','
      // } ${data?.attributes}, ${useCase.baseAttributes}`,
      // num_samples: data.num_samples,
      // negative_prompt: `${useCase.negativePrompt}`,
      // license_key: license?.deviceLicense?.license_key,
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
      return
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
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <h5>Language</h5>
            </div>
            <Controller
              name="language"
              control={control}
              defaultValue={languages[0].key}
              render={({ field }) => (
                <Select
                  {...field}
                  startContent={
                    languages?.find((lang) => lang?.key === field?.value).icon
                  }
                  aria-label="Code Language"
                  isRequired
                  isInvalid={errors.language && true}
                  selectionMode="single"
                  onSelectionChange={(key) => field.onChange(key)}
                  disabledKeys={[field.value]}
                  defaultSelectedKeys={[field.value]}
                >
                  {languages.map((option) => (
                    <SelectItem
                      key={option.key}
                      value={option.key}
                      startContent={option.icon}
                    >
                      {option.name}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
          </div>
          <Divider />
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <h5>Framework</h5>
            </div>
            <Controller
              name="framework"
              control={control}
              defaultValue={frameworks[0].key}
              render={({ field }) => (
                <Select
                  {...field}
                  startContent={
                    frameworks.find((lang) => lang?.key === field?.value).icon
                  }
                  aria-label="Framework"
                  isRequired
                  isInvalid={errors.framework && true}
                  selectionMode="single"
                  onSelectionChange={(key) => field.onChange(key)}
                  disabledKeys={[field.value]}
                  defaultSelectedKeys={[field.value]}
                >
                  {frameworks.map((option) => (
                    <SelectItem
                      key={option.key}
                      value={option.key}
                      startContent={option.icon}
                    >
                      {option.name}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
          </div>
          <Divider />
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <h5>UI Library</h5>
            </div>
            <Controller
              name="uilib"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  startContent={
                    filteredUiLibs.find((lib) => lib?.key === field?.value)
                      ?.icon
                  }
                  aria-label="UI Library"
                  isInvalid={errors.uilib && true}
                  selectionMode="single"
                  onSelectionChange={(key) => field.onChange(key)}
                >
                  {filteredUiLibs.map((option) => (
                    <SelectItem
                      key={option.key}
                      value={option.key}
                      startContent={option.icon}
                    >
                      {option.name}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
          </div>
          <Divider />
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
