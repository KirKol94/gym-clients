import { Counter, CounterColor, CounterSize } from '@/shared/ui/Counter'
import { IconWithTitleSize } from '@/shared/ui/IconWithTitle/models/types/iconWithTitle'
import { IconWithTitle } from '@/shared/ui/IconWithTitle/ui/IconWithTitle'
import { ButtonWithArrow } from '@/shared/ui/RightArrowButton'
import { Text, TextSize } from '@/shared/ui/Text'

import classes from './EntityCard.module.scss'

interface EntityCardProps {
  icon: string
  title: string
  requireAttention?: number
  total?: number
  thisMonth?: number
}

interface CounterRowProps {
  count: number
  color: CounterColor
  text: string
}

export const EntityCard = ({ icon, title, requireAttention, total, thisMonth }: EntityCardProps) => {
  const counterRow = ({ count, color, text }: CounterRowProps) => {
    return (
      <div className={classes['counter-row']}>
        <Counter count={count} size={CounterSize.S} color={color} />
        <Text size={TextSize.S}>{text}</Text>
      </div>
    )
  }

  return (
    <div className={classes['entity-card']}>
      <div className={classes.header}>
        <IconWithTitle icon={icon} title={title} size={IconWithTitleSize.M} />
        <ButtonWithArrow />
      </div>
      <div className={classes.footer}>
        {requireAttention &&
          counterRow({ count: requireAttention, color: CounterColor.YELLOW, text: 'Требуют внимания' })}
        {total && counterRow({ count: total, color: CounterColor.WHITE, text: 'Всего' })}
        {thisMonth && counterRow({ count: thisMonth, color: CounterColor.WHITE, text: 'В этом месяце' })}
      </div>
    </div>
  )
}
