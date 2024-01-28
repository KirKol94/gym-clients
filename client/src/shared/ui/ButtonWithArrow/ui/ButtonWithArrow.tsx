import { ButtonHTMLAttributes } from 'react'
import cx from 'classix'

import RightArrow from '../../../assets/icons/arrow.svg?react'
import { ButtonWithArrowDirection } from '../model/types/buttonWithArrow'

import classes from './ButtonWithArrow.module.scss'

interface ButtonWithArrow extends ButtonHTMLAttributes<HTMLButtonElement> {
  direction?: ButtonWithArrowDirection
}

export const ButtonWithArrow = ({ direction, ...props }: ButtonWithArrow) => {
  const cls = cx(
    classes.arrow,
    direction === ButtonWithArrowDirection.UP && classes.arrow__up,
    direction === ButtonWithArrowDirection.DOWN && classes.arrow__down,
    direction === ButtonWithArrowDirection.LEFT && classes.arrow__left,
  )

  return (
    <button className={cls} {...props}>
      <RightArrow />
    </button>
  )
}
