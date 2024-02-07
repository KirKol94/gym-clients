import Contract from '@/shared/assets/icons/Contract.svg?react'
import { AlertCard } from '@/widgets/AlertCard'
import { EntityCard } from '@/widgets/EntityCard'
import { SettingsCard } from '@/widgets/SettingsCard'

export const ProfilePage = () => {
  return (
    <div>
      <AlertCard
        count={0}
        title="Контрагента ожидают в стадии “Подписание Контракты”"
        alert="Подпишите контракты с контрагентами или переведите их в архивные"
      />
      <SettingsCard />
      <EntityCard
        requireAttention={2}
        total={2}
        thisMonth={2}
        onArrowClick={() => console.log('arrow button from entity card click')}
      >
        <Contract />
        Контракты
      </EntityCard>
    </div>
  )
}
