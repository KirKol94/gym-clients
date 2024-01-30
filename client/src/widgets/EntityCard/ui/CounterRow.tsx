import { Counter, CounterColor, CounterSize } from '@/shared/ui/Counter'
import { Text, TextSize } from '@/shared/ui/Text'

import classes from './EntityCard.module.scss'

interface CounterRowProps {
  count: number
  color: CounterColor
  text: string
}

export const CounterRow = ({ count, color, text }: CounterRowProps) => {
  return (
    <div className={classes['counter-row']}>
      <Counter count={count} size={CounterSize.S} color={color} />
      <Text size={TextSize.S}>{text}</Text>
    </div>
  )
}
