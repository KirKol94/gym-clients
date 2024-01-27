import cx from 'classix'

import { IconWithTitleSize } from '../models/types/iconWithTitle'

import classes from './IconWithTitle.module.scss'

interface IconWithTitleProps {
  icon: string
  title: string
  size: IconWithTitleSize
}

export const IconWithTitle = ({ icon, title, size }: IconWithTitleProps) => {
  const cls = cx(
    classes['icon-with-title'],
    size === IconWithTitleSize.S && classes['icon-with-title__s'],
    size === IconWithTitleSize.M && classes['icon-with-title__m'],
  )

  return (
    <div className={cls}>
      <img src={icon} alt="icon" />
      <h2>{title}</h2>
    </div>
  )
}
