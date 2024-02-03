import { ReactNode } from 'react'
import cx from 'classix'

import { RoundButtonDirection, RoundButtonSize, RoundButtonTheme } from '../model/types/roundButton'

import classes from './RoundButton.module.scss'

interface RoundButtonProps {
  size?: RoundButtonSize
  direction?: RoundButtonDirection
  theme?: RoundButtonTheme
  children: ReactNode
}

export const RoundButton = ({
  size = RoundButtonSize.M,
  direction,
  theme = RoundButtonTheme.PRIMARY,
  children,
}: RoundButtonProps) => {
  const cls = cx(classes[`${theme}`], classes[`${theme}_${size}`], classes[`${theme}_${direction}`])

  return <button className={cls}>{children}</button>
}
