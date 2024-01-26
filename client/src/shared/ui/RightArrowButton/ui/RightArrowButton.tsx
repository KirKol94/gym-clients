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
    direction === RightArrowButtonDirection.U && classes.arrow__u,
    direction === RightArrowButtonDirection.B && classes.arrow__b,
    direction === RightArrowButtonDirection.L && classes.arrow__l,
  )

  return (
    <button className={cls}>
      <RightArrow />
    </button>
  )
}
