import type { Meta, Story } from '@storybook/react'

import { AuthType } from '../model/types/auth'

import type { AuthFormProps } from './AuthForm'
import { AuthForm } from './AuthForm'

export default {
  title: 'features/AuthForm',
  component: AuthForm,
  atgs: {
    type: {
      type: 'radio',
      options: [AuthType.LOGIN, AuthType.REGISTER],
    },
  },
} as Meta

const Template: Story<AuthFormProps> = (args) => <AuthForm {...args} />
export const Default = Template.bind({
  args: {
    type: AuthType.LOGIN,
  },
})
