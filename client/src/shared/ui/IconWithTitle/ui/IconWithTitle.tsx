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
    classes.wrapper,
    size === IconWithTitleSize.S && classes.wrapper__s,
    size === IconWithTitleSize.M && classes.wrapper__m,
  )

  return (
    <div className={cls}>
      <img src={icon} alt="icon" />
      <h2>{title}</h2>
    </div>
  )
}
