import RightsAndRoles from '@/shared/assets//icons/rightsAndRoles.svg?react'
import Settings from '@/shared/assets//icons/settings.svg?react'
import TransactionStatuses from '@/shared/assets//icons/transactionStatuses.svg?react'
import AdditionalFields from '@/shared/assets/icons/additionalFields.svg?react'
import { Button, ButtonSize } from '@/shared/ui/Button'
import { ButtonBackground, ButtonTextColor } from '@/shared/ui/Button/mode/types/button'
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
        <IconWithTitle title="Настройки" size={IconWithTitleSize.M}>
          <Settings />
        </IconWithTitle>
      </div>
      <div className={classes.footer}>
        {buttonsData.map((data, index) => (
          <Button
            key={index}
            size={ButtonSize.XS}
            settingsButton={true}
            color={ButtonTextColor.BLACK}
            text={data.text}
            background={ButtonBackground.WHITE}
          >
            {data.icon}
          </Button>
        ))}
      </div>
    </div>
  )
}
