import { Checkbox } from '@/shared/ui/Checkbox'
import { Title, titleSize } from '@/shared/ui/Title'

export const SettingsPage = () => {
  return (
    <div>
      <Title level={1} size={titleSize.xxl}>
        Настройки
      </Title>
      <Checkbox />
    </div>
  )
}
