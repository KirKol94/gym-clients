import { Navigate, Outlet } from 'react-router-dom'

import { getIsAuth } from '@/entities/User'
import { useAppSelector } from '@/shared/hooks'

export const PrivateRoute = () => {
  const isAuth = useAppSelector(getIsAuth)

  return isAuth ? <Outlet /> : <Navigate to="/login" />
}
