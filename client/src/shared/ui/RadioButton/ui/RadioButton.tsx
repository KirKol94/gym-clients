import type { InputHTMLAttributes, LegacyRef } from 'react'
import { forwardRef } from 'react'
import cx from 'classix'

import { type Align, RadioButtonSize } from '../models/types/radioButton'

import classes from './RadioButton.module.scss'

export interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string
  align?: Align
  buttonSize?: RadioButtonSize
  className?: string
}

export const RadioButton = forwardRef(
  (
    { buttonSize = RadioButtonSize.S, text, align, className, ...props }: RadioButtonProps,
    ref: LegacyRef<HTMLInputElement>,
  ) => {
    const cls = cx(
      classes['radio-button'],
      buttonSize && classes[`radio-button_${buttonSize}`],
      align && classes[`radio-button_${align}`],
      className,
    )

    return (
      <label className={cls} tabIndex={0}>
        <input ref={ref} type="radio" className={classes.radio} {...props} tabIndex={-1} />
        <span className={classes['custom-radio']} />
        <span>{text}</span>
      </label>
    )
  },
)
