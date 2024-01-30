import { ReactNode } from 'react'
import cx from 'classix'

import { IconWithTitleSize } from '../models/types/iconWithTitle'

import classes from './IconWithTitle.module.scss'

interface IconWithTitleProps {
  title: string
  children: ReactNode
  size: IconWithTitleSize
}

export const IconWithTitle = ({ title, children, size }: IconWithTitleProps) => {
  const cls = cx(
    classes['icon-with-title'],
    size === IconWithTitleSize.S && classes['icon-with-title__s'],
    size === IconWithTitleSize.M && classes['icon-with-title__m'],
  )

  return (
    <div className={cls}>
      {children}
      <h2>{title}</h2>
    </div>
  )
}
