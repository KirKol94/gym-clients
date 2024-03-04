import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '../../ThemeProvider/ThemeProvider.jsx'

import { store } from '@/app/store'

interface Props {
  children: ReactNode
}

export const RootProvider = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Provider store={store}>{children}</Provider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
