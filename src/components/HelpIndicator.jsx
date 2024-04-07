import { Button, Tooltip } from '@nextui-org/react'
import { PiQuestionBold } from 'react-icons/pi'

export default function HelpIndicator({ content }) {
  return (
    <Tooltip content={content} className="max-w-[360px]">
      <Button
        isIconOnly
        variant="light"
        startContent={<PiQuestionBold fontSize="1.3rem" />}
        className="text-default-500 hover:text-default-900"
      />
    </Tooltip>
  )
}
