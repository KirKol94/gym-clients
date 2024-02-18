import type { Preview } from '@storybook/react'
import '../src/app/styles/index.scss'
import React from 'react'
import { RootProvider } from '../src/app/providers/RootProvider'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export const decorators = [
  (Story) => (
    <RootProvider>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Story />
      </div>
    </RootProvider>
  ),
]

export default preview
