import { useNavigate } from 'react-router-dom'
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
import { PiFadersHorizontalBold, PiCheckBold } from 'react-icons/pi'
import { editorModes } from './editorModes'

function EditorModeSelector() {
  const navigate = useNavigate()
  const { mode } = useEditorMode()

  const handleModeChange = (mode) => {
    navigate(`/app?mode=${mode}`)
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
        className="dark min-w-[580px]"
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
              {editorModes.map((item, index) => (
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
                  ${mode === item.mode && 'border-default-100'}
                  `}
                >
                  <div className={`flex gap-3 group`}>
                    <div
                      className={`w-[48px] h-[48px] flex items-center justify-center flex-shrink-0 rounded-md bg-content1 text-default-500
                      group-hover:bg-content2 group-hover:text-secondary-500 ${
                        mode === item.mode &&
                        'bg-secondary-200/30 text-secondary-600'
                      }
                      `}
                    >
                      {item.icon}
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-lg font-medium text-default-600 group-hover:text-default-900">
                        {item.title}
                      </h4>
                      <p className="text-default-400 group-hover:text-default-600 text-wrap">
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
