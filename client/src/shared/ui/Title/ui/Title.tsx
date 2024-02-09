import { ReactNode } from 'react'
import cx from 'classix'

import { TitleSize } from '../model/types/title'

import classes from './Title.module.scss'

interface TitleProps {
  size: TitleSize
  children: ReactNode
  level: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
}

export const Title = ({ size, className, level, children }: TitleProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  const cls = cx(
    classes.title,
    size === TitleSize.XL && classes.title__xl,
    size === TitleSize.XXL && classes.title__xxl,
    className,
  )

  return <Tag className={cls}>{children}</Tag>
}
