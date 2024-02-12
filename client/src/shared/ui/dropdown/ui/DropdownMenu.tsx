import { memo, useState } from 'react'

import { SelectOption } from '../model/types/dropdown'
import { DropdownSize } from '../model/types/dropdown'

import DropdownCaret from './DropdownCaret'
import DropdownMenuContent from './DropdownMenuContent'
import DropdownTrigger from './DropdownTrigger'

import classes from './Dropdown.module.scss'

interface DropdownMenuProps {
  label?: string
  options: SelectOption[]
  size?: DropdownSize
}

const DropdownMenu = memo((props: DropdownMenuProps) => {
  const { label, options, size } = props

  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState<SelectOption | undefined>(undefined)

  const close = () => {
    setIsOpen(false)
  }

  const handleOnBlur = () => {
    close()
  }

  const onToggleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  const onChangeValue = (option: SelectOption | undefined) => {
    setValue(option)
  }

  return (
    <>
      <div
        onBlur={handleOnBlur}
        onClick={onToggleOpen}
        tabIndex={0}
        className={`${classes.container} ${size && classes[size]}`}
      >
        <DropdownTrigger value={value?.label} label={label} />
        <DropdownCaret />
        <DropdownMenuContent
          onChangeValue={onChangeValue}
          value={value}
          isOpen={isOpen}
          options={options}
          close={close}
        />
      </div>
    </>
  )
})

export default DropdownMenu
