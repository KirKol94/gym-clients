import ReactDOM from 'react-dom/client'

import { App } from '@/app'

import { RootProvider } from './app/providers/RootProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RootProvider>
    <App />
  </RootProvider>,
)
