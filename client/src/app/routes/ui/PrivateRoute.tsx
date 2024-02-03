import { Navigate, Outlet } from 'react-router-dom'

import { getIsAuth } from '@/entities/User'
import { ROUTER_PATH } from '@/shared/const/path/PATH'
import { useAppSelector } from '@/shared/hooks'
import Page from '@/widgets/Page'

export const PrivateRoute = () => {
  const isAuth = useAppSelector(getIsAuth)

  return isAuth ? (
    <Page>
      <Outlet />
    </Page>
  ) : (
    <Navigate to={ROUTER_PATH.LOGIN} />
  )
}
