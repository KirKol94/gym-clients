import { Dispatch, memo, useCallback, useState } from 'react'
import cx from 'classix'

import { SelectOption } from '../model/types/dropdown'

import { DropdownMenuItem } from './DropdownMenuItem'

import classes from './Dropdown.module.scss'

interface DropdownMenuContentProps {
  options: SelectOption[]
  isOpen: boolean
  selectedValue: SelectOption
  onChangeValue: Dispatch<SelectOption>
  close: () => void
}

export const DropdownMenuContent = memo((props: DropdownMenuContentProps) => {
  const { options, isOpen, selectedValue, onChangeValue, close } = props
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  const changeHighlightedIndex = useCallback((index: number) => {
    setHighlightedIndex(index)
  }, [])

  return (
    <ul className={cx(classes.options, isOpen && classes.show)}>
      {options.map((option, index) => {
        const value = option?.value
        return (
          <DropdownMenuItem
            changeHighlightedIndex={changeHighlightedIndex}
            highlightedIndex={highlightedIndex}
            key={value}
            value={selectedValue}
            onChange={onChangeValue}
            isOpen={isOpen}
            option={option}
            index={index}
            close={close}
          />
        )
      })}
    </ul>
  )
})
