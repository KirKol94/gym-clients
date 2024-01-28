import { FC } from 'react'

import { AuthType } from '@/features/AuthForm'
import { ROUTER_PATH } from '@/shared/const/path/PATH'

export interface IRoutesData {
  component: FC
  path?: ROUTER_PATH | string
  index?: boolean
  type?: AuthType
  isAuth?: boolean
}
