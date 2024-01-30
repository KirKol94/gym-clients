import rightsAndRoles from '@/shared/assets//icons/rightsAndRoles.svg'
import settings from '@/shared/assets//icons/settings.svg'
import transactionStatuses from '@/shared/assets//icons/transactionStatuses.svg'
import additionalFields from '@/shared/assets/icons/additionalFields.svg'
import { IconWithTitle, IconWithTitleSize } from '@/shared/ui/IconWithTitle'
import { SettingsButton } from '@/shared/ui/SettingsButton'

import classes from './SettingsCard.module.scss'

export const SettingsCard = () => {
  return (
    <div className={classes['settings-card']}>
      <div>
        <IconWithTitle icon={settings} title="Настройки" size={IconWithTitleSize.M} />
      </div>
      <div className={classes.footer}>
        <SettingsButton icon={settings} title="Настройки" />
        <SettingsButton icon={additionalFields} title="Доп. поля" />
        <SettingsButton icon={rightsAndRoles} title="Права и роли" />
        <SettingsButton icon={transactionStatuses} title="Статусы сделок" />
      </div>
    </div>
  )
}
