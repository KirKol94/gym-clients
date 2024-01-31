import cx from 'classix'

import RightArrow from '@/shared/assets/icons/arrow.svg?react'
import Chevron from '@/shared/assets/icons/Back.svg?react'
import Edit from '@/shared/assets/icons/edit.svg?react'

import {
  RoundButtonBackground,
  RoundButtonColor,
  RoundButtonDirection,
  RoundButtonSize,
} from '../model/types/roundButton'

import classes from './RoundButton.module.scss'

interface RoundButtonProps {
  size: RoundButtonSize
  direction?: RoundButtonDirection
  color: RoundButtonColor
  background?: RoundButtonBackground
  chevron?: boolean
  arrowRight?: boolean
  edit?: boolean
}

export const RoundButton = ({ size, direction, color, background, chevron, arrowRight, edit }: RoundButtonProps) => {
  const cls = cx(
    classes.button,
    size && classes[`button__${size.toLowerCase()}`],
    direction && classes[`button__${direction.toLowerCase()}`],
    color && classes[`button__${color.toLowerCase()}`],
    background && classes[`button__bg${background.toLowerCase()}`],
    chevron && classes.button__chevron,
    edit && classes.button__edit,
  )

  return (
    <button className={cls}>
      {chevron && <Chevron />}
      {arrowRight && <RightArrow />}
      {edit && <Edit />}
    </button>
  )
}
