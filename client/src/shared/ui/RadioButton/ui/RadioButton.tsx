import { InputHTMLAttributes } from 'react'
import cx from 'classix'

import { Text, TextSize } from '../../Text'
import { Align, RadioButtonSize } from '../models/types/radioButton'

import classes from './RadioButton.module.scss'

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string
  textSide?: Align
  buttonSize?: RadioButtonSize
  className?: string
}

export const RadioButton = ({
  buttonSize = RadioButtonSize.S,
  text,
  textSide,
  className,
  ...props
}: RadioButtonProps) => {
  const cls = cx(
    classes['radio-button'],
    buttonSize && classes[`radio-button_${buttonSize}`],
    textSide && classes[`radio-button_${textSide}`],
    className,
  )

  return (
    <label className={cls}>
      <input type="radio" className={classes.radio} {...props} />
      <span className={classes['custom-radio']}></span>
      <Text size={buttonSize === RadioButtonSize.M ? TextSize.M : TextSize.S}>{text}</Text>
    </label>
  )
}
