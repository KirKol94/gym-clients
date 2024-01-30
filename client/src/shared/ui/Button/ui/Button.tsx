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
  icon?: string
  text: string
  color: ButtonTextColor
  background: string
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
    size === ButtonSize.M && classes.button__m,
    size === ButtonSize.S && classes.button__s,
    size === ButtonSize.XS && classes.button__xs,
    color === ButtonTextColor.WHITE && classes.button__white,
    color === ButtonTextColor.BLUE && classes.button__blue,
    color === ButtonTextColor.BLACK && classes.button__black,
    background === ButtonBackground.WHITE && classes.button__bgwhite,
    background === ButtonBackground.BLUE && classes.button__bgblue,
  )
  const settingsClass = cx(
    classes.settings,
    size === ButtonSize.M && classes.settings__m,
    size === ButtonSize.S && classes.settings__s,
    size === ButtonSize.XS && classes.settings__xs,
    color === ButtonTextColor.WHITE && classes.settings__white,
    color === ButtonTextColor.BLUE && classes.settings__blue,
    color === ButtonTextColor.BLACK && classes.settings__black,
    background === ButtonBackground.WHITE && classes.settings__bgwhite,
    background === ButtonBackground.BLUE && classes.settings__bgblue,
  )

  return primaryButton ? (
    <button className={buttonClass} {...props}>
      {text}
    </button>
  ) : (
    settingsButton && (
      <button className={settingsClass} {...props}>
        <IconWithTitle size={IconWithTitleSize.S} title={text}>
          {children}
        </IconWithTitle>
      </button>
    )
  )
}
