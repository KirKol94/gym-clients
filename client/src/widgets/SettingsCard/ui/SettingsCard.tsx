import AdditionalFields from '@/shared/assets/icons/additionalFields.svg?react'
import RightsAndRoles from '@/shared/assets/icons/rightsAndRoles.svg?react'
import Settings from '@/shared/assets/icons/settings.svg?react'
import TransactionStatuses from '@/shared/assets/icons/transactionStatuses.svg?react'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button'
import { IconWithTitle, IconWithTitleSize } from '@/shared/ui/IconWithTitle'

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
        <IconWithTitle size={IconWithTitleSize.M}>
          <Settings />
          Настройки
        </IconWithTitle>
      </div>
      <div className={classes.footer}>
        {buttonsData.map((data, index) => (
          <Button
            key={index}
            size={ButtonSize.XS}
            theme={ButtonTheme.SECONDARY}
            onClick={() => console.log('click on ', data.text)}
          >
            <IconWithTitle size={IconWithTitleSize.S}>
              {data.icon}
              {data.text}
            </IconWithTitle>
          </Button>
        ))}
      </div>
    </div>
  )
}
