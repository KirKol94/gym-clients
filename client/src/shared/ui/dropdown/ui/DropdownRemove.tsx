import { MouseEvent } from 'react'

import classes from './Dropdown.module.scss'

interface DropdownRemoveProps {
  handleOnClickRemove: (e: MouseEvent<HTMLButtonElement>) => void
}

export const DropdownRemove = (props: DropdownRemoveProps) => {
  const { handleOnClickRemove } = props
  return (
    <button onClick={handleOnClickRemove} className={classes['clear-btn']}>
      &times;
    </button>
  )
}
