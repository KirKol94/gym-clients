import type { ReactNode } from 'react'
import cx from 'classix'

import Arrow from '@/shared/assets/icons/arrow.svg?react'
import { counterColor } from '@/shared/ui/Counter'
import { IconWithTitle, iconWithTitleSize } from '@/shared/ui/IconWithTitle'
import { RoundButton } from '@/shared/ui/RoundButton'

import { CounterRow } from './CounterRow'

import classes from './EntityCard.module.scss'

export interface EntityCardProps {
  children: ReactNode
  requireAttention?: number
  total?: number
  thisMonth?: number
  onArrowClick: () => void
  className?: string
}

export const EntityCard = ({
  children,
  requireAttention,
  total,
  thisMonth,
  onArrowClick,
  className,
}: EntityCardProps) => {
  return (
    <div className={cx(classes['entity-card'], className)}>
      <div className={classes.header}>
        <div className={classes.icon}>
          <IconWithTitle size={iconWithTitleSize.medium}>{children}</IconWithTitle>
        </div>
        <RoundButton onClick={onArrowClick}>
          <Arrow />
        </RoundButton>
      </div>
      <div className={classes.footer}>
        {requireAttention && (
          <CounterRow count={requireAttention} color={counterColor.yellow} text="Требуют внимания" />
        )}
        {total && <CounterRow count={total} color={counterColor.white} text="Всего" />}
        {thisMonth && <CounterRow count={thisMonth} color={counterColor.white} text="В этом месяце" />}
      </div>
    </div>
  )
}
