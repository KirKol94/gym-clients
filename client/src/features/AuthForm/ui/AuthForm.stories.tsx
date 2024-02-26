import type { Meta, StoryFn } from '@storybook/react'

import { authType } from '../model/types/auth'

import type { AuthFormProps } from './AuthForm'
import { AuthForm } from './AuthForm'

export default {
  title: 'features/AuthForm',
  component: AuthForm,
  args: {
    type: {
      type: 'radio',
      options: authType,
    },
  },
} as Meta

const Template: StoryFn<AuthFormProps> = (args) => <AuthForm {...args} />
export const Default = Template.bind({
  args: {
    type: authType.login,
  },
})
