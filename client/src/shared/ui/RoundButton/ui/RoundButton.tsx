import type { ButtonHTMLAttributes, ReactNode } from 'react'
import cx from 'classix'

import type { roundButtonDirection } from '../model/types/roundButton'
import { roundButtonSize, roundButtonTheme } from '../model/types/roundButton'

import classes from './RoundButton.module.scss'

export interface RoundButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof roundButtonSize
  direction?: keyof typeof roundButtonDirection
  theme?: keyof typeof roundButtonTheme
  children: ReactNode
  className?: string
}

export const RoundButton = ({
  size = roundButtonSize.medium,
  direction,
  theme = roundButtonTheme.primary,
  children,
  className,
  ...props
}: RoundButtonProps) => {
  const cls = cx(classes[`${theme}`], classes[`${theme}_${size}`], classes[`${theme}_${direction}`], className)

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  )
}
