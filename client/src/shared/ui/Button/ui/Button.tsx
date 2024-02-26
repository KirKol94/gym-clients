import type { ButtonHTMLAttributes, ReactNode } from 'react'
import cx from 'classix'

import type { buttonSize } from '../mode/types/button'
import { buttonTheme } from '../mode/types/button'

import classes from './Button.module.scss'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: keyof typeof buttonSize
  children: ReactNode
  theme?: keyof typeof buttonTheme
  className?: string
}

export const Button = ({ size, children, theme = buttonTheme.primary, className, ...props }: ButtonProps) => {
  const cls = cx(classes[`${theme}`], classes[`${theme}_${size}`], classes.button, className)

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  )
}
