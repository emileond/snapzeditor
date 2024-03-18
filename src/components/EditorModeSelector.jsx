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
    },
    {
      title: 'Dev',
      description: 'Generate screenshots for your code snippets',
      icon: <PiCodeBlockDuotone fontSize="1.5rem" />,
    },
    // {
    //   title: 'AI Upscale',
    //   description: 'Enhance your images with AI',
    //   icon: <PiMagicWandDuotone fontSize="1.5rem" />,
    //   isDisabled: true,
    // },
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
            <Listbox selectedKeys={[0]} className="w-full">
              {availableModes.map((item, index) => (
                <ListboxItem
                  key={index}
                  variant="flat"
                  onClick={() =>
                    !item.isDisabled &&
                    handleModeChange(item.title.toLowerCase())
                  }
                  endContent={
                    mode === item.title.toLowerCase() && (
                      <div className="flex gap-1 bg-success/10 rounded-full px-1 text-success">
                        <PiCheckBold fontSize=".85rem" />
                        <span className="text-xs">Active</span>
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
                      className={`flex items-center justify-center p-2 rounded-md bg-content1 text-default-500
                      group-hover:bg-content2 group-hover:text-default-800
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
