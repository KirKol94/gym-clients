import type { Meta, StoryFn } from '@storybook/react'

import { authType } from '@/features/AuthForm'

import { AuthPage } from './AuthPage'

export default {
  title: 'pages/AuthPage',
  component: AuthPage,
  args: {
    type: {
      type: 'radio',
      options: authType,
    },
  },
} as Meta

const Template: StoryFn<typeof AuthPage> = (args) => <AuthPage {...args} />
export const Default = Template.bind({
  args: {
    type: authType.login,
  },
})
