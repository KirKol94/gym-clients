import { AlertCard } from '@/widgets/AlertCard'
import Page from '@/widgets/Page'

export const ProfilePage = () => {
  return (
    <Page>
      <AlertCard
        count={0}
        title="Контрагента ожидают в стадии “Подписание контракта”"
        alert="Подпишите контракты с контрагентами или переведите их в архивные"
      />
    </Page>
  )
}
