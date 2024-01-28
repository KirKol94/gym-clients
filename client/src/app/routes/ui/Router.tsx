import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import { routesData } from '../config/data.routes'

import { PrivateRoute } from './PrivateRoute'
import RouteSuspenseLayout from './RouteSuspenseLayout'

export const Router: FC = () => {
  return (
    <Routes>
      {routesData.map((route) =>
        route.isAuth ? (
          <Route key={`${route.path} - ${route.component}`} element={<PrivateRoute />}>
            <Route
              index={route.index}
              key={`${route.path} - ${route.component}`}
              path={route.path}
              element={<RouteSuspenseLayout route={route} />}
            />
          </Route>
        ) : (
          <Route
            index={route.index}
            key={`${route.path} - ${route.component}`}
            path={route.path}
            element={<RouteSuspenseLayout route={route} />}
          />
        ),
      )}
    </Routes>
  )
}
