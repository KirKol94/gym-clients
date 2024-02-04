import { ButtonHTMLAttributes, ReactNode } from 'react'
import cx from 'classix'

import { ButtonSize, ButtonTheme } from '../mode/types/button'

import classes from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: ButtonSize
  children: ReactNode
  theme?: ButtonTheme
}

export const Button = ({ size, children, theme = ButtonTheme.PRIMARY, ...props }: ButtonProps) => {
  const cls = cx(classes[`${theme}`], classes[`${theme}_${size}`])

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  )
}
