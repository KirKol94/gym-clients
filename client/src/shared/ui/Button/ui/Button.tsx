import { ButtonHTMLAttributes, ReactNode } from 'react'
import cx from 'classix'

import { IconWithTitle, IconWithTitleSize } from '../../IconWithTitle'
import { ButtonBackground, ButtonSize, ButtonTextColor } from '../mode/types/button'

import classes from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: ButtonSize
  children?: ReactNode
  primaryButton?: boolean
  settingsButton?: boolean
  text?: string
  color: ButtonTextColor
  background: ButtonBackground
}

export const Button = ({
  size,
  children,
  primaryButton,
  settingsButton,
  text,
  color,
  background,
  ...props
}: ButtonProps) => {
  const buttonClass = cx(
    classes.button,
    size && classes[`button__${size.toLowerCase()}`],
    color && classes[`button__${color.toLowerCase()}`],
    background && classes[`button__bg${background.toLowerCase()}`],
  )
  const settingsClass = cx(
    classes.settings,
    size && classes[`settings__${size.toLowerCase()}`],
    color && classes[`settings__${color.toLowerCase()}`],
    background && classes[`settings__bg${background.toLowerCase()}`],
  )

  return primaryButton ? (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  ) : (
    settingsButton && (
      <button className={settingsClass} {...props}>
        <IconWithTitle size={IconWithTitleSize.S} title={text ? text : 'Text'}>
          {children}
        </IconWithTitle>
      </button>
    )
  )
}
