import type { FC } from 'react'
import { Suspense } from 'react'

import { Loader } from '@/shared/ui/Loader'

import type { IRoutesData } from '../types/routes.interface'

interface IRouteSuspenseLayoutProps {
  route: IRoutesData
}

const RouteSuspenseLayout: FC<IRouteSuspenseLayoutProps> = ({ route }) => {
  return <Suspense fallback={<Loader />}>{<route.component type={route.type} />}</Suspense>
}

export default RouteSuspenseLayout
