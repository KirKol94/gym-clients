import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import { routesData } from '../config/data.routes'

import { PrivateRoute } from './PrivateRoute'
import RouteSuspenseLayout from './RouteSuspenseLayout'

export const Router: FC = () => {
  return (
    <Routes>
      {routesData.map((route, index) =>
        route.isAuth ? (
          <Route>
            <Route key={index} element={<PrivateRoute />}>
              <Route
                index={route.index}
                key={index}
                path={route.path}
                element={<RouteSuspenseLayout route={route} />}
              />
            </Route>
          </Route>
        ) : (
          <Route index={route.index} key={index} path={route.path} element={<RouteSuspenseLayout route={route} />} />
        ),
      )}
    </Routes>
  )
}
