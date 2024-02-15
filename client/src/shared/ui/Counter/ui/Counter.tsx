import cx from 'classix'

import { CounterColor, CounterSize } from '../model/types/counter'

import classes from './Counter.module.scss'

export interface CounterProps {
  count: number
  size: CounterSize
  color: CounterColor
}

export const Counter = ({ count, size, color }: CounterProps) => {
  const cls = cx(
    classes.counter,
    size === CounterSize.S && classes.counter__s,
    size === CounterSize.M && classes.counter__m,
    color === CounterColor.WHITE && classes.counter__white,
    color === CounterColor.YELLOW && classes.counter__yellow,
  )

  return <span className={cls}>{count}</span>
}
