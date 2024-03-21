import {
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  Listbox,
  ListboxItem,
  ModalFooter,
} from '@nextui-org/react'
import { useEditorMode } from '../context/EditorModeContext'
import {
  PiImageDuotone,
  PiCodeBlockDuotone,
  PiMagicWandDuotone,
  PiFadersHorizontalBold,
  PiCheckBold,
} from 'react-icons/pi'

function EditorModeSelector() {
  const { mode, setMode } = useEditorMode()

  const availableModes = [
    {
      title: 'Screenshot',
      description: 'Beautify screenshots in seconds',
      icon: <PiImageDuotone fontSize="1.5rem" />,
      mode: 'screenshot',
    },
    {
      title: 'Dev',
      description: 'Generate screenshots for your code snippets',
      icon: <PiCodeBlockDuotone fontSize="1.5rem" />,
      mode: 'dev',
    },
    {
      title: 'AI Image Enhancer',
      description: 'Enhance your images with AI',
      icon: <PiMagicWandDuotone fontSize="1.5rem" />,
      mode: 'ai',
      isDisabled: false,
    },
  ]

  const handleModeChange = (mode) => {
    setMode(mode)
    onOpenChange()
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button
        onClick={onOpen}
        size="sm"
        variant="flat"
        startContent={<PiFadersHorizontalBold fontSize="1.1rem" />}
      >
        Editor mode
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="dark min-w-[520px]"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h3>Change edit mode</h3>
            <p className="text-default-500 font-medium text-sm">
              Select a mode to start editing
            </p>
          </ModalHeader>
          <ModalBody className="p-4 w-full">
            <Listbox selectedKeys={[0]} className="w-full" variant="faded">
              {availableModes.map((item, index) => (
                <ListboxItem
                  key={index}
                  // variant="bordered
                  onClick={() =>
                    !item.isDisabled && handleModeChange(item.mode)
                  }
                  endContent={
                    mode === item.mode && (
                      <div className="flex gap-1 bg-content3/50 rounded-full px-[6px] py-[2px] text-success items-center">
                        <PiCheckBold fontSize=".9rem" />
                        <span className="text-sm text-default-600">Active</span>
                      </div>
                    )
                  }
                  isReadOnly={item?.isDisabled}
                  className={`flex flex-row p-3 gap-4 cursor-pointer dark:hover:bg-opacity-10 w-full rounded-lg mb-2 ${
                    item.isDisabled
                      ? 'dark:text-default-400 dark:cursor-not-allowed'
                      : 'dark:hover:bg-opacity-20'
                  }
                  `}
                >
                  <div className="flex gap-3 group">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-md bg-content1 text-default-500
                      group-hover:bg-content2 group-hover:text-secondary-500
                      `}
                    >
                      {item.icon}
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-lg font-medium text-default-600 group-hover:text-default-900">
                        {item.title}
                      </h4>
                      <p className="text-default-400 group-hover:text-default-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </ListboxItem>
              ))}
            </Listbox>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditorModeSelector
