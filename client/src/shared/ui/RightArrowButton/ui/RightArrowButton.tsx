import cx from 'classix'

import RightArrow from '../assets/image/arrow.svg?react'
import { RightArrowButtonDirection } from '../model/types/rightArrowButton'

import classes from './RightArrowButton.module.scss'

interface RightArrowButtonInfo {
  direction?: RightArrowButtonDirection
}

export const RightArrowButton = ({ direction }: RightArrowButtonInfo) => {
  const cls = cx(
    classes.arrow,
    direction === RightArrowButtonDirection.UP && classes.arrow__up,
    direction === RightArrowButtonDirection.DOWN && classes.arrow__down,
    direction === RightArrowButtonDirection.LEFT && classes.arrow__left,
  )

  return (
    <button className={cls}>
      <RightArrow />
    </button>
  )
}
