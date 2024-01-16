import { Chip } from '@nextui-org/react'
import { PiCrownSimpleBold } from 'react-icons/pi'

export default function ChipPro() {
  return (
    <Chip size="sm" variant="flat" color="warning" className="h-5 px-[2px]">
      <div className="flex items-center gap-1 ">
        <PiCrownSimpleBold fontSize="14px" />
        <span className="text-xs">PRO</span>
      </div>
    </Chip>
  )
}
