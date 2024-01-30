import { Button, ButtonSize } from '@/shared/ui/Button'
import { ButtonBackground, ButtonTextColor } from '@/shared/ui/Button/mode/types/button'
import { Counter, CounterColor, CounterSize } from '@/shared/ui/Counter'
import { Text, TextSize } from '@/shared/ui/Text'
import { Title, TitleSize } from '@/shared/ui/Title'

import classes from './AlertCard.module.scss'

interface AlertInfo {
  count: number
  title: string
  alert: string
}

export const AlertCard = ({ count, title, alert }: AlertInfo) => {
  return (
    <div className={classes['alert-card']}>
      <div className={classes.header}>
        <Counter size={CounterSize.M} count={count} color={CounterColor.WHITE} />
        <Title size={TitleSize.XL}>{title}</Title>
      </div>
      <div className={classes.footer}>
        <Button
          size={ButtonSize.S}
          primaryButton={true}
          color={ButtonTextColor.WHITE}
          text="Обработать"
          background={ButtonBackground.BLUE}
        />
        <Text size={TextSize.S}>{alert}</Text>
      </div>
    </div>
  )
}
