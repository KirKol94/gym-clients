import cx from 'classix'

import { Text, TextSize } from '../../Text'
import { RadioButtonSize, TextSide } from '../models/types/radioButton'

import clx from './RadioButton.module.scss'

interface RadioButtonProps {
  text: string
  textSide?: TextSide
  size?: RadioButtonSize
  className?: string
}

export const RadioButton = ({ size = RadioButtonSize.S, text, textSide, className, ...props }: RadioButtonProps) => {
  const cls = cx(
    clx['radio-button'],
    size && clx[`radio-button_${size}`],
    textSide && clx[`radio-button_${textSide}`],
    className,
  )

  return (
    <label className={cls}>
      <input type="radio" className={clx.radio} {...props} />
      <span className={clx['custom-radio']}></span>
      <Text size={size === RadioButtonSize.M ? TextSize.M : TextSize.S} className={clx.text}>
        {text}
      </Text>
    </label>
  )
}
