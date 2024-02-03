import { ReactNode } from 'react'

import Arrow from '@/shared/assets/icons/arrow.svg?react'
import { CounterColor } from '@/shared/ui/Counter'
import { IconWithTitle, IconWithTitleSize } from '@/shared/ui/IconWithTitle'
import { RoundButton } from '@/shared/ui/RoundButton'

import { CounterRow } from './CounterRow'

import classes from './EntityCard.module.scss'

interface EntityCardProps {
  children: ReactNode
  requireAttention?: number
  total?: number
  thisMonth?: number
}

export const EntityCard = ({ children, requireAttention, total, thisMonth }: EntityCardProps) => {
  return (
    <div className={classes['entity-card']}>
      <div className={classes.header}>
        <div className={classes.icon}>
          <IconWithTitle size={IconWithTitleSize.M}>{children}</IconWithTitle>
        </div>
        <RoundButton>
          <Arrow />
        </RoundButton>
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
