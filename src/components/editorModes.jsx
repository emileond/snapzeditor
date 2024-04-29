import {
  PiImageDuotone,
  PiCodeBlockDuotone,
  PiMagicWandDuotone,
} from 'react-icons/pi'

export const editorModes = [
  {
    title: 'Screenshot',
    description: 'Beautify screenshots in seconds.',
    icon: <PiImageDuotone fontSize="1.5rem" />,
    mode: 'screenshot',
  },
  {
    title: 'Dev',
    description: 'Generate screenshots for your code snippets.',
    icon: <PiCodeBlockDuotone fontSize="1.5rem" />,
    mode: 'dev',
  },
  {
    title: 'AI Reimagine',
    description:
      'Transform your images into new creations across multiple visual styles.',
    icon: <PiMagicWandDuotone fontSize="1.5rem" />,
    mode: 'ai',
    isDisabled: false,
  },
]
