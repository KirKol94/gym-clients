import { AlertCard } from '@/widgets/AlertCard'

export const ProfilePage = () => {
  return (
    <div>
      <AlertCard
        count={0}
        title="Контрагента ожидают в стадии “Подписание контракта”"
        alert="Подпишите контракты с контрагентами или переведите их в архивные"
      />
    </div>
  )
}
