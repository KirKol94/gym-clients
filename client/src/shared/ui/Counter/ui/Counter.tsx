import cx from 'classix'

import { CounterSize } from '../model/types/counter'

import classes from './Counter.module.scss'

interface CounterProps {
  count: number
  size: CounterSize
}

export const Counter = ({ count, size }: CounterProps) => {
  const cls = cx(
    classes.counter,
    size === CounterSize.S && classes.counter__s,
    size === CounterSize.M && classes.counter__m,
  )

  return <span className={cls}>{count}</span>
}
