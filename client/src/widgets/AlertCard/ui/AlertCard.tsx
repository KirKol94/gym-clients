import { Button, buttonSize, buttonTheme } from '@/shared/ui/Button'
import { Counter, counterColor, counterSize } from '@/shared/ui/Counter'
import { Text } from '@/shared/ui/Text'
import { textSize } from '@/shared/ui/Text/model/types/textSize.ts'
import { Title, titleSize } from '@/shared/ui/Title'

import classes from './AlertCard.module.scss'

export interface AlertCardProps {
  count: number
  title: string
  alert: string
}

export const AlertCard = ({ count, title, alert }: AlertCardProps) => {
  return (
    <div className={classes['alert-card']}>
      <div className={classes.header}>
        <Counter size={counterSize.medium} count={count} color={counterColor.white} />
        <Title level={2} size={titleSize.xl}>
          {title}
        </Title>
      </div>
      <div className={classes.footer}>
        <Button size={buttonSize.s} theme={buttonTheme.primary}>
          Обработать
        </Button>
        <Text size={textSize.small}>{alert}</Text>
      </div>
    </div>
  )
}
