import { Title, titleSize } from '@/shared/ui/Title'
import { CheckboxButton } from '@/shared/ui/CheckboxButton/ui/CheckboxButton.jsx'

export const SettingsPage = () => {
  return (
    <div>
      <Title level={1} size={titleSize.xxl}>
        Settings
      </Title>
      <CheckboxButton />
    </div>
  )
}
