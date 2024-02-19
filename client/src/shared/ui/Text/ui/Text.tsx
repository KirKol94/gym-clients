import type { ReactNode } from 'react'
import cx from 'classix'

import { textSize } from '../model/types/textSize.ts'

import classes from './Text.module.scss'

export interface TextProps {
  size: keyof typeof textSize
  children: ReactNode
  className?: string
}

export const Text = ({ size, children, className }: TextProps) => {
  const cls = cx(classes.text, size === textSize[size] && classes[`text__${size}`], className)

  return <p className={cls}>{children}</p>
}
