import { IconWithTitleSize } from '../../IconWithTitle/models/types/iconWithTitle'
import { IconWithTitle } from '../../IconWithTitle/ui/IconWithTitle'

import classes from './SettingsButton.module.scss'

interface SettingsButtonProps {
  icon: string
  title: string
}

export const SettingsButton = ({ icon, title }: SettingsButtonProps) => {
  return (
    <button className={classes['settings-button']}>
      <IconWithTitle icon={icon} title={title} size={IconWithTitleSize.S} />
    </button>
  )
}
