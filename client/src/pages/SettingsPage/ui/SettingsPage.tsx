import { Title, titleSize } from '@/shared/ui/Title'
import { SwitchButton } from '@/shared/ui/SwitchButton/ui/SwitchButton'

export const SettingsPage = () => {
  return (
    <div>
      <Title level={1} size={titleSize.xxl}>
        Settings
      </Title>
      <SwitchButton />
    </div>
  )
}
