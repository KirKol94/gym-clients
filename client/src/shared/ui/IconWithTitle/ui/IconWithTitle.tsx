import type { ReactNode } from 'react'
import cx from 'classix'

import type { iconWithTitleSize } from '../models/types/iconWithTitle.ts'

import classes from './IconWithTitle.module.scss'

export interface IconWithTitleProps {
  children: ReactNode
  size: keyof typeof iconWithTitleSize
  className?: string
}

export const IconWithTitle = ({ children, size, className }: IconWithTitleProps) => {
  const cls = cx(classes['icon-with-title'], classes[`icon-with-title__${size}`], className)

  return <div className={cls}>{children}</div>
}
