import { Button } from '@nextui-org/react'
import 'tailwindcss/tailwind.css'

const PositionSelector = ({ onChange, position }) => {
  return (
    <div className="w-16 h-16 border-2 border-default-200 relative rounded-lg">
      <Button
        size="sm"
        color={position === 'top-left' ? 'secondary' : 'default'}
        variant={position === 'top-left' ? 'shadow' : 'solid'}
        className="absolute top-[2px] left-[2px] min-w-0 min-h-0 w-4 h-4"
        onClick={() => onChange('top-left')}
        isIconOnly
      />
      <Button
        size="sm"
        color={position === 'top-center' ? 'secondary' : 'default'}
        variant={position === 'top-center' ? 'shadow' : 'solid'}
        className="absolute top-[2px] left-1/2 transform -translate-x-1/2 min-w-0 min-h-0 w-4 h-4"
        onClick={() => onChange('top-center')}
        isIconOnly
      />
      <Button
        size="sm"
        color={position === 'top-right' ? 'secondary' : 'default'}
        variant={position === 'top-right' ? 'shadow' : 'solid'}
        className="absolute top-[2px] right-[2px] min-w-0 min-h-0 w-4 h-4"
        onClick={() => onChange('top-right')}
        isIconOnly
      />
      <Button
        size="sm"
        color={position === 'left-center' ? 'secondary' : 'default'}
        variant={position === 'left-center' ? 'shadow' : 'solid'}
        className={`absolute left-[2px] top-1/2 transform -translate-y-1/2 min-w-0 min-h-0 w-4 h-4`}
        onClick={() => onChange('left-center')}
        isIconOnly
      />
      <Button
        size="sm"
        color={position === 'center' ? 'secondary' : 'default'}
        variant={position === 'center' ? 'shadow' : 'solid'}
        className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-0 min-h-0 w-4 h-4`}
        onClick={() => onChange('center')}
        isIconOnly
      />
      <Button
        size="sm"
        color={position === 'right-center' ? 'secondary' : 'default'}
        variant={position === 'right-center' ? 'shadow' : 'solid'}
        className={`absolute right-[2px] top-1/2 transform -translate-y-1/2 min-w-0 min-h-0 w-4 h-4`}
        onClick={() => onChange('right-center')}
        isIconOnly
      />
      <Button
        size="sm"
        color={position === 'bottom-left' ? 'secondary' : 'default'}
        variant={position === 'bottom-left' ? 'shadow' : 'solid'}
        className={`absolute bottom-[2px] left-[2px] min-w-0 min-h-0 w-4 h-4`}
        onClick={() => onChange('bottom-left')}
        isIconOnly
      />
      <Button
        size="sm"
        color={position === 'bottom-center' ? 'secondary' : 'default'}
        variant={position === 'bottom-center' ? 'shadow' : 'solid'}
        className={`absolute bottom-[2px] left-1/2 transform -translate-x-1/2 min-w-0 min-h-0 w-4 h-4`}
        onClick={() => onChange('bottom-center')}
        isIconOnly
      />
      <Button
        size="sm"
        color={position === 'bottom-right' ? 'secondary' : 'default'}
        variant={position === 'bottom-right' ? 'shadow' : 'solid'}
        className={`absolute bottom-[2px] right-[2px] min-w-0 min-h-0 w-4 h-4`}
        onClick={() => onChange('bottom-right')}
        isIconOnly
      />
    </div>
  )
}

export default PositionSelector
