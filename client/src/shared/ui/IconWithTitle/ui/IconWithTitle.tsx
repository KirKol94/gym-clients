import type { ReactNode } from 'react'
import cx from 'classix'

import type { IconWithTitleSize } from '../models/types/iconWithTitle'

import classes from './IconWithTitle.module.scss'

interface IconWithTitleProps {
  children: ReactNode
  size: IconWithTitleSize
  className?: string
}

export const IconWithTitle = ({ children, size, className }: IconWithTitleProps) => {
  const cls = cx(classes['icon-with-title'], classes[`icon-with-title__${size}`], className)

  return <div className={cls}>{children}</div>
}
