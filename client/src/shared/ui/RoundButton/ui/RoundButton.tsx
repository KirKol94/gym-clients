import { ButtonHTMLAttributes, ReactNode } from 'react'
import cx from 'classix'

import { RoundButtonDirection, RoundButtonSize, RoundButtonTheme } from '../model/types/roundButton'

import classes from './RoundButton.module.scss'

interface RoundButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: RoundButtonSize
  direction?: RoundButtonDirection
  theme?: RoundButtonTheme
  children: ReactNode
  className?: string
}

export const RoundButton = ({
  size = RoundButtonSize.M,
  direction,
  theme = RoundButtonTheme.PRIMARY,
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
