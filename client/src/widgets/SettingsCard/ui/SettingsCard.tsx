import AdditionalFields from '@/shared/assets/icons/additionalFields.svg?react'
import RightsAndRoles from '@/shared/assets/icons/rightsAndRoles.svg?react'
import Settings from '@/shared/assets/icons/settings.svg?react'
import TransactionStatuses from '@/shared/assets/icons/transactionStatuses.svg?react'
import { Button, buttonSize, buttonTheme } from '@/shared/ui/Button'
import { IconWithTitle, iconWithTitleSize } from '@/shared/ui/IconWithTitle'

import classes from './SettingsCard.module.scss'

export const SettingsCard = () => {
  const buttonsData = [
    { icon: <Settings />, text: 'Настройки' },
    { icon: <AdditionalFields />, text: 'Доп. поля' },
    { icon: <RightsAndRoles />, text: 'Права и роли' },
    { icon: <TransactionStatuses />, text: 'Статусы сделок' },
  ]

  return (
    <div className={classes['settings-card']}>
      <div className={classes.header}>
        <IconWithTitle size={iconWithTitleSize.medium}>
          <Settings />
          Настройки
        </IconWithTitle>
      </div>
      <div className={classes.footer}>
        {buttonsData.map((data, index) => (
          <Button
            key={index}
            size={buttonSize.xs}
            theme={buttonTheme.secondary}
            onClick={() => console.log('click on ', data.text)}
          >
            <IconWithTitle size={iconWithTitleSize.small}>
              {data.icon}
              {data.text}
            </IconWithTitle>
          </Button>
        ))}
      </div>
    </div>
  )
}
