import type { ButtonHTMLAttributes, ReactNode } from 'react'
import cx from 'classix'

import type { ButtonSize } from '../mode/types/button'
import { ButtonTheme } from '../mode/types/button'

import classes from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: ButtonSize
  children: ReactNode
  theme?: ButtonTheme
  className?: string
}

export const Button = ({ size, children, theme = ButtonTheme.PRIMARY, className, ...props }: ButtonProps) => {
  const cls = cx(classes[`${theme}`], classes[`${theme}_${size}`], classes.button, className)

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  )
}
