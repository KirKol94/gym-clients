import { memo, useState } from 'react'
import cx from 'classix'

import { SelectOption } from '../model/types/dropdown'
import { DropdownSize } from '../model/types/dropdown'

import { DropdownCaret } from './DropdownCaret'
import { DropdownMenuContent } from './DropdownMenuContent'
import { DropdownTrigger } from './DropdownTrigger'

import classes from './Dropdown.module.scss'

interface DropdownMenuProps {
  label?: string
  options: SelectOption[]
  size?: DropdownSize
}

export const DropdownMenu = memo((props: DropdownMenuProps) => {
  const { label, options, size } = props

  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<SelectOption>()

  const close = () => {
    setIsOpen(false)
  }

  const handleOnBlur = () => {
    close()
  }

  const onToggleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  const onChangeValue = (option: SelectOption) => {
    setSelectedValue(option)
  }

  return (
    <div
      onBlur={handleOnBlur}
      onClick={onToggleOpen}
      tabIndex={0}
      className={cx(classes.container, size && classes.size)}
    >
      <DropdownTrigger value={selectedValue?.label} label={label} />
      <DropdownCaret />
      <DropdownMenuContent
        onChangeValue={onChangeValue}
        selectedValue={selectedValue}
        isOpen={isOpen}
        options={options}
        close={close}
      />
    </div>
  )
})
