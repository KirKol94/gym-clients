import type { Meta, Story } from '@storybook/react'

import { AuthType } from '@/features/AuthForm'

import { AuthPage } from './AuthPage'

export default {
  title: 'pages/AuthPage',
  component: AuthPage,
  args: {
    type: {
      type: 'radio',
      options: [AuthType.LOGIN, AuthType.REGISTER],
    },
  },
} as Meta

const Template: Story = (args) => <AuthPage {...args} />
export const Default = Template.bind({
  args: {
    type: AuthType.LOGIN,
  },
})
