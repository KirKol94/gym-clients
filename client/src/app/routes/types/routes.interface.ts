import type { FC, LazyExoticComponent } from 'react'

import type { authType } from '@/features/AuthForm'
import type { ROUTER_PATH } from '@/shared/const/path/PATH.ts'

type LazyComponentType = LazyExoticComponent<FC<{ type?: keyof typeof authType }>>

export interface IRoutesData {
  component: LazyComponentType
  path?: (typeof ROUTER_PATH)[keyof typeof ROUTER_PATH]
  index?: boolean
  type?: keyof typeof authType
  isAuth?: boolean
}
