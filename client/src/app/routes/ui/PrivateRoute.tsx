import { Navigate, Outlet } from 'react-router-dom'

import { getIsAuth } from '@/entities/User'
import { ROUTER_PATH } from '@/shared/const/path/PATH'
import { useAppSelector } from '@/shared/hooks'

export const PrivateRoute = () => {
  const isAuth = useAppSelector(getIsAuth)

  return isAuth ? <Outlet /> : <Navigate to={ROUTER_PATH.LOGIN} />
}
