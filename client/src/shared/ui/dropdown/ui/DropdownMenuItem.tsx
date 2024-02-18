import { Dispatch, memo, MouseEvent, useEffect } from 'react'
import cs from 'classix'

import { SelectOption } from '../model/types/dropdown'

import classes from './Dropdown.module.scss'

interface DropdownMenuItemProps {
  option: SelectOption
  index: number
  isOpen: boolean
  onChange: Dispatch<SelectOption>
  value: SelectOption
  close: () => void
  changeHighlightedIndex: (index: number) => void
  highlightedIndex: number
}

export const DropdownMenuItem = memo((props: DropdownMenuItemProps) => {
  const { isOpen, onChange, option, index, close, value, changeHighlightedIndex, highlightedIndex } = props
  const label = option?.label

  const isOptionSelected = (option: SelectOption) => {
    return option?.label === value?.label
  }

  const onHandleClickItem = (e: MouseEvent<HTMLLIElement>, option: SelectOption) => {
    e.stopPropagation()
    close()
    onChange(option)
  }

  useEffect(() => {
    if (isOpen) {
      changeHighlightedIndex(0)
    }
  }, [changeHighlightedIndex, isOpen])

  const onMouseEnterItem = (index: number) => {
    changeHighlightedIndex(index)
  }

  return (
    <li
      onClick={(e) => onHandleClickItem(e, option)}
      key={label}
      className={cs(
        classes.option,
        isOptionSelected(option) && classes.selected,
        index === highlightedIndex && classes.highlighted,
      )}
      onMouseEnter={() => onMouseEnterItem(index)}
    >
      {label}
    </li>
  )
})
