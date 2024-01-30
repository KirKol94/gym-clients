import { FC, useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import { LAST_PATH_SESSION_STORAGE_KEY } from '@/shared/const/sessionStorage/currentPathUrl'

import { routesData } from '../config/data.routes'

import { PrivateRoute } from './PrivateRoute'
import RouteSuspenseLayout from './RouteSuspenseLayout'

export const Router: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    sessionStorage.setItem(LAST_PATH_SESSION_STORAGE_KEY(), location.pathname)
  }, [location.pathname])

  const lastPath = sessionStorage.getItem(LAST_PATH_SESSION_STORAGE_KEY()) || '/'

  useEffect(() => {
    if (lastPath !== location.pathname) navigate(lastPath)
  }, [])

  return (
    <Routes>
      {routesData.map((route, index) =>
        route.isAuth ? (
          <Route key={index} element={<PrivateRoute />}>
            <Route index={route.index} key={index} path={route.path} element={<RouteSuspenseLayout route={route} />} />
          </Route>
        ) : (
          <Route index={route.index} key={index} path={route.path} element={<RouteSuspenseLayout route={route} />} />
        ),
      )}
    </Routes>
  )
}
