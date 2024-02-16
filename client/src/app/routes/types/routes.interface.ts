import type { AuthType } from '@/features/AuthForm'
import type { ROUTER_PATH } from '@/shared/const/path/PATH'

type LazyComponentType = React.LazyExoticComponent<React.FC<{ type?: AuthType }>>

export interface IRoutesData {
  component: LazyComponentType
  path?: ROUTER_PATH
  index?: boolean
  type?: AuthType
  isAuth?: boolean
}
