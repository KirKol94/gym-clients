import { ButtonWithArrow } from '@/shared/ui/ButtonWithArrow'
import { CounterColor } from '@/shared/ui/Counter'
import { IconWithTitle, IconWithTitleSize } from '@/shared/ui/IconWithTitle'

import { CounterRow } from '..'

import classes from './EntityCard.module.scss'

interface EntityCardProps {
  icon: string
  title: string
  requireAttention?: number
  total?: number
  thisMonth?: number
}

export const EntityCard = ({ icon, title, requireAttention, total, thisMonth }: EntityCardProps) => {
  return (
    <div className={classes['entity-card']}>
      <div className={classes.header}>
        <IconWithTitle icon={icon} title={title} size={IconWithTitleSize.M} />
        <ButtonWithArrow />
      </div>
      <div className={classes.footer}>
        {requireAttention && (
          <CounterRow count={requireAttention} color={CounterColor.YELLOW} text="Требуют внимания" />
        )}
        {total && <CounterRow count={total} color={CounterColor.WHITE} text="Всего" />}
        {thisMonth && <CounterRow count={thisMonth} color={CounterColor.WHITE} text="В этом месяце" />}
      </div>
    </div>
  )
}
