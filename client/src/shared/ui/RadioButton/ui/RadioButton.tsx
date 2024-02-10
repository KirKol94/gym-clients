import { InputHTMLAttributes } from 'react'
import cx from 'classix'

import { Align, RadioButtonSize } from '../models/types/radioButton'

import classes from './RadioButton.module.scss'

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string
  align?: Align
  buttonSize?: RadioButtonSize
  className?: string
}

export const RadioButton = ({ buttonSize = RadioButtonSize.S, text, align, className, ...props }: RadioButtonProps) => {
  const cls = cx(
    classes['radio-button'],
    buttonSize && classes[`radio-button_${buttonSize}`],
    align && classes[`radio-button_${align}`],
    className,
  )

  return (
    <label className={cls} tabIndex={0}>
      <input type="radio" className={classes.radio} {...props} tabIndex={-1} />
      <span className={classes['custom-radio']}></span>
      <span>{text}</span>
    </label>
  )
}
