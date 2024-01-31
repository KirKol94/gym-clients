import { ReactNode } from 'react'

import { CounterColor } from '@/shared/ui/Counter'
import { IconWithTitle, IconWithTitleSize } from '@/shared/ui/IconWithTitle'
import { RoundButton } from '@/shared/ui/RoundButton'
import { RoundButtonColor, RoundButtonSize } from '@/shared/ui/RoundButton/model/types/roundButton'

import { CounterRow } from './CounterRow'

import classes from './EntityCard.module.scss'

interface EntityCardProps {
  children: ReactNode
  title: string
  requireAttention?: number
  total?: number
  thisMonth?: number
}

export const EntityCard = ({ children, title, requireAttention, total, thisMonth }: EntityCardProps) => {
  return (
    <div className={classes['entity-card']}>
      <div className={classes.header}>
        <div className={classes.icon}>
          <IconWithTitle children={children} title={title} size={IconWithTitleSize.M} />
        </div>
        <RoundButton size={RoundButtonSize.M} color={RoundButtonColor.BLUE} arrowRight={true} />
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
