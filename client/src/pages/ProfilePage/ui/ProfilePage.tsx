import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getIsAuth } from '@/entities/User'
import { ROUTER_PATH } from '@/shared/const/path/PATH'
import { useAppSelector } from '@/shared/hooks'
import { AlertCard } from '@/widgets/AlertCard'
import Page from '@/widgets/Page'

export const ProfilePage = () => {
  const navigate = useNavigate()

  const isAuth = useAppSelector(getIsAuth)

  useEffect(() => {
    if (!isAuth) {
      navigate(ROUTER_PATH.LOGIN)
    }
  }, [isAuth, navigate])

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
