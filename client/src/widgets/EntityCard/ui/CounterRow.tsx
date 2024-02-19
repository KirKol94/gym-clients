import type { counterColor } from '@/shared/ui/Counter'
import { counterSize } from '@/shared/ui/Counter'
import { Counter } from '@/shared/ui/Counter'
import { Text } from '@/shared/ui/Text'
import { textSize } from '@/shared/ui/Text/model/types/textSize.ts'

import classes from './EntityCard.module.scss'

interface CounterRowProps {
  count: number
  color: keyof typeof counterColor
  text: string
}

export const CounterRow = ({ count, color, text }: CounterRowProps) => {
  return (
    <div className={classes['counter-row']}>
      <Counter count={count} size={counterSize.small} color={color} />
      <Text size={textSize.small}>{text}</Text>
    </div>
  )
}
