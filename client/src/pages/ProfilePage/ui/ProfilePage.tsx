import { RoundButton, RoundButtonDirection } from '@/shared/ui/ButtonWithArrow'
import {
  RoundButtonBackground,
  RoundButtonColor,
  RoundButtonSize,
} from '@/shared/ui/ButtonWithArrow/model/types/roundButton'
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
      <RoundButton
        direction={RoundButtonDirection.LEFT}
        size={RoundButtonSize.S}
        color={RoundButtonColor.WHITE}
        background={RoundButtonBackground.BLUE}
        chevron={true}
      />
    </Page>
  )
}
