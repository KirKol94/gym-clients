import { SwitchButton } from '@/shared/ui/SwitchButton/ui/SwitchButton'
import { Title, titleSize } from '@/shared/ui/Title'

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
