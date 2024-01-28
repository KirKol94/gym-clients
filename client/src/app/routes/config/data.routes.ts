import { lazy } from 'react'

import { AuthType } from '@/features/AuthForm'
import { ROUTER_PATH } from '@/shared/const/path/PATH'

import { IRoutesData } from '../types/routes.interface'

const AuthPage = lazy(() => import('@/pages/AuthPage'))
const HomePage = lazy(() => import('@/pages/HomePage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

export const routesData: IRoutesData[] = [
  {
    component: HomePage,
    index: true,
    isAuth: true,
  },
  {
    component: AuthPage,
    path: ROUTER_PATH.LOGIN,
    type: AuthType.LOGIN,
    isAuth: false,
  },
  {
    component: AuthPage,
    path: ROUTER_PATH.REGISTER,
    type: AuthType.REGISTER,
    isAuth: false,
  },
  {
    component: NotFoundPage,
    path: ROUTER_PATH.NOTFOUNDPAGE,
    isAuth: false,
  },
]
