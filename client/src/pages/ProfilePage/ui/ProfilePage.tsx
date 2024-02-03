import Contract from '@/shared/assets/icons/Contract.svg?react'
import { AlertCard } from '@/widgets/AlertCard'
import { EntityCard } from '@/widgets/EntityCard'
import Page from '@/widgets/Page'
import { SettingsCard } from '@/widgets/SettingsCard'

export const ProfilePage = () => {
  return (
    <Page>
      <AlertCard
        count={0}
        title="Контрагента ожидают в стадии “Подписание контракта”"
        alert="Подпишите контракты с контрагентами или переведите их в архивные"
      />
      <SettingsCard />
      <EntityCard requireAttention={2} total={2} thisMonth={2}>
        <Contract />
        Контракты
      </EntityCard>
    </Page>
  )
}
