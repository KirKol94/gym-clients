import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import cx from 'classix'

import { getIsAuth, userActions } from '@/entities/User'
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from '@/shared/const/localStorage/accessTokenKey'
import { IS_AUTH_LOCAL_STORAGE_KEY } from '@/shared/const/localStorage/isAuthKey'
import { USER_LOCAL_STORAGE_KEY } from '@/shared/const/localStorage/userKey'
import { ROUTER_PATH } from '@/shared/const/path/PATH'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { ButtonWithArrow } from '@/shared/ui/ButtonWithArrow'
import { AlertCard } from '@/widgets/AlertCard'
import { Footer } from '@/widgets/Footer'

export const HomePage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const isAuth = useAppSelector(getIsAuth)

  const className = cx('home__container')

  // TODO это должно быть в итоге в feature Logout, но пока такого компонента нет
  const handleLogout = () => {
    dispatch(userActions.clearUserData())

    localStorage.removeItem(IS_AUTH_LOCAL_STORAGE_KEY)
    localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY)
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY)
  }

  useEffect(() => {
    if (!isAuth) {
      navigate(ROUTER_PATH.LOGIN)
    }
  }, [isAuth, navigate])

  return (
    <div className={className}>
      <AlertCard
        count={0}
        title="Контрагента ожидают в стадии “Подписание контракта”"
        alert="Подпишите контракты с контрагентами или переведите их в архивные"
      />
      <ButtonWithArrow onClick={handleLogout} />
      <Footer />
    </div>
  )
}

export default HomePage
