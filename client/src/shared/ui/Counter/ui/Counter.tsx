import cx from 'classix'

import { counterColor, counterSize } from '../model/types/counter'

import classes from './Counter.module.scss'

export interface CounterProps {
  count: number
  size: keyof typeof counterSize
  color: keyof typeof counterColor
}

export const Counter = ({ count, size, color }: CounterProps) => {
  const cls = cx(
    classes.counter,
    size === counterSize.small && classes.counter__small,
    size === counterSize.medium && classes.counter__medium,
    color === counterColor.white && classes.counter__white,
    color === counterColor.yellow && classes.counter__yellow,
  )

  return <span className={cls}>{count}</span>
}
