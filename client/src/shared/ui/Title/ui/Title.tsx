import type { ReactNode } from 'react'
import cx from 'classix'

import { titleSize } from '../model/types/title'

import classes from './Title.module.scss'

export interface TitleProps {
  size: keyof typeof titleSize
  children: ReactNode
  level: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
}

export const Title = ({ size, className, level, children }: TitleProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  const cls = cx(
    classes.title,
    size === titleSize.xl && classes.title__xl,
    size === titleSize.xxl && classes.title__xxl,
    className,
  )

  return <Tag className={cls}>{children}</Tag>
}
