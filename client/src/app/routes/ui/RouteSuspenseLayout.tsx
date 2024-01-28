import React, { FC, ReactNode, Suspense } from 'react'

import { AuthType } from '@/features/AuthForm'
import { Loader } from '@/shared/ui/Loader'

interface IRouteSuspenseLayoutProps {
  children: ReactNode
  type?: AuthType
}

const RouteSuspenseLayout: FC<IRouteSuspenseLayoutProps> = ({ children, type }) => {
  return <Suspense fallback={<Loader />}>{React.cloneElement(children as React.ReactElement, { type })}</Suspense>
}

export default RouteSuspenseLayout
