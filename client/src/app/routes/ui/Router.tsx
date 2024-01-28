import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import { routesData } from '@/app/routes/config/data.routes'
import { PrivateRoute } from '@/app/routes/ui/PrivateRoute'
import RouteSuspenseLayout from '@/app/routes/ui/RouteSuspenseLayout'

export const Router: FC = () => {
  return (
    <Routes>
      {routesData.map((route) =>
        route.isAuth ? (
          <Route key={`${route.path} - ${route.component}`} element={<PrivateRoute />}>
            <Route
              index={route.index ? true : false}
              key={`${route.path} - ${route.component}`}
              path={route.path}
              element={
                <RouteSuspenseLayout type={route.type}>
                  {route.component && React.createElement(route.component)}
                </RouteSuspenseLayout>
              }
            />
          </Route>
        ) : (
          <Route
            index={route.index ? true : false}
            key={`${route.path} - ${route.component}`}
            path={route.path}
            element={
              <RouteSuspenseLayout type={route.type}>
                {route.component && React.createElement(route.component)}
              </RouteSuspenseLayout>
            }
          />
        ),
      )}
    </Routes>
  )
}
